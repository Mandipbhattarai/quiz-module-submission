import { Flag } from "lucide-react";
import { IQuestion } from "@/types/schema";

export default function ResultItem({
  index,
  question,
  result,
  isFlagged,
}: {
  index: number;
  question: IQuestion | undefined;
  result: {
    correct: boolean;
    explanation: string;
    correctAnswer?: string;
    correctOrder?: string[];
    speakingSubmitted?: boolean;
  };
  isFlagged: boolean;
}) {
  return (
    <div className="border border-[var(--line)] rounded-md p-5 bg-[var(--surface)]">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
            <span>Question {index + 1}</span>
            {isFlagged && (
              <span
                title="Flagged for review"
                className="flex items-center gap-1 text-red-500 normal-case tracking-normal"
              >
                <Flag size={11} fill="currentColor" />
                Flagged
              </span>
            )}
          </div>
          <div className="text-sm">{question?.question}</div>
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
            result.correct
              ? "text-green-700 bg-green-50 border border-green-200"
              : "text-red-700 bg-red-50 border border-red-200"
          }`}
        >
          {result.correct ? "Correct" : "Incorrect"}
        </span>
      </div>

      {result.correctAnswer && (
        <div className="text-sm mb-2">
          <span className="text-[var(--muted)]">Answer: </span>
          {result.correctAnswer}
        </div>
      )}

      {result.correctOrder && (
        <div className="text-sm mb-2">
          <div className="text-[var(--muted)] mb-1">Correct order:</div>
          <ol className="list-decimal list-inside space-y-0.5 pl-1">
            {result.correctOrder.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      )}

      {result.speakingSubmitted !== undefined && (
        <div className="text-sm mb-2">
          <span className="text-[var(--muted)]">Recording: </span>
          {result.speakingSubmitted ? "submitted" : "not submitted"}
        </div>
      )}

      <div className="text-sm text-[var(--muted)] leading-relaxed mt-3 pt-3 border-t border-[var(--line)]">
        {result.explanation}
      </div>
    </div>
  );
}
