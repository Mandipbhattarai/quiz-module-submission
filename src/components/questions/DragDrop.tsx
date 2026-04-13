"use client";

import { useEffect } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { GripVertical } from "lucide-react";
import { IDragAndDrop } from "@/types/schema";

function SortableItem({
  id,
  index,
  label,
}: {
  id: string;
  index: number;
  label: string;
}) {
  const { ref, isDragging } = useSortable({ id, index });

  return (
    <li
      ref={ref as any}
      style={{
        opacity: isDragging ? 0.5 : 1,
        touchAction: "none",
        zIndex: isDragging ? 10 : "auto",
      }}
      className="flex items-center gap-3 border border-[var(--line)] bg-[var(--surface)] rounded-md px-4 py-3 cursor-grab active:cursor-grabbing select-none hover:border-[var(--muted)]"
    >
      <span className="text-[var(--muted)] text-xs font-mono w-5">
        {index + 1}
      </span>
      <GripVertical size={14} className="text-[var(--muted)]" />
      <span className="text-sm">{label}</span>
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
  const order =
    value?.length === question.items.length ? value : question.items;

  useEffect(() => {
    if (!value) onChange(question.items);
  }, [value, question.items, onChange]);

  function handleDragEnd(event: any) {
    if (event.canceled) return;
    const source = event.operation?.source;
    if (!source) return;

    const from = source.initialIndex ?? source.sortable?.initialIndex;
    const to = source.index ?? source.sortable?.index;
    if (from == null || to == null || from === to) return;

    const next = order.slice();
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <ul className="flex flex-col gap-2 w-full">
        {order.map((item, i) => (
          <SortableItem key={item} id={item} index={i} label={item} />
        ))}
      </ul>
    </DragDropProvider>
  );
}
