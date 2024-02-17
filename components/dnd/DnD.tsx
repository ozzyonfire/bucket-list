"use client";

import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import Canvas from "../canvas/Canvas";
import { createContext, useState } from "react";

export const DndHelperContext = createContext<{
  scale: number;
  setScale: (scale: number) => void;
}>({
  scale: 1,
  setScale: () => {},
});

export default function DnD() {
  const [scale, setScale] = useState(1);

  return (
    <DndHelperContext.Provider value={{ scale, setScale }}>
      <DndContext
        onDragEnd={(event) => {
          const { over } = event;
          console.log("drag ended", over?.id);
        }}
      >
        <Canvas>
          <Draggable id="drag1">Drag me</Draggable>
          <Draggable id="drag2">Drag me too</Draggable>
          <div className="flex flex-col gap-2">
            <Droppable id="droppable">Drop here</Droppable>
            <Droppable id="droppable2">Drop here</Droppable>
          </div>
        </Canvas>
      </DndContext>
    </DndHelperContext.Provider>
  );
}
