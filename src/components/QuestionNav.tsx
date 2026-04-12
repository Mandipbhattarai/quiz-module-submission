"use client";

import { IQuestion } from "@/types/schema";

export default function QuestionNav({
  questions,
  currentIndex,
  answers,
  flagged,
  seen,
  onJump,
}: {
  questions: IQuestion[];
  currentIndex: number;
  answers: Record<string, any>;
  flagged: string[];
  seen: string[];
  onJump: (i: number) => void;
}) {
  return (
    <div className="flex justify-between items-center flex-wrap gap-3">
      <div className="text-sm text-[var(--muted)]">
        Question {currentIndex + 1} of {questions.length}
      </div>
      <div className="flex gap-1.5">
        {questions.map((q, i) => {
          const isActive = i === currentIndex;
          const isAnswered = answers[q.id] !== undefined;
          const isFlagged = flagged.includes(q.id);
          const isSeen = seen.includes(q.id);

          const status = isFlagged
            ? "border-red-500 text-red-500"
            : isAnswered
            ? "border-green-500 text-green-500"
            : isSeen
            ? "border-yellow-500 text-yellow-500"
            : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)]";

          return (
            <button
              key={q.id}
              onClick={() => onJump(i)}
              className={`w-7 h-7 rounded text-xs border transition-colors ${
                isActive
                  ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                  : status
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
