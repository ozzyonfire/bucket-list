import { addItem } from "@/app/actions";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import type { Item, List } from "@prisma/client";
import { GripVertical, MoreVertical, Plus } from "lucide-react";
import Draggable from "./dnd/Draggable";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

export default function ListCard({
  list,
}: {
  list: List & {
    items: Item[];
  };
}) {
  const { setActivatorNodeRef, attributes, listeners, isDragging } =
    useDraggable({
      id: list.id.toString(),
    });

  return (
    <Draggable id={list.id.toString()}>
      <Card
        className={cn("w-[350px] transition-all", {
          "shadow-lg": isDragging,
        })}
      >
        <CardHeader className="flex flex-row gap-2 items-center">
          <Button
            size="icon"
            variant="ghost"
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
          >
            <GripVertical />
          </Button>
          <CardTitle>{list.title}</CardTitle>
          <div className="flex-grow"></div>
          <Button size="icon" variant="ghost">
            <MoreVertical />
          </Button>
        </CardHeader>
        <CardContent>
          <form action={addItem}>
            <div className="flex flex-row gap-2">
              <input hidden name="listId" value={list.id} />
              <Input
                required
                type="text"
                name="new-item"
                placeholder="Add an item"
              />
              <Button type="submit" variant="outline" size="icon">
                <Plus />
              </Button>
            </div>
          </form>
          <div className="flex flex-col gap-2 mt-3">
            {list.items.map((item) => {
              return (
                <div key={item.id} className="flex flex-row gap-2 items-center">
                  <Button size="icon" variant="ghost">
                    <GripVertical />
                  </Button>
                  <div>{item.content}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </Draggable>
  );
}
