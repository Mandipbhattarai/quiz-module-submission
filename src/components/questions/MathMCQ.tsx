import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import { IMathMCQ } from "@/types/schema";
import MCQ from "./MCQ";

export default function MathMCQ({
  question,
  value,
  onChange,
}: {
  question: IMathMCQ;
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  const formula = question.formula.replace(/^\\\(\s*/, "").replace(/\s*\\\)$/, "");
  return (
    <div className="flex flex-col gap-4">
      <div className="border-l-2 border-[var(--accent)] pl-4 py-1">
        <InlineMath math={formula} />
      </div>
      <MCQ question={question as any} value={value} onChange={onChange} />
    </div>
  );
}
