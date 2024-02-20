"use client";

import { DndContext } from "@dnd-kit/core";
import Canvas from "../canvas/Canvas";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { Item, List } from "@prisma/client";
import ListCard from "../ListCard";

export default function DnD({
  lists,
}: {
  lists: (List & {
    items: Item[];
  })[];
}) {
  return (
    <DndContext
      onDragEnd={(event) => {
        const { over } = event;
        console.log("drag ended", over?.id);
      }}
    >
      <Canvas>
        {lists.map((list) => {
          return <ListCard key={list.id} list={list} />;
        })}
        <Draggable id="drag1">Drag me</Draggable>
        <Draggable id="drag2">Drag me too</Draggable>
        <div className="flex flex-col gap-2">
          <Droppable id="droppable">Drop here</Droppable>
          <Droppable id="droppable2">Drop here</Droppable>
        </div>
      </Canvas>
    </DndContext>
  );
}
