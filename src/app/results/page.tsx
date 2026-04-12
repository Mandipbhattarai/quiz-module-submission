"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import testData from "@/data/test";
import ResultItem from "@/components/ResultItem";
import { IResult } from "@/types/schema";



export default function ResultsPage() {
  const [result, setResult] = useState<IResult | null>(null);
  const [flagged, setFlagged] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("test-result");
    if (raw) setResult(JSON.parse(raw));
    const session = localStorage.getItem("test-session");
    if (session) {
      try {
        const parsed = JSON.parse(session);
        setFlagged(parsed.flagged || []);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-[var(--muted)]">No results found.</p>
        <Link href="/test" className="text-sm bg-[var(--accent)] text-white px-4 py-2 rounded-md">
          Take the test
        </Link>
      </div>
    );
  }

  const questions = testData.test.questions;
  const pct = Math.round((result.score / result.total) * 100);

  function retake() {
    localStorage.removeItem("test-result");
    localStorage.removeItem("test-session");
    window.location.href = "/test";
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-2">
          {result.score} of {result.total} correct
        </h1>
        <p className="text-[var(--muted)] mb-10">
          You scored {pct}%. Review your answers below.
        </p>

        <div className="flex flex-col gap-3">
          {result.perQuestion.map((r, i) => (
            <ResultItem
              key={r.id}
              index={i}
              question={questions.find((x) => x.id === r.id)}
              result={r}
              isFlagged={flagged.includes(r.id)}
            />
          ))}
        </div>

        <div className="mt-10 flex gap-4 items-center">
          <button
            onClick={retake}
            className="text-sm bg-[var(--accent)] text-white px-4 py-2 rounded-md hover:opacity-90"
          >
            Retake test
          </button>
          <Link href="/" className="text-sm text-[var(--muted)] hover:text-[var(--ink)]">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
