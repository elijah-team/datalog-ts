import { updateList } from "../../util/util";
import { Scenario, Trace } from "./types";
import { Json } from "../../util/json";
import * as Step from "./step";
import { stepAll } from "./step";

type State<St, Msg> = {
  selectedScenarioID: string;
  scenStates: ScenState<St, Msg>[];
};

type Action<St, Msg> =
  | {
      type: "UpdateScenario";
      action: ScenarioAction<St, Msg>;
      scenarioID: string;
    }
  | { type: "SelectScenario"; scenarioID: string };

export function initialState<St, Msg>(
  scenarios: Scenario<St, Msg>[]
): State<St, Msg> {
  return {
    scenStates: scenarios.map((scenario) => ({
      scenario,
      trace: scenario.initialState,
      clientIDs: [],
      nextClientID: 0,
    })),
    // TODO: how do I connect this to good ol' useHashParam?
    selectedScenarioID: scenarios[0].id,
  };
}

export function reducer<St extends Json, Msg extends Json>(
  state: State<St, Msg>,
  action: Action<St, Msg>
): State<St, Msg> {
  switch (action.type) {
    case "SelectScenario":
      return { ...state, selectedScenarioID: action.scenarioID };
    case "UpdateScenario":
      return {
        ...state,
        scenStates: updateList(
          state.scenStates,
          (scenState) => scenState.scenario.id === action.scenarioID,
          (old) => scenarioReducer(old, action.action)
        ),
      };
  }
}

export type ScenState<ActorState, Msg> = {
  scenario: Scenario<ActorState, Msg>;
  trace: Trace<ActorState>;
  clientIDs: number[];
  nextClientID: number;
};

export type ScenarioAction<St, Msg> =
  | {
      type: "UpdateTrace";
      newTrace: Trace<St>;
    }
  | { type: "BumpNextClientID" }
  | { type: "ExitClient"; clientID: number };

function scenarioReducer<St extends Json, Msg extends Json>(
  scenState: ScenState<St, Msg>,
  action: ScenarioAction<St, Msg>
): ScenState<St, Msg> {
  switch (action.type) {
    case "ExitClient":
      // TODO: mark it as exited in the trace
      return {
        ...scenState,
        clientIDs: scenState.clientIDs.filter((id) => id !== action.clientID),
      };
    case "UpdateTrace":
      return { ...scenState, trace: action.newTrace };
    case "BumpNextClientID":
      return { ...scenState, nextClientID: scenState.nextClientID + 1 };
  }
}
