"use client";

import { useDndMonitor, useDraggable } from "@dnd-kit/core";
import { CSSProperties, useContext, useState } from "react";
import { TransformContext } from "../canvas/TransformProvider";

export default function Draggable(props: {
  id: string;
  handle?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { id } = props;
  const { scale } = useContext(TransformContext);
  const { setNodeRef, transform } = useDraggable({
    id,
  });
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const transformStyles: CSSProperties = {
    transform: transform
      ? `translate3d(${transform?.x / scale}px, ${transform?.y / scale}px, 0)`
      : undefined,
    top: coordinates.y,
    left: coordinates.x,
  };

  useDndMonitor({
    onDragEnd(event) {
      const { delta, active } = event;
      if (!active) return;
      if (active.id !== id) return;
      setCoordinates((prev) => {
        return {
          x: prev.x + delta.x / scale,
          y: prev.y + delta.y / scale,
        };
      });
    },
  });

  return (
    <div
      ref={setNodeRef}
      style={transformStyles}
      className="absolute draggable"
    >
      {props.children}
    </div>
  );
}
