import React from "react";
import ReactDOM from "react-dom";
import {
  formatParseError,
  getErrors,
  parse,
  TraceTree,
} from "../../parserlib/parser";
import ReactJson from "react-json-view";
import useLocalStorage from "react-use-localstorage";
import { extractRuleTree, RuleTree } from "../../parserlib/ruleTree";
import { CollapsibleWithHeading } from "../../uiCommon/generic/collapsible";
import {
  TreeView,
  TreeCollapseState,
  emptyCollapseState,
} from "../../uiCommon/generic/treeView";
import { ruleTreeToTree, renderRuleNode } from "../../parserlib/pretty";
import { useJSONLocalStorage } from "../../uiCommon/generic/hooks";
import { metaGrammar, extractGrammar } from "../../parserlib/meta";
import { validateGrammar } from "../../parserlib/validate";
import { Rec } from "../../core/types";
import { BareTerm } from "../../uiCommon/dl/replViews";
import { declareTables, flatten } from "../../parserlib/flatten";
import { SimpleInterpreter } from "../../core/simple/interpreter";
import { nullLoader } from "../../core/loaders";
import { Explorer } from "../../uiCommon/explorer";
import { AbstractInterpreter } from "../../core/abstractInterpreter";
import { uniq } from "../../util/util";
import { CodeEditor } from "./codeEditor";
import { ensureHighlightSegmentTable } from "./util";

function Main() {
  return <Playground />;
}

const initInterp = new SimpleInterpreter(".", nullLoader);

function ErrorList(props: { errors: string[] }) {
  return props.errors.length > 0 ? (
    <ul>
      {uniq(props.errors).map((err) => (
        <li
          key={err}
          style={{ color: "red", fontFamily: "monospace", whiteSpace: "pre" }}
        >
          {err}
        </li>
      ))}
    </ul>
  ) : null;
}

function Playground() {
  // state
  const [grammarSource, setGrammarSource] = useLocalStorage(
    "language-workbench-grammar-source",
    `main :- "foo".`
  );
  const [langSource, setLangSource] = useLocalStorage(
    "language-workbench-source",
    ""
  );
  const [dlSource, setDLSource] = useLocalStorage(
    "language-workbench-dl-source",
    ""
  );
  const [themeSource, setThemeSource] = useLocalStorage(
    "language-workbench-theme-source",
    ""
  );
  const [ruleTreeCollapseState, setRuleTreeCollapseState] =
    useJSONLocalStorage<TreeCollapseState>(
      "language-workbench-rule-tree-collapse-state",
      emptyCollapseState
    );
  // TODO: make this not require a string as its value
  const [cursorPos, setCursorPos] = useLocalStorage(
    "language-workbench-cursor-pos",
    "0"
  );

  const grammarTraceTree = parse(metaGrammar, "grammar", grammarSource);
  const grammarRuleTree = extractRuleTree(grammarTraceTree);
  const grammar = extractGrammar(grammarSource, grammarRuleTree);
  const grammarParseErrors = getErrors(grammarTraceTree).map(formatParseError);
  const grammarErrors = validateGrammar(grammar);
  const [interpWithRules, dlErrors] = (() => {
    try {
      const result =
        dlSource.length > 0 ? initInterp.evalStr(dlSource)[1] : initInterp;
      return [result, []];
    } catch (e) {
      return [initInterp, [e.toString()]];
    }
  })();
  const noMainError = grammar.main ? [] : ["grammar has no 'main' rule"];
  const allGrammarErrors = [
    ...grammarErrors,
    ...grammarParseErrors,
    ...noMainError,
  ];

  // initialize stuff that we'll fill in later, if parse succeeds
  let traceTree: TraceTree = null;
  let ruleTree: RuleTree = null;
  let langParseError: string = null;
  let flattened: Rec[] = [];
  let finalInterp: AbstractInterpreter = interpWithRules;

  if (allGrammarErrors.length === 0) {
    try {
      traceTree = parse(grammar, "main", langSource);
      ruleTree = extractRuleTree(traceTree);
      flattened = flatten(ruleTree, langSource);
      finalInterp = finalInterp.evalStmts(declareTables(grammar))[1];
      finalInterp = finalInterp.insertAll(flattened);
      finalInterp = ensureHighlightSegmentTable(finalInterp);
    } catch (e) {
      langParseError = e.toString();
      console.error(e);
    }
  }

  finalInterp = finalInterp.evalStr(`ide.cursorPos{idx: ${cursorPos}}.`)[1];

  return (
    <>
      <h1>Language Workbench</h1>

      <table>
        <tbody>
          <tr>
            <td>
              <h3>Grammar Source</h3>
              <textarea
                value={grammarSource}
                onChange={(evt) => setGrammarSource(evt.target.value)}
                rows={10}
                cols={50}
                spellCheck={false}
              />
              <ErrorList errors={allGrammarErrors} />
            </td>
            <td>
              <h3>Language Source</h3>
              <CodeEditor
                source={langSource}
                onSourceChange={setLangSource}
                cursorPos={parseInt(cursorPos)}
                onCursorPosChange={(pos) => setCursorPos(pos.toString())}
                interp={finalInterp}
                validGrammar={grammarErrors.length === 0}
              />
              <ErrorList errors={langParseError ? [langParseError] : []} />
            </td>
            <td>
              <h3>Datalog Source</h3>
              <textarea
                value={dlSource}
                onChange={(evt) => setDLSource(evt.target.value)}
                rows={10}
                cols={50}
                spellCheck={false}
              />
              <ErrorList errors={dlErrors} />
            </td>
            <td>
              <h3>Theme Source</h3>
              <textarea
                value={themeSource}
                onChange={(evt) => setThemeSource(evt.target.value)}
                rows={10}
                cols={50}
                spellCheck={false}
              />
              <style>{themeSource}</style>
            </td>
          </tr>
        </tbody>
      </table>

      <>
        {/* we run into errors querying highlight rules if the grammar isn't valid */}
        {grammarErrors.length === 0 ? (
          <Explorer interp={finalInterp} showViz />
        ) : (
          <em>Grammar isn't valid</em>
        )}

        {/* TODO: memoize some of these. they take non-trival time to render */}

        <CollapsibleWithHeading
          heading="Rule Tree"
          content={
            <>
              {ruleTree ? (
                <TreeView
                  tree={ruleTreeToTree(ruleTree, langSource)}
                  render={(n) => renderRuleNode(n.item, langSource)}
                  collapseState={ruleTreeCollapseState}
                  setCollapseState={setRuleTreeCollapseState}
                />
              ) : (
                <em>Grammar isn't valid</em>
              )}
            </>
          }
        />
        <CollapsibleWithHeading
          heading="Flattened"
          content={
            <>
              <ul>
                {flattened.map((record, idx) => (
                  <li key={idx}>
                    <BareTerm term={record} />
                  </li>
                ))}
              </ul>
            </>
          }
        />
        <CollapsibleWithHeading
          heading="Trace Tree"
          content={
            <>
              {traceTree ? (
                <ReactJson
                  name={null}
                  enableClipboard={false}
                  displayObjectSize={false}
                  displayDataTypes={false}
                  src={traceTree}
                  shouldCollapse={({ name }) => name === "span"}
                />
              ) : (
                <em>Grammar isn't valid</em>
              )}
            </>
          }
        />
      </>
    </>
  );
}

ReactDOM.render(<Main />, document.getElementById("main"));
