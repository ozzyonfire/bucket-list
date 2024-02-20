import { addItem, swapItems } from "@/app/actions";
import { cn } from "@/lib/utils";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import type { Item, List } from "@prisma/client";
import { GripVertical, MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import Draggable from "../dnd/Draggable";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import ListItem from "./ListItem";

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

  const [items, setItems] = useState<Item[]>(list.items);

  const sortableItems = items.sort((a, b) => {
    return a.order - b.order;
  });

  const handleSwapItems = async (itemA: number, itemB: number) => {
    const newItems = [...items];
    const indexA = newItems.findIndex((item) => item.id === itemA);
    const indexB = newItems.findIndex((item) => item.id === itemB);
    const temp = newItems[indexA].order;
    newItems[indexA].order = newItems[indexB].order;
    newItems[indexB].order = temp;
    setItems(newItems);
    await swapItems(itemA, itemB);
  };

  return (
    <Draggable id={list.id.toString()}>
      <Card
        className={cn("w-[350px] transition-all shadow-md", {
          "shadow-xl": isDragging,
        })}
      >
        <CardHeader className="flex flex-row items-start space-y-0">
          <div className="flex flex-col gap-2">
            <CardTitle>{list.title}</CardTitle>
            <CardDescription>{list.description}</CardDescription>
          </div>
          <div className="flex-grow"></div>
          <Button
            size="icon"
            variant="ghost"
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
          >
            <GripVertical />
          </Button>
        </CardHeader>
        <CardContent>
          <form action={addItem}>
            <div className="flex flex-row gap-2">
              <input hidden name="listId" defaultValue={list.id} />
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
          <div className="grid grid-cols-1 mt-3 divide-y">
            <DndContext
              onDragEnd={(event) => {
                const { over, active } = event;
                if (!over) return;
                if (!active) return;
                if (over.id === active.id) return;
                const itemAId = parseInt(active.id.toString());
                const itemBId = parseInt(over.id.toString());
                handleSwapItems(itemAId, itemBId);
              }}
            >
              <SortableContext items={sortableItems}>
                {sortableItems.map((item) => {
                  return <ListItem key={item.id} item={item} />;
                })}
              </SortableContext>
            </DndContext>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="icon" variant="ghost">
            <MoreHorizontal />
          </Button>
        </CardFooter>
      </Card>
    </Draggable>
  );
}
