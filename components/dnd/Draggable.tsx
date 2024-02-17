import { useDndMonitor, useDraggable } from "@dnd-kit/core";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CSSProperties, useContext, useState } from "react";
import { DndHelperContext } from "./DnD";

export default function Draggable(props: {
  id: string;
  children: React.ReactNode;
}) {
  const { id } = props;
  const { scale } = useContext(DndHelperContext);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
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
    <Button
      onClick={(e) => {
        e.stopPropagation();
      }}
      ref={setNodeRef}
      style={transformStyles}
      className={cn(
        {
          "bg-blue-500": isDragging,
        },
        "absolute"
        // transformStyles
      )}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </Button>
  );
}
