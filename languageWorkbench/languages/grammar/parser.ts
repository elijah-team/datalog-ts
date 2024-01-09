// generated by parserlib; do not edit.
import {
  textForSpan,
  childByName,
  childrenByName,
  RuleTree,
  extractRuleTree,
} from "../../parserlib/ruleTree";
import { Span, Grammar, ParseError } from "../../parserlib/types";
import * as parserlib from "../../parserlib/parser";
export type GrammarAlpha = {
  type: "Alpha";
  text: string;
  span: Span;
};
export type GrammarAlphaNum = GrammarAlpha | GrammarNum;
export type GrammarAnyChar = {
  type: "AnyChar";
  text: string;
  span: Span;
};
export type GrammarCaptureName = {
  type: "CaptureName";
  text: string;
  span: Span;
  ident: GrammarIdent;
};
export type GrammarCharRange = {
  type: "CharRange";
  text: string;
  span: Span;
  from: GrammarAlphaNum;
  to: GrammarAlphaNum;
};
export type GrammarCharRule =
  | GrammarCharRange
  | GrammarNotChar
  | GrammarSingleChar
  | GrammarAnyChar;
export type GrammarChoice = {
  type: "Choice";
  text: string;
  span: Span;
  rule: GrammarRule[];
};
export type GrammarCommaSpace = {
  type: "CommaSpace";
  text: string;
  span: Span;
};
export type GrammarComment = {
  type: "Comment";
  text: string;
  span: Span;
  commentChar: GrammarCommentChar[];
};
export type GrammarCommentChar = {
  type: "CommentChar";
  text: string;
  span: Span;
};
export type GrammarIdent = {
  type: "Ident";
  text: string;
  span: Span;
  alpha: GrammarAlpha[];
};
export type GrammarMain = {
  type: "Main";
  text: string;
  span: Span;
  ruleDefn: GrammarRuleDefn[];
  comment: GrammarComment[];
};
export type GrammarNotChar = {
  type: "NotChar";
  text: string;
  span: Span;
  charRule: GrammarCharRule;
};
export type GrammarNum = {
  type: "Num";
  text: string;
  span: Span;
};
export type GrammarPlaceholder = {
  type: "Placeholder";
  text: string;
  span: Span;
};
export type GrammarRef = {
  type: "Ref";
  text: string;
  span: Span;
  captureName: GrammarCaptureName | null;
  ruleName: GrammarRuleName;
};
export type GrammarRepSep = {
  type: "RepSep";
  text: string;
  span: Span;
  repSepKW: GrammarRepSepKW;
  rep: GrammarRule;
  commaSpace: GrammarCommaSpace;
  sep: GrammarRule;
};
export type GrammarRepSepKW = {
  type: "RepSepKW";
  text: string;
  span: Span;
};
export type GrammarRule =
  | GrammarSeq
  | GrammarChoice
  | GrammarRef
  | GrammarText
  | GrammarCharRule
  | GrammarRepSep
  | GrammarPlaceholder;
export type GrammarRuleDefn = {
  type: "RuleDefn";
  text: string;
  span: Span;
  ident: GrammarIdent;
  rule: GrammarRule;
};
export type GrammarRuleName = {
  type: "RuleName";
  text: string;
  span: Span;
  ident: GrammarIdent;
};
export type GrammarSeq = {
  type: "Seq";
  text: string;
  span: Span;
  rule: GrammarRule[];
};
export type GrammarSingleChar = {
  type: "SingleChar";
  text: string;
  span: Span;
};
export type GrammarStringChar = {
  type: "StringChar";
  text: string;
  span: Span;
};
export type GrammarText = {
  type: "Text";
  text: string;
  span: Span;
  stringChar: GrammarStringChar[];
};
export type GrammarWs = {
  type: "Ws";
  text: string;
  span: Span;
};
export function parseAlpha(input: string): [GrammarAlpha, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "alpha", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractAlpha(input, ruleTree);
  return [extracted, errors];
}
export function parseAlphaNum(input: string): [GrammarAlphaNum, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "alphaNum", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractAlphaNum(input, ruleTree);
  return [extracted, errors];
}
export function parseAnyChar(input: string): [GrammarAnyChar, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "anyChar", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractAnyChar(input, ruleTree);
  return [extracted, errors];
}
export function parseCaptureName(
  input: string
): [GrammarCaptureName, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "captureName", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractCaptureName(input, ruleTree);
  return [extracted, errors];
}
export function parseCharRange(
  input: string
): [GrammarCharRange, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "charRange", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractCharRange(input, ruleTree);
  return [extracted, errors];
}
export function parseCharRule(input: string): [GrammarCharRule, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "charRule", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractCharRule(input, ruleTree);
  return [extracted, errors];
}
export function parseChoice(input: string): [GrammarChoice, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "choice", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractChoice(input, ruleTree);
  return [extracted, errors];
}
export function parseCommaSpace(
  input: string
): [GrammarCommaSpace, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "commaSpace", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractCommaSpace(input, ruleTree);
  return [extracted, errors];
}
export function parseComment(input: string): [GrammarComment, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "comment", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractComment(input, ruleTree);
  return [extracted, errors];
}
export function parseCommentChar(
  input: string
): [GrammarCommentChar, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "commentChar", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractCommentChar(input, ruleTree);
  return [extracted, errors];
}
export function parseIdent(input: string): [GrammarIdent, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "ident", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractIdent(input, ruleTree);
  return [extracted, errors];
}
export function parseMain(input: string): [GrammarMain, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "main", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractMain(input, ruleTree);
  return [extracted, errors];
}
export function parseNotChar(input: string): [GrammarNotChar, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "notChar", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractNotChar(input, ruleTree);
  return [extracted, errors];
}
export function parseNum(input: string): [GrammarNum, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "num", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractNum(input, ruleTree);
  return [extracted, errors];
}
export function parsePlaceholder(
  input: string
): [GrammarPlaceholder, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "placeholder", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractPlaceholder(input, ruleTree);
  return [extracted, errors];
}
export function parseRef(input: string): [GrammarRef, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "ref", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractRef(input, ruleTree);
  return [extracted, errors];
}
export function parseRepSep(input: string): [GrammarRepSep, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "repSep", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractRepSep(input, ruleTree);
  return [extracted, errors];
}
export function parseRepSepKW(input: string): [GrammarRepSepKW, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "repSepKW", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractRepSepKW(input, ruleTree);
  return [extracted, errors];
}
export function parseRule(input: string): [GrammarRule, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "rule", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractRule(input, ruleTree);
  return [extracted, errors];
}
export function parseRuleDefn(input: string): [GrammarRuleDefn, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "ruleDefn", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractRuleDefn(input, ruleTree);
  return [extracted, errors];
}
export function parseRuleName(input: string): [GrammarRuleName, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "ruleName", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractRuleName(input, ruleTree);
  return [extracted, errors];
}
export function parseSeq(input: string): [GrammarSeq, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "seq", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractSeq(input, ruleTree);
  return [extracted, errors];
}
export function parseSingleChar(
  input: string
): [GrammarSingleChar, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "singleChar", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractSingleChar(input, ruleTree);
  return [extracted, errors];
}
export function parseStringChar(
  input: string
): [GrammarStringChar, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "stringChar", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractStringChar(input, ruleTree);
  return [extracted, errors];
}
export function parseText(input: string): [GrammarText, ParseError[]] {
  const traceTree = parserlib.parse(GRAMMAR, "text", input);
  const [ruleTree, errors] = extractRuleTree(traceTree);
  const extracted = extractText(input, ruleTree);
  return [extracted, errors];
}
function extractAlpha(input: string, node: RuleTree): GrammarAlpha {
  return {
    type: "Alpha",
    text: textForSpan(input, node.span),
    span: node.span,
  };
}
function extractAlphaNum(input: string, node: RuleTree): GrammarAlphaNum {
  const child = node.children[0];
  switch (child.name) {
    case "alpha": {
      return extractAlpha(input, child);
    }
    case "num": {
      return extractNum(input, child);
    }
  }
}
function extractAnyChar(input: string, node: RuleTree): GrammarAnyChar {
  return {
    type: "AnyChar",
    text: textForSpan(input, node.span),
    span: node.span,
  };
}
function extractCaptureName(input: string, node: RuleTree): GrammarCaptureName {
  return {
    type: "CaptureName",
    text: textForSpan(input, node.span),
    span: node.span,
    ident: extractIdent(input, childByName(node, "ident", null)),
  };
}
function extractCharRange(input: string, node: RuleTree): GrammarCharRange {
  return {
    type: "CharRange",
    text: textForSpan(input, node.span),
    span: node.span,
    from: extractAlphaNum(input, childByName(node, "alphaNum", "from")),
    to: extractAlphaNum(input, childByName(node, "alphaNum", "to")),
  };
}
function extractCharRule(input: string, node: RuleTree): GrammarCharRule {
  const child = node.children[0];
  switch (child.name) {
    case "charRange": {
      return extractCharRange(input, child);
    }
    case "notChar": {
      return extractNotChar(input, child);
    }
    case "singleChar": {
      return extractSingleChar(input, child);
    }
    case "anyChar": {
      return extractAnyChar(input, child);
    }
  }
}
function extractChoice(input: string, node: RuleTree): GrammarChoice {
  return {
    type: "Choice",
    text: textForSpan(input, node.span),
    span: node.span,
    rule: childrenByName(node, "rule").map((child) =>
      extractRule(input, child)
    ),
  };
}
function extractCommaSpace(input: string, node: RuleTree): GrammarCommaSpace {
  return {
    type: "CommaSpace",
    text: textForSpan(input, node.span),
    span: node.span,
  };
}
function extractComment(input: string, node: RuleTree): GrammarComment {
  return {
    type: "Comment",
    text: textForSpan(input, node.span),
    span: node.span,
    commentChar: childrenByName(node, "commentChar").map((child) =>
      extractCommentChar(input, child)
    ),
  };
}
function extractCommentChar(input: string, node: RuleTree): GrammarCommentChar {
  return {
    type: "CommentChar",
    text: textForSpan(input, node.span),
    span: node.span,
  };
}
function extractIdent(input: string, node: RuleTree): GrammarIdent {
  return {
    type: "Ident",
    text: textForSpan(input, node.span),
    span: node.span,
    alpha: childrenByName(node, "alpha").map((child) =>
      extractAlpha(input, child)
    ),
  };
}
function extractMain(input: string, node: RuleTree): GrammarMain {
  return {
    type: "Main",
    text: textForSpan(input, node.span),
    span: node.span,
    ruleDefn: childrenByName(node, "ruleDefn").map((child) =>
      extractRuleDefn(input, child)
    ),
    comment: childrenByName(node, "comment").map((child) =>
      extractComment(input, child)
    ),
  };
}
function extractNotChar(input: string, node: RuleTree): GrammarNotChar {
  return {
    type: "NotChar",
    text: textForSpan(input, node.span),
    span: node.span,
    charRule: extractCharRule(input, childByName(node, "charRule", null)),
  };
}
function extractNum(input: string, node: RuleTree): GrammarNum {
  return {
    type: "Num",
    text: textForSpan(input, node.span),
    span: node.span,
  };
}
function extractPlaceholder(input: string, node: RuleTree): GrammarPlaceholder {
  return {
    type: "Placeholder",
    text: textForSpan(input, node.span),
    span: node.span,
  };
}
function extractRef(input: string, node: RuleTree): GrammarRef {
  return {
    type: "Ref",
    text: textForSpan(input, node.span),
    span: node.span,
    captureName: childByName(node, "captureName", null)
      ? extractCaptureName(input, childByName(node, "captureName", null))
      : null,
    ruleName: extractRuleName(input, childByName(node, "ruleName", null)),
  };
}
function extractRepSep(input: string, node: RuleTree): GrammarRepSep {
  return {
    type: "RepSep",
    text: textForSpan(input, node.span),
    span: node.span,
    repSepKW: extractRepSepKW(input, childByName(node, "repSepKW", null)),
    rep: extractRule(input, childByName(node, "rule", "rep")),
    commaSpace: extractCommaSpace(input, childByName(node, "commaSpace", null)),
    sep: extractRule(input, childByName(node, "rule", "sep")),
  };
}
function extractRepSepKW(input: string, node: RuleTree): GrammarRepSepKW {
  return {
    type: "RepSepKW",
    text: textForSpan(input, node.span),
    span: node.span,
  };
}
function extractRule(input: string, node: RuleTree): GrammarRule {
  const child = node.children[0];
  switch (child.name) {
    case "seq": {
      return extractSeq(input, child);
    }
    case "choice": {
      return extractChoice(input, child);
    }
    case "ref": {
      return extractRef(input, child);
    }
    case "text": {
      return extractText(input, child);
    }
    case "charRule": {
      return extractCharRule(input, child);
    }
    case "repSep": {
      return extractRepSep(input, child);
    }
    case "placeholder": {
      return extractPlaceholder(input, child);
    }
  }
}
function extractRuleDefn(input: string, node: RuleTree): GrammarRuleDefn {
  return {
    type: "RuleDefn",
    text: textForSpan(input, node.span),
    span: node.span,
    ident: extractIdent(input, childByName(node, "ident", null)),
    rule: extractRule(input, childByName(node, "rule", null)),
  };
}
function extractRuleName(input: string, node: RuleTree): GrammarRuleName {
  return {
    type: "RuleName",
    text: textForSpan(input, node.span),
    span: node.span,
    ident: extractIdent(input, childByName(node, "ident", null)),
  };
}
function extractSeq(input: string, node: RuleTree): GrammarSeq {
  return {
    type: "Seq",
    text: textForSpan(input, node.span),
    span: node.span,
    rule: childrenByName(node, "rule").map((child) =>
      extractRule(input, child)
    ),
  };
}
function extractSingleChar(input: string, node: RuleTree): GrammarSingleChar {
  return {
    type: "SingleChar",
    text: textForSpan(input, node.span),
    span: node.span,
  };
}
function extractStringChar(input: string, node: RuleTree): GrammarStringChar {
  return {
    type: "StringChar",
    text: textForSpan(input, node.span),
    span: node.span,
  };
}
function extractText(input: string, node: RuleTree): GrammarText {
  return {
    type: "Text",
    text: textForSpan(input, node.span),
    span: node.span,
    stringChar: childrenByName(node, "stringChar").map((child) =>
      extractStringChar(input, child)
    ),
  };
}
export const GRAMMAR: Grammar = {
  main: {
    type: "RepSep",
    rep: {
      type: "Choice",
      choices: [
        {
          type: "Ref",
          captureName: null,
          rule: "ruleDefn",
        },
        {
          type: "Ref",
          captureName: null,
          rule: "comment",
        },
      ],
    },
    sep: {
      type: "Ref",
      captureName: null,
      rule: "ws",
    },
  },
  comment: {
    type: "Sequence",
    items: [
      {
        type: "Text",
        value: "#",
      },
      {
        type: "RepSep",
        rep: {
          type: "Ref",
          captureName: null,
          rule: "commentChar",
        },
        sep: {
          type: "Text",
          value: "",
        },
      },
    ],
  },
  ruleDefn: {
    type: "Sequence",
    items: [
      {
        type: "Ref",
        captureName: null,
        rule: "ident",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "ws",
      },
      {
        type: "Text",
        value: ":-",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "ws",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "rule",
      },
      {
        type: "Text",
        value: ".",
      },
    ],
  },
  rule: {
    type: "Choice",
    choices: [
      {
        type: "Ref",
        captureName: null,
        rule: "seq",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "choice",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "ref",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "text",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "charRule",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "repSep",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "placeholder",
      },
    ],
  },
  seq: {
    type: "Sequence",
    items: [
      {
        type: "Text",
        value: "[",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "ws",
      },
      {
        type: "RepSep",
        rep: {
          type: "Ref",
          captureName: null,
          rule: "rule",
        },
        sep: {
          type: "Sequence",
          items: [
            {
              type: "Ref",
              captureName: null,
              rule: "ws",
            },
            {
              type: "Text",
              value: ",",
            },
            {
              type: "Ref",
              captureName: null,
              rule: "ws",
            },
          ],
        },
      },
      {
        type: "Ref",
        captureName: null,
        rule: "ws",
      },
      {
        type: "Text",
        value: "]",
      },
    ],
  },
  choice: {
    type: "Sequence",
    items: [
      {
        type: "Text",
        value: "(",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "ws",
      },
      {
        type: "RepSep",
        rep: {
          type: "Ref",
          captureName: null,
          rule: "rule",
        },
        sep: {
          type: "Sequence",
          items: [
            {
              type: "Ref",
              captureName: null,
              rule: "ws",
            },
            {
              type: "Text",
              value: "|",
            },
            {
              type: "Ref",
              captureName: null,
              rule: "ws",
            },
          ],
        },
      },
      {
        type: "Ref",
        captureName: null,
        rule: "ws",
      },
      {
        type: "Text",
        value: ")",
      },
    ],
  },
  ref: {
    type: "Sequence",
    items: [
      {
        type: "Choice",
        choices: [
          {
            type: "Sequence",
            items: [
              {
                type: "Ref",
                captureName: null,
                rule: "captureName",
              },
              {
                type: "Text",
                value: ":",
              },
            ],
          },
          {
            type: "Text",
            value: "",
          },
        ],
      },
      {
        type: "Ref",
        captureName: null,
        rule: "ruleName",
      },
    ],
  },
  captureName: {
    type: "Ref",
    captureName: null,
    rule: "ident",
  },
  ruleName: {
    type: "Ref",
    captureName: null,
    rule: "ident",
  },
  text: {
    type: "Sequence",
    items: [
      {
        type: "Text",
        value: '"',
      },
      {
        type: "RepSep",
        rep: {
          type: "Ref",
          captureName: null,
          rule: "stringChar",
        },
        sep: {
          type: "Text",
          value: "",
        },
      },
      {
        type: "Text",
        value: '"',
      },
    ],
  },
  repSep: {
    type: "Sequence",
    items: [
      {
        type: "Ref",
        captureName: null,
        rule: "repSepKW",
      },
      {
        type: "Text",
        value: "(",
      },
      {
        type: "Ref",
        captureName: "rep",
        rule: "rule",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "commaSpace",
      },
      {
        type: "Ref",
        captureName: "sep",
        rule: "rule",
      },
      {
        type: "Text",
        value: ")",
      },
    ],
  },
  repSepKW: {
    type: "Text",
    value: "repSep",
  },
  charRule: {
    type: "Choice",
    choices: [
      {
        type: "Ref",
        captureName: null,
        rule: "charRange",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "notChar",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "singleChar",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "anyChar",
      },
    ],
  },
  charRange: {
    type: "Sequence",
    items: [
      {
        type: "Text",
        value: "[",
      },
      {
        type: "Ref",
        captureName: "from",
        rule: "alphaNum",
      },
      {
        type: "Text",
        value: "-",
      },
      {
        type: "Ref",
        captureName: "to",
        rule: "alphaNum",
      },
      {
        type: "Text",
        value: "]",
      },
    ],
  },
  notChar: {
    type: "Sequence",
    items: [
      {
        type: "Char",
        rule: {
          type: "Literal",
          value: "^",
        },
      },
      {
        type: "Ref",
        captureName: null,
        rule: "charRule",
      },
    ],
  },
  singleChar: {
    type: "Sequence",
    items: [
      {
        type: "Text",
        value: "'",
      },
      {
        type: "Choice",
        choices: [
          {
            type: "Sequence",
            items: [
              {
                type: "Char",
                rule: {
                  type: "Literal",
                  value: "\\",
                },
              },
              {
                type: "Char",
                rule: {
                  type: "Literal",
                  value: "n",
                },
              },
            ],
          },
          {
            type: "Sequence",
            items: [
              {
                type: "Char",
                rule: {
                  type: "Literal",
                  value: "\\",
                },
              },
              {
                type: "Char",
                rule: {
                  type: "Literal",
                  value: "\\",
                },
              },
            ],
          },
          {
            type: "Char",
            rule: {
              type: "AnyChar",
            },
          },
        ],
      },
      {
        type: "Text",
        value: "'",
      },
    ],
  },
  anyChar: {
    type: "Text",
    value: ".",
  },
  ident: {
    type: "RepSep",
    rep: {
      type: "Ref",
      captureName: null,
      rule: "alpha",
    },
    sep: {
      type: "Text",
      value: "",
    },
  },
  ws: {
    type: "RepSep",
    rep: {
      type: "Choice",
      choices: [
        {
          type: "Text",
          value: " ",
        },
        {
          type: "Text",
          value: "\n",
        },
      ],
    },
    sep: {
      type: "Text",
      value: "",
    },
  },
  commaSpace: {
    type: "Sequence",
    items: [
      {
        type: "Text",
        value: ",",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "ws",
      },
    ],
  },
  placeholder: {
    type: "Text",
    value: "???",
  },
  alphaNum: {
    type: "Choice",
    choices: [
      {
        type: "Ref",
        captureName: null,
        rule: "alpha",
      },
      {
        type: "Ref",
        captureName: null,
        rule: "num",
      },
    ],
  },
  alpha: {
    type: "Choice",
    choices: [
      {
        type: "Char",
        rule: {
          type: "Range",
          from: "a",
          to: "z",
        },
      },
      {
        type: "Char",
        rule: {
          type: "Range",
          from: "A",
          to: "Z",
        },
      },
    ],
  },
  num: {
    type: "Char",
    rule: {
      type: "Range",
      from: "0",
      to: "9",
    },
  },
  stringChar: {
    type: "Choice",
    choices: [
      {
        type: "Char",
        rule: {
          type: "Not",
          rule: {
            type: "Literal",
            value: '"',
          },
        },
      },
      {
        type: "Sequence",
        items: [
          {
            type: "Char",
            rule: {
              type: "Literal",
              value: "\\",
            },
          },
          {
            type: "Char",
            rule: {
              type: "Literal",
              value: '"',
            },
          },
        ],
      },
    ],
  },
  commentChar: {
    type: "Char",
    rule: {
      type: "Not",
      rule: {
        type: "Literal",
        value: "\n",
      },
    },
  },
};
