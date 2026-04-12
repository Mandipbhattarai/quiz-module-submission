"use client";

import { Flag } from "lucide-react";
import { IQuestion } from "@/types/schema";
import MCQ from "./questions/MCQ";
import MathMCQ from "./questions/MathMCQ";
import DragDrop from "./questions/DragDrop";
import Speaking from "./questions/Speaking";

export default function QuestionCard({
  question,
  answer,
  onAnswer,
  isFlagged,
  onToggleFlag,
}: {
  question: IQuestion;
  answer: any;
  onAnswer: (value: any) => void;
  isFlagged: boolean;
  onToggleFlag: () => void;
}) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-md p-6">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="text-base leading-relaxed flex-1">{question.question}</div>
        <button
          onClick={onToggleFlag}
          aria-label={isFlagged ? "Unflag question" : "Flag question for review"}
          title={isFlagged ? "Flagged for review" : "Flag for review"}
          className={`shrink-0 ${
            isFlagged ? "text-red-500" : "text-[var(--muted)] hover:text-[var(--ink)]"
          }`}
        >
          <Flag size={16} fill={isFlagged ? "currentColor" : "none"} />
        </button>
      </div>
      {question.type === "mcq" && (
        <MCQ question={question} value={answer} onChange={onAnswer} />
      )}
      {question.type === "math_mcq" && (
        <MathMCQ question={question} value={answer} onChange={onAnswer} />
      )}
      {question.type === "drag_and_drop" && (
        <DragDrop question={question} value={answer} onChange={onAnswer} />
      )}
      {question.type === "speaking" && (
        <Speaking
          question={question}
          uploaded={answer === true}
          onUploaded={() => onAnswer(true)}
        />
      )}
    </div>
  );
}
