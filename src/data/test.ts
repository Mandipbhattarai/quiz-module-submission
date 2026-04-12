import { TestData } from "@/types/schema";

const testData: TestData = {
  test: {
    id: "frontend-skills-101",
    title: "Frontend Engineer Assessment",
    durationInMinutes: 25,
    stimulus: {
      title: "Case Study: Rebuilding a Test Platform",
      content:
        "EduScale is migrating its legacy test platform to a modern stack. The platform must support multiple question types, retain user progress across refreshes, and handle media-based questions like speaking assessments. The engineering team has flagged three recurring issues: users losing answers on accidental refresh, poor mobile layout for reading-heavy questions, and no graceful fallback when microphone access is denied. Your task is to design and build a test interface that addresses these problems cleanly.",
    },
    questions: [
      {
        id: "q1",
        type: "math_mcq",
        question:
          "A developer optimises an API call from O(n²) to O(n log n). If the original call took 800ms for n = 100, approximately how long will it take after optimisation (assume linear scaling of the constant factor)?",
        formula: "\\( T(n) = c \\cdot n \\log_2 n \\)",
        options: ["~56ms", "~112ms", "~200ms", "~400ms"],
        correctAnswer: "~56ms",
        explanation:
          "O(n²) for n=100 is 10,000 operations. O(n log₂ n) for n=100 is ~664 operations. 800ms × (664/10000) ≈ 53ms, closest to 56ms.",
      },
      {
        id: "q2",
        type: "mcq",
        question:
          "In React 18, which of the following best describes the purpose of `useTransition`?",
        options: [
          "To debounce state updates by a fixed delay",
          "To mark a state update as non-urgent so the UI stays responsive",
          "To batch multiple setState calls into one re-render",
          "To defer rendering until the next animation frame",
        ],
        correctAnswer:
          "To mark a state update as non-urgent so the UI stays responsive",
        explanation:
          "`useTransition` lets you mark updates as transitions - React deprioritises them so urgent updates (like typing) are not blocked.",
      },
      {
        id: "q3",
        type: "mcq",
        question:
          "You need to fetch user data in a Next.js App Router page that is server-rendered. The data changes every 60 seconds. Which is the most appropriate approach?",
        options: [
          "Use `useEffect` with `fetch` inside a Client Component",
          "Use `fetch` with `{ cache: 'no-store' }` in a Server Component",
          "Use `fetch` with `{ next: { revalidate: 60 } }` in a Server Component",
          "Use `getServerSideProps` with a 60s revalidation interval",
        ],
        correctAnswer:
          "Use `fetch` with `{ next: { revalidate: 60 } }` in a Server Component",
        explanation:
          "In the App Router, `{ next: { revalidate: 60 } }` enables ISR-style caching at the fetch level. `getServerSideProps` is Pages Router only.",
      },
      {
        id: "q4",
        type: "mcq",
        question:
          "According to the case study, which of the following is NOT listed as a recurring platform issue?",
        options: [
          "Users losing answers on accidental refresh",
          "Poor mobile layout for reading-heavy questions",
          "Slow API response times on the results page",
          "No graceful fallback when microphone access is denied",
        ],
        correctAnswer: "Slow API response times on the results page",
        explanation:
          "The case study lists three issues: progress loss on refresh, poor mobile layout, and missing mic-denial fallback. API response times are not mentioned.",
      },
      {
        id: "q5",
        type: "drag_and_drop",
        question:
          "Order these steps to correctly implement local persistence for a test application:",
        items: [
          "Restore state from localStorage on mount",
          "Serialize current state to JSON",
          "Listen for answer or navigation changes",
          "Write serialized state to localStorage",
          "Handle missing or corrupted localStorage data gracefully",
        ],
        correctOrder: [
          "Handle missing or corrupted localStorage data gracefully",
          "Restore state from localStorage on mount",
          "Listen for answer or navigation changes",
          "Serialize current state to JSON",
          "Write serialized state to localStorage",
        ],
        explanation:
          "Always guard against bad data first, restore on mount, then set up change listeners that serialize and persist on each update.",
      },
      {
        id: "q6",
        type: "speaking",
        question:
          "Describe how you would architect the local persistence layer for this test platform - what you'd store, when you'd write, and how you'd handle edge cases.",
        ttsPrompt:
          "Describe how you would architect the local persistence layer for this test platform. Cover what data you would store in localStorage, when and how often you would write to it, and how you would handle edge cases like corrupted data, storage quota errors, or a user opening the test in two tabs simultaneously.",
        explanation:
          "We're looking for structured thinking: scoping stored data, debouncing writes, try/catch around storage calls, and awareness of multi-tab conflicts.",
      },
    ],
  },
};

export default testData;
