"use client";

import { useState } from "react";
import { IStimulus } from "@/types/schema";

export default function Stimulus({ title, content }: IStimulus) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border border-[var(--line)] rounded-md bg-[var(--surface)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-5 md:cursor-default"
      >
        <h2 className="font-semibold text-left">{title}</h2>
        <span className="md:hidden text-[var(--muted)]">{open ? "−" : "+"}</span>
      </button>
      <div className={`px-5 pb-5 ${open ? "block" : "hidden md:block"}`}>
        <p className="text-[var(--muted)] leading-relaxed text-sm">{content}</p>
      </div>
    </div>
  );
}
