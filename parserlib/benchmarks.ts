import v8profiler from "v8-profiler-node8";
import { Performance } from "w3c-hr-time";
import * as fs from "fs";
import { BenchmarkResult, BenchmarkSpec, doBenchmark } from "../util/benchmark";
import { AbstractInterpreter } from "../core/abstractInterpreter";
import { SimpleInterpreter } from "../core/simple/interpreter";
import { fsLoader } from "../core/fsLoader";
import { IncrementalInterpreter } from "../core/incremental/interpreter";
import { parseGrammar } from "./meta";
import { grammarToDL, inputToDL } from "./datalog/genDatalog";
import { parse } from "./parser";

const performance = new Performance();

const GRAMMAR = `main :- value.
value :- (object | array | int | string | null).
int :- [[0-9], repSep([0-9], "")].
object :- ["{", repSep(keyValue, ","), "}"].
keyValue :- [string, ":", value].
string :- ["'", repSep([a-z], ""), "'"].
array :- ["[", repSep(value, ","), "]"].
null :- "null".
`;

const INPUT = "[{'a':null,'b':'bar','c':[1]},3]";

export const parserBenchmarks: BenchmarkSpec[] = [
  {
    name: "parse-json-simple",
    run(): BenchmarkResult {
      const interp: AbstractInterpreter = new SimpleInterpreter(".", fsLoader);
      return parserTestDatalog(interp, 10, GRAMMAR, INPUT);
    },
  },
  {
    name: "parse-json-incr",
    run(): BenchmarkResult {
      const interp: AbstractInterpreter = new IncrementalInterpreter(
        ".",
        fsLoader
      );
      return parserTestDatalog(interp, 10, GRAMMAR, INPUT);
    },
  },
  {
    name: "parse-json-native",
    run(): BenchmarkResult {
      return parserTestNativeJS(10000, GRAMMAR, INPUT);
    },
  },
];

function parserTestDatalog(
  emptyInterp: AbstractInterpreter,
  repetitions: number,
  grammarSource: string,
  input: string
): BenchmarkResult {
  const loadedInterp = emptyInterp.doLoad("parserlib/datalog/parse.dl");
  const grammarParsed = parseGrammar(grammarSource);
  const grammarDL = grammarToDL(grammarParsed);
  const inputDL = inputToDL(input);

  return doBenchmark(repetitions, () => {
    let interp = loadedInterp;
    interp = interp.insertAll(grammarDL);
    interp = interp.insertAll(inputDL);

    interp.queryStr("parse.fullMatch{}");
  });
}

function parserTestNativeJS(
  repetitions: number,
  grammarSource: string,
  input: string
): BenchmarkResult {
  const grammarParsed = parseGrammar(grammarSource);

  return doBenchmark(repetitions, () => {
    parse(grammarParsed, "main", input);
  });
}
