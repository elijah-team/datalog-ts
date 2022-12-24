import {
  datalogOut,
  datalogOutResults,
  TestOutput,
} from "../../util/ddTest/types";
import { flatMap } from "../../util/util";
import { ppb, ppt } from "../pretty";
import { dict, rec } from "../types";
import { MessagePayload, Output, RuleGraph } from "./types";

type OutputOptions = {
  emissionLogMode: "test" | "repl";
  showBindings: boolean;
};

export function formatOutput(
  graph: RuleGraph,
  output: Output,
  opts: OutputOptions
): TestOutput {
  switch (output.type) {
    case "Acknowledge":
      return datalogOut([]);
    case "EmissionLog":
      if (opts.emissionLogMode === "test") {
        return {
          mimeType: "incremental-datalog/trace",
          content: output.log
            .map(
              ({ fromID, output }) =>
                `${fromID}: [${output.map(formatMessagePayload).join(", ")}]`
            )
            .join("\n"),
        };
      } else {
        return datalogOut(
          flatMap(
            output.log.filter((emissionBatch) => {
              const fromNode = graph.nodes.get(emissionBatch.fromID);
              return (
                !fromNode.isInternal && fromNode.desc.type !== "BaseFactTable"
              );
            }),
            ({ output }) =>
              output.map((payload) =>
                payload.type === "MarkDone"
                  ? rec("MarkDone", {})
                  : payload.data.type === "Bindings"
                  ? rec("Bindings", {
                      bindings: dict(payload.data.bindings.bindings),
                    })
                  : rec("Record", { rec: payload.data.rec })
              )
          )
        );
      }
    case "QueryResults":
      return opts.showBindings
        ? datalogOutResults(output.results)
        : datalogOut(output.results.map((res) => res.term));
    case "Trace":
      return {
        content: JSON.stringify(output.logAndGraph),
        mimeType: "incremental-datalog/trace",
      };
  }
}

function formatMessagePayload(payload: MessagePayload) {
  switch (payload.type) {
    case "MarkDone":
      return "MarkDone";
    case "Data": {
      const data = payload.data;
      switch (data.type) {
        case "Bindings":
          return ppb(data.bindings.bindings);
        case "Record":
          return ppt(data.rec);
      }
    }
  }
}
