"use client";

import { useDndMonitor } from "@dnd-kit/core";
import React, { useContext, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { DndHelperContext } from "../dnd/DnD";

export default function Canvas(props: { children: React.ReactNode }) {
  const [isDragging, setIsDragging] = useState(false);
  const { setScale } = useContext(DndHelperContext);

  useDndMonitor({
    onDragStart() {
      setIsDragging(true);
    },
    onDragEnd() {
      setIsDragging(false);
    },
    onDragCancel() {
      setIsDragging(false);
    },
  });

  return (
    <TransformWrapper
      initialScale={1}
      minScale={0.2}
      maxScale={3}
      centerOnInit={true}
      limitToBounds={false}
      disabled={isDragging}
      onZoom={(ref) => {
        console.log("zoom", ref.state.scale);
        setScale(ref.state.scale);
      }}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          {/* <div className="tools">
            {/* <button onClick={zoomIn}>+</button>
            <button onClick={zoomOut}>-</button>
            <button onClick={resetTransform}>x</button>
          </div> */}
          <TransformComponent
            contentStyle={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
            wrapperStyle={{
              overflow: "hidden",
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            {/* Your draggable items here */}
            {props.children}
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
}
