"use client";

import { useEffect, useState } from "react";
import testData from "@/data/test";

const KEY = "test-session";

function initialState() {
  if (typeof window === "undefined") {
    return { answers: {}, currentIndex: 0, deadline: null as number | null, flagged: [] as string[], seen: [] as string[] };
  }
  const raw = localStorage.getItem(KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      return { flagged: [], seen: [], ...parsed };
    } catch (e) {
      console.error(e);
    }
  }
  return {
    answers: {},
    currentIndex: 0,
    deadline: Date.now() + testData.test.durationInMinutes * 60 * 1000,
    flagged: [],
    seen: [],
  };
}

export function useTestState() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  function setAnswer(id: string, value: any) {
    setState((s: any) => ({ ...s, answers: { ...s.answers, [id]: value } }));
  }

  function setCurrentIndex(i: number) {
    setState((s: any) => {
      const leavingId = testData.test.questions[s.currentIndex]?.id;
      const seen =
        leavingId && i !== s.currentIndex && !s.seen.includes(leavingId)
          ? [...s.seen, leavingId]
          : s.seen;
      return { ...s, currentIndex: i, seen };
    });
  }

  function toggleFlag(id: string) {
    setState((s: any) => ({
      ...s,
      flagged: s.flagged.includes(id)
        ? s.flagged.filter((x: string) => x !== id)
        : [...s.flagged, id],
    }));
  }

  return {
    answers: state.answers,
    currentIndex: state.currentIndex,
    deadline: state.deadline,
    flagged: state.flagged as string[],
    seen: state.seen as string[],
    setAnswer,
    setCurrentIndex,
    toggleFlag,
  };
}
