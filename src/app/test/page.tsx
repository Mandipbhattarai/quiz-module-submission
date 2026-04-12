"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Stimulus from "@/components/Stimulus";
import Timer from "@/components/Timer";
import QuestionNav from "@/components/QuestionNav";
import QuestionCard from "@/components/QuestionCard";
import SubmitModal from "@/components/SubmitModal";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowLeft, ArrowRight } from "lucide-react";
import testData from "@/data/test";
import { useTestState } from "@/hooks/useTestState";
import { submitTest } from "@/app/actions";

export default function TestPage() {
  const router = useRouter();
  const { answers, setAnswer, currentIndex, setCurrentIndex, deadline, flagged, seen, toggleFlag } =
    useTestState();

  const [confirming, setConfirming] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const questions = testData.test.questions;
  const q = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  async function handleSubmit(timedOut = false) {
    setSubmitting(true);
    try {
      const result = await submitTest(answers, timedOut);
      if (!result.ok) {
        toast.error(result.error);
        setSubmitting(false);
        setConfirming(false);
        return;
      }
      localStorage.setItem("test-result", JSON.stringify(result));
      router.push("/results");
    } catch (e) {
      console.error(e);
      toast.error("Network error. Please try again.");
      setSubmitting(false);
      setConfirming(false);
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" && currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === "f" || e.key === "F") {
        toggleFlag(q.id);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, questions.length, q.id, setCurrentIndex, toggleFlag]);

  const isFlagged = flagged.includes(q.id);

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <h1 className="text-sm font-medium truncate">{testData.test.title}</h1>
          <div className="flex items-center gap-5">
            <Timer deadline={deadline} onExpire={() => handleSubmit(true)} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
        <aside className="md:w-[320px] md:flex-shrink-0">
          <Stimulus
            title={testData.test.stimulus.title}
            content={testData.test.stimulus.content}
          />
        </aside>

        <main className="flex-1 flex flex-col gap-5">
          <QuestionNav
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            flagged={flagged}
            seen={seen}
            onJump={setCurrentIndex}
          />

          <QuestionCard
            question={q}
            answer={answers[q.id]}
            onAnswer={(v) => setAnswer(q.id, v)}
            isFlagged={isFlagged}
            onToggleFlag={() => toggleFlag(q.id)}
          />

          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="text-sm text-[var(--muted)] hover:text-[var(--ink)] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <ArrowLeft size={14} /> Previous
            </button>

            {isLast ? (
              <button
                onClick={() => {
                  const missing = questions
                    .map((qq, idx) => ({ qq, idx }))
                    .filter(({ qq }) => {
                      const a = answers[qq.id];
                      return a === undefined || a === null || a === "";
                    });
                  if (missing.length > 0) {
                    const nums = missing.map((m) => m.idx + 1).join(", ");
                    toast.error(
                      `Please answer all questions. Missing: Q${nums}`
                    );
                    return;
                  }
                  setConfirming(true);
                }}
                className="text-sm bg-[var(--accent)] text-white px-4 py-1.5 rounded-md hover:opacity-90"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="text-sm bg-[var(--ink)] text-[var(--bg)] px-4 py-1.5 rounded-md hover:opacity-90 flex items-center gap-1.5"
              >
                Next <ArrowRight size={14} />
              </button>
            )}
          </div>

        </main>
      </div>

      {confirming && (
        <SubmitModal
          onConfirm={() => handleSubmit(false)}
          onCancel={() => setConfirming(false)}
          submitting={submitting}
        />
      )}
    </div>
  );
}
