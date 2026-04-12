import { IMCQ } from "@/types/schema";

export default function MCQ({
  question,
  value,
  onChange,
}: {
  question: IMCQ;
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {question.options.map((opt) => {
        const selected = value === opt;
        return (
          <label
            key={opt}
            className={`flex items-start gap-3 border rounded-md px-4 py-3 cursor-pointer transition-colors ${
              selected
                ? "border-[var(--accent)] bg-[var(--accent)]/5"
                : "border-[var(--line)] hover:border-[var(--muted)]"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                selected ? "border-[var(--accent)]" : "border-[var(--muted)]"
              }`}
            >
              {selected && <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />}
            </span>
            <input
              type="radio"
              name={question.id}
              value={opt}
              checked={selected}
              onChange={() => onChange(opt)}
              className="sr-only"
            />
            <span className="text-sm">{opt}</span>
          </label>
        );
      })}
    </div>
  );
}
