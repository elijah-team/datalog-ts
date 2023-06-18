import React from "react";
import { VizArgs, VizTypeSpec } from "./typeSpec";
import { Int, Rec, Res, StringLit, Term } from "../../core/types";
import {
  AbsPos,
  Circle,
  Diag,
  EMPTY_DIAGRAM,
  HLayout,
  Line,
  ORIGIN,
  Tag,
  Text,
  VLayout,
  ZLayout,
} from "../../util/diagrams/types";
import { Diagram } from "../../util/diagrams/render";
import { getCoords } from "../../util/diagrams/getCoords";
import { flatMap, uniqBy } from "../../util/util";
import { jsonEq } from "../../util/json";
import { termEq } from "../../core/unify";
import { ppt } from "../../core/pretty";

export const sequence: VizTypeSpec = {
  name: "Sequence Diagram",
  description: "visualize multiple processes interacting over time",
  component: SequenceDiagram,
};

function SequenceDiagram(props: VizArgs) {
  try {
    const actors = props.interp.queryRec(props.spec.attrs.actors as Rec);
    const messages = props.interp.queryRec(props.spec.attrs.messages as Rec);
    const tickColors = props.spec.attrs.tickColor
      ? props.interp.queryRec(props.spec.attrs.tickColor as Rec)
      : [];

    const spec = makeSequenceSpec(actors, messages, tickColors);
    console.log("sequence spec", spec);

    return (
      <div>
        <Diagram<Term>
          diagram={sequenceDiagram(spec, props.highlightedTerm)}
          onMouseOver={(term) => props.setHighlightedTerm?.(term)}
        />
      </div>
    );
  } catch (e) {
    console.error("while evaluating sequence diagram:", e);
    return (
      <pre style={{ color: "red", fontFamily: "monospace" }}>
        {e.toString()}
      </pre>
    );
  }
}

const DEFAULT_TICK_COLOR = "red";

// TODO: maybe integrate this into one of the above functions??
//   or not
function makeSequenceSpec(
  actors: Res[],
  messages: Res[],
  tickColors: Res[]
): Sequence {
  const locations = uniqBy((res) => ppt(res.bindings.ID), actors);
  const colorByTick = {};
  tickColors.forEach((tickColor) => {
    colorByTick[ppt(tickColor.bindings.Tick)] = (
      tickColor.bindings.Color as StringLit
    ).val;
  });
  return {
    locations: locations.map((actor) => ({
      loc: (actor.bindings.ID as StringLit).val,
      term: actor.term,
    })),
    hops: messages.map((message) => {
      const fromTickRec = message.bindings.FromTick as Rec;
      const fromTick: Tick = {
        time: (fromTickRec.attrs.time as Int).val,
        place: (fromTickRec.attrs.place as StringLit).val,
        term: fromTickRec,
        color: colorByTick[ppt(fromTickRec)] || DEFAULT_TICK_COLOR,
      };
      const toTickRec = message.bindings.ToTick as Rec;
      const toTick: Tick = {
        time: (toTickRec.attrs.time as Int).val,
        place: (toTickRec.attrs.place as StringLit).val,
        term: toTickRec,
        color: colorByTick[ppt(toTickRec)] || DEFAULT_TICK_COLOR,
      };
      return {
        term: message.term,
        from: fromTick,
        to: toTick,
      };
    }),
  };
}

export type Location = string;
export type Time = number;

export interface Sequence {
  locations: { loc: Location; term: Term }[];
  hops: Hop[];
}

export interface Hop {
  term: Term;
  from: Tick;
  to: Tick;
}

interface Tick {
  place: Location;
  time: Time;
  term: Term;
  color: string;
}

function yForTime(t: Time): number {
  return t * 10;
}

export function sequenceDiagram(seq: Sequence, highlight: Term): Diag<Term> {
  const maxTime = seq.hops.reduce(
    (prev, hop) => Math.max(prev, hop.to.time, hop.from.time),
    0
  );

  const locationLines: Diag<Term> = AbsPos(
    { x: 40, y: 20 },
    HLayout(
      seq.locations.map((loc) =>
        VLayout([
          Tag(
            loc.term,
            // TODO: cursor: pointer
            Text({
              text: loc.loc,
              fontSize: 10,
              fontWeight: termEq(loc.term, highlight) ? "bold" : "normal",
            })
          ),
          ZLayout([
            Line({
              width: 1,
              stroke: "black",
              start: ORIGIN,
              end: { x: 0, y: yForTime(maxTime) + 20 },
            }),
            ...pointsForLocation(loc.loc, seq.hops).map((tp) => {
              const highlighted = jsonEq(tp.term, highlight);
              return AbsPos(
                { x: 0, y: yForTime(tp.time) },
                Tag(
                  tp.term,
                  Circle({
                    radius: 5,
                    fill: highlighted ? "orange" : tp.color,
                  })
                )
              );
            }),
          ]),
        ])
      )
    )
  );
  const hops = ZLayout(
    seq.hops.map((hop) => {
      const fromCoords = getCoords(locationLines, hop.from.term);
      const toCoords = getCoords(locationLines, hop.to.term);
      if (fromCoords === null || toCoords === null) {
        return EMPTY_DIAGRAM;
      }
      const highlighted = jsonEq(hop.term, highlight);
      return Tag(
        hop.term,
        Line({
          stroke: highlighted ? "orange" : "blue",
          width: 3,
          start: fromCoords,
          end: toCoords,
        })
      );
    })
  );
  return ZLayout<Term>([hops, locationLines]);
}

function pointsForLocation(loc: Location, hops: Hop[]): Tick[] {
  return flatMap(hops, (hop) => {
    const out: Tick[] = [];
    if (hop.to.place === loc) {
      out.push(hop.to);
    }
    if (hop.from.place === loc) {
      out.push(hop.from);
    }
    return out;
  });
}
