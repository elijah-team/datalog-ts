import { ack, emptyRuleGraph, Output, RuleGraph } from "./types";
import { Res, Rule, Statement } from "../types";
import { doQuery, insertOrRetractFact, replayFacts } from "./eval";
import { Loader } from "../loaders";
import { AbstractInterpreter } from "../abstractInterpreter";
import { filterMap } from "../../util/util";
import {
  addFact,
  addRule,
  Catalog,
  declareTable,
  emptyCatalog,
  removeFact,
} from "./catalog";
import { buildGraph } from "./build";

export class IncrementalInterpreter extends AbstractInterpreter {
  graph: RuleGraph | null;
  catalog: Catalog;

  // TODO: kind of don't want to expose the graph parameter on the public
  //   constructor, but there's no constructor overloading...
  constructor(
    cwd: string,
    loader: Loader,
    catalog: Catalog = emptyCatalog,
    graph: RuleGraph = emptyRuleGraph
  ) {
    super(cwd, loader);
    this.graph = graph;
    this.catalog = catalog;
  }

  evalStmt(stmt: Statement): [Res[], AbstractInterpreter] {
    const { output, newInterp } = this.processStmt(stmt);
    return [output.type === "QueryResults" ? output.results : [], newInterp];
  }

  processStmt(stmt: Statement): {
    newInterp: AbstractInterpreter;
    output: Output;
  } {
    const interp = this;
    switch (stmt.type) {
      case "TableDecl": {
        const existing = interp.catalog[stmt.name];
        if (existing) {
          if (existing.type === "Table") {
            return { newInterp: this, output: ack };
          }
          throw new Error(
            `can't declare table ${stmt.name}: already a rule with that name`
          );
        }
        const newCatalog = declareTable(interp.catalog, stmt.name);
        const newInterp = new IncrementalInterpreter(
          this.cwd,
          this.loader,
          newCatalog,
          null
        );
        return {
          newInterp,
          output: ack,
        };
      }
      case "Rule": {
        const newCatalog = addRule(interp.catalog, stmt.rule);
        return {
          newInterp: new IncrementalInterpreter(
            this.cwd,
            this.loader,
            newCatalog,
            null
          ),
          output: ack,
        };
      }
      case "Fact": {
        let newCatalog = this.catalog;
        let newGraph = this.graph;
        const tableName = stmt.record.relation;
        if (!this.catalog[tableName]) {
          // create table if it doesn't exist
          newCatalog = declareTable(newCatalog, tableName);
          newGraph = replayFacts(buildGraph(newCatalog), newCatalog);
        } else if (newGraph === null) {
          // rebuild graph if it was invalidated otherwise
          newGraph = replayFacts(buildGraph(newCatalog), newCatalog);
        }
        // add the new fact
        newCatalog = addFact(this.catalog, stmt.record);
        newGraph = insertOrRetractFact(newGraph, stmt.record, 1).newGraph;
        return {
          newInterp: new IncrementalInterpreter(
            this.cwd,
            this.loader,
            newCatalog,
            newGraph
          ),
          output: ack,
        };
      }
      case "Delete": {
        const newCatalog = removeFact(this.catalog, stmt.record);
        const newGraph = insertOrRetractFact(
          this.graph,
          stmt.record,
          -1
        ).newGraph;
        return {
          newInterp: new IncrementalInterpreter(
            this.cwd,
            this.loader,
            newCatalog,
            newGraph
          ),
          output: ack,
        };
      }
      case "Query": {
        let newInterp: IncrementalInterpreter = interp;
        if (interp.graph === null) {
          newInterp = new IncrementalInterpreter(
            this.cwd,
            this.loader,
            this.catalog,
            replayFacts(buildGraph(this.catalog), this.catalog)
          );
        }
        return {
          newInterp,
          output: {
            type: "QueryResults",
            results: doQuery(newInterp.graph, stmt.record),
          },
        };
      }
      case "LoadStmt":
        return {
          newInterp: this.doLoad(stmt.path),
          output: ack,
        };
    }
  }

  getRules(): Rule[] {
    return filterMap(Object.entries(this.catalog), ([key, val]) =>
      val.type === "Rule" ? val.rule : null
    );
  }

  getTables(): string[] {
    return filterMap(Object.entries(this.catalog), ([key, val]) =>
      val.type === "Table" ? key : null
    );
  }
}
