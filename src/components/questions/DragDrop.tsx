"use client";

import { useEffect } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { IDragAndDrop } from "@/types/schema";

function SortableItem({ id, index }: { id: string; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(0, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
    touchAction: "none",
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-3 border border-[var(--line)] bg-[var(--surface)] rounded-md px-4 py-3 cursor-grab active:cursor-grabbing select-none hover:border-[var(--muted)]"
    >
      <span className="text-[var(--muted)] text-xs font-mono w-5">{index + 1}</span>
      <GripVertical size={14} className="text-[var(--muted)]" />
      <span className="text-sm">{id}</span>
    </li>
  );
}

export default function DragDrop({
  question,
  value,
  onChange,
}: {
  question: IDragAndDrop;
  value: string[] | undefined;
  onChange: (v: string[]) => void;
}) {
  const order = value?.length === question.items.length ? value : question.items;
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (!value) onChange(question.items);
  }, [value, question.items, onChange]);

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = order.indexOf(active.id as string);
    const newIndex = order.indexOf(over.id as string);
    onChange(arrayMove(order, oldIndex, newIndex));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <SortableContext items={order} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-2 w-full">
          {order.map((item, i) => (
            <SortableItem key={item} id={item} index={i} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
