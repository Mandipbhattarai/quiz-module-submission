"use server";

import testData from "@/data/test";

function arraysEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export async function submitTest(
  answers: Record<string, any>,
  timedOut = false
) {
  const questions = testData.test.questions;

  if (!timedOut) {
    for (const q of questions) {
      if (!answers[q.id]) {
        return {
          ok: false as const,
          error: "Please answer all questions before submitting",
        };
      }
    }
  }

  const perQuestion = questions.map((q) => {
    const a = answers[q.id];

    if (q.type === "mcq" || q.type === "math_mcq") {
      return {
        id: q.id,
        correct: a === q.correctAnswer,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      };
    }

    if (q.type === "drag_and_drop") {
      return {
        id: q.id,
        correct: Array.isArray(a) && arraysEqual(a, q.correctOrder),
        correctOrder: q.correctOrder,
        explanation: q.explanation,
      };
    }

    return {
      id: q.id,
      correct: a === true,
      speakingSubmitted: a === true,
      explanation: q.explanation,
    };
  });

  const score = perQuestion.filter((r) => r.correct).length;

  return {
    ok: true as const,
    score,
    total: questions.length,
    perQuestion,
  };
}
