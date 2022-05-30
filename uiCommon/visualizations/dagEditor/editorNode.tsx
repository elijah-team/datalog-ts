import React from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { mapObjToList } from "../../../util/util";
import { BareTerm } from "../../dl/replViews";
import { TermEditor } from "./editors";
import { EditorNodeData } from "./types";
import { getBaseRecord, getSpecForAttr } from "./util";

export function EditorNode(props: NodeProps<EditorNodeData>) {
  const rec = getBaseRecord(props.data.res);

  return (
    <div
      style={{
        fontSize: 12,
        background: "#eee",
        border: "1px solid #555",
        borderRadius: 5,
        padding: 10,
        width: 250,
        fontFamily: "monospace",
        cursor: "default",
      }}
    >
      <Handle
        type="target"
        // @ts-ignore
        position="top"
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={props.isConnectable}
      />
      <div
        className="custom-drag-handle"
        style={{ cursor: props.dragging ? "grabbing" : "grab" }}
      >
        <button onClick={() => props.data.onDelete()}>×</button>{" "}
        <strong>{rec.relation}</strong>
      </div>
      <div>
        {mapObjToList(rec.attrs, (attr, val) => {
          const attrEditorSpec = getSpecForAttr(
            props.data.editors,
            rec.relation,
            attr
          );
          // console.log("RemovableNode", {
          //   relation: rec.relation,
          //   attr,
          //   val,
          //   attrEditorSpec,
          //   editors: props.data.editors,
          // });
          return (
            <div key={attr}>
              {attr}:{" "}
              {attrEditorSpec ? (
                <TermEditor
                  spec={attrEditorSpec.editor}
                  term={val}
                  onChange={(newTerm) => {
                    props.data.onChange({
                      ...rec,
                      attrs: { ...rec.attrs, [attr]: newTerm },
                    });
                  }}
                />
              ) : (
                <BareTerm term={val} />
              )}
            </div>
          );
        })}
      </div>
      <Handle
        type="source"
        // @ts-ignore
        position="bottom"
        id="b"
        isConnectable={props.isConnectable}
      />
    </div>
  );
}
