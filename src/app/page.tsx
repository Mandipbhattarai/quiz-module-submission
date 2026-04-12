import Link from "next/link";
import testData from "@/data/test";

export default function Home() {
  const { title, durationInMinutes, questions } = testData.test;

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full border border-gray-200 dark:border-gray-800 rounded-lg p-8">
        <h1 className="text-4xl font-semibold mb-3">{title}</h1>
        <p className="text-[var(--muted)] mb-8 leading-relaxed">
          {questions.length} questions. {durationInMinutes} minutes. Your
          progress is saved automatically if you refresh.
        </p>
        <Link
          href="/test"
          className="inline-block bg-[var(--accent)] text-white px-5 py-2.5 rounded-md hover:opacity-90"
        >
          Begin test
        </Link>
      </div>
    </main>
  );
}
