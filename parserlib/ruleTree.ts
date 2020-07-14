import { Span } from "./grammar";
import { TraceTree } from "./parser";
import { flatten } from "../util";

export type RuleTree = {
  name: string;
  span: Span;
  children: RuleTree[];
};

export function extractRuleTree(tt: TraceTree): RuleTree | null {
  switch (tt.type) {
    case "RefTrace":
      return {
        name: tt.name,
        children: getChildren(tt.innerTrace),
        span: tt.span,
      };
    default:
      throw new Error(`have to start with ref trace; got ${tt.type}`);
  }
}

function getChildren(tt: TraceTree): RuleTree[] {
  if (tt.error) {
    return [];
  }
  switch (tt.type) {
    case "SeqTrace":
      return flatten(tt.itemTraces.map(getChildren));
    case "RefTrace":
      return [extractRuleTree(tt)];
    case "ChoiceTrace":
      return getChildren(tt.innerTrace);
    default:
      return [];
  }
}
