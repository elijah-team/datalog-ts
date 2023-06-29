import { AbstractInterpreter } from "../../core/abstractInterpreter";
import { Rec, int, rec, str } from "../../core/types";
import { jsonToDL } from "../../util/json2dl";
import { State, ThreadStatus } from "./interpreter";

export function dumpState(
  interp: AbstractInterpreter,
  state: State
): AbstractInterpreter {
  const records: Rec[] = [];
  Object.entries(state.threadStates).forEach(([threadID, threadState]) => {
    records.push(
      rec("state.ProgramCounter", {
        thread: str(threadID),
        counter: int(threadState.counter),
        time: int(state.timestamp),
        // TODO: rename field to status?
        state: jsonToDL(threadState.status),
      })
    );
  });
  Object.entries(state.locks).forEach(([lockID, lockState]) => {
    records.push(
      rec("state.Lock", {
        id: str(lockID),
        time: int(state.timestamp),
        state: jsonToDL(lockState),
      })
    );
  });
  interp = interp.bulkInsert(records);
  return interp;
}
