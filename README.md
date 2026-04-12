# Quiz Assignment

My submission for the frontend take-home, a small test-taking app built with Next.js, TypeScript and Tailwind.

## Run

```bash
bun install
bun dev
```

Then open http://localhost:3000.

## Approach

- I kept all session state (answers, current index, timer deadline, flagged and seen ids) inside one `useTestState` hook.
- I read from localStorage on mount and write back on every change, so a refresh never loses progress.
- I used a stored deadline timestamp for the timer instead of a countdown, for the same reason.
- I split each question type into its own component under `src/components/questions/`.
- I rendered MCQ and math MCQ as styled radio buttons, with math using `react-katex`.
- I used `@dnd-kit` for the drag-and-drop question.
- I built the speaking question with `SpeechSynthesis` for the prompt and `MediaRecorder` for recording, plus a fallback link when mic access is denied.
- I used a Next.js Server Action (`submitTest` in `src/app/actions.ts`) for submission, it validates and scores the answers, and I get end-to-end types without writing a fetch call.
- I kept the upload endpoint (`/api/upload`) as a Route Handler since it handles a raw audio blob.
- I send `timedOut: true` from the client when the timer expires, so the user still reaches results even if the test is incomplete.
