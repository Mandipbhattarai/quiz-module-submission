"use client";

import { useRef, useState } from "react";
import { Play, Circle, Square } from "lucide-react";
import { toast } from "sonner";
import { ISpeaking } from "@/types/schema";

export default function Speaking({
  question,
  uploaded,
  onUploaded,
}: {
  question: ISpeaking;
  uploaded: boolean;
  onUploaded: () => void;
}) {
  const [state, setState] = useState<"idle" | "recording" | "stopped">("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  function playPrompt() {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(question.ttsPrompt));
  }

  async function start() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunks.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };
      rec.onstop = async () => {
        const blob = new Blob(chunks.current, {
          type: "audio/webm",
        });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
        setUploading(true);
        try {
          const fd = new FormData();
          fd.append("file", blob, "answer.webm");
          const res = await fetch("/api/upload", { method: "POST", body: fd });
          const json = await res.json();
          if (json.success) {
            onUploaded();
            toast.success("Recording saved");
          } else {
            toast.error("Upload failed. Please retry.");
          }
        } catch (err) {
          console.error(err);
          toast.error("Upload failed. Please retry.");
        }
        setUploading(false);
      };
      recorder.current = rec;
      rec.start();
      setState("recording");
    } catch (e) {
      console.error(e);
      setError("Can't access the microphone. Check your browser permissions or skip this question.");
    }
  }

  function stop() {
    recorder.current?.stop();
    setState("stopped");
  }

  function retry() {
    setAudioUrl(null);
    setState("idle");
    setError(null);
  }

  const statusDot =
    state === "recording"
      ? "bg-red-500 animate-pulse"
      : state === "stopped"
        ? "bg-[var(--accent)]"
        : "bg-[var(--line)]";

  return (
    <div className="flex flex-col gap-4">
      <blockquote className="border-l-2 border-[var(--line)] pl-4 text-sm text-[var(--muted)] italic">
        {question.ttsPrompt}
      </blockquote>

      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={playPrompt}
          className="text-sm border border-[var(--line)] px-3 py-1.5 rounded-md hover:border-[var(--muted)] flex items-center gap-1.5"
        >
          <Play size={12} fill="currentColor" /> Play prompt
        </button>

        {state === "idle" && !error && (
          <button
            onClick={start}
            className="text-sm bg-[var(--accent)] text-white px-3 py-1.5 rounded-md hover:opacity-90 flex items-center gap-1.5"
          >
            <Circle size={10} fill="currentColor" /> Record
          </button>
        )}
        {state === "recording" && (
          <button
            onClick={stop}
            className="text-sm bg-red-600 text-white px-3 py-1.5 rounded-md flex items-center gap-1.5"
          >
            <Square size={10} fill="currentColor" /> Stop
          </button>
        )}
        {state === "stopped" && (
          <button
            onClick={retry}
            className="text-sm border border-[var(--line)] px-3 py-1.5 rounded-md hover:border-[var(--muted)]"
          >
            Retry
          </button>
        )}

        <div className="flex items-center gap-2 text-xs text-[var(--muted)] ml-auto">
          <span className={`w-2 h-2 rounded-full ${statusDot}`} />
          <span>
            {state}
            {uploading && " · uploading"}
            {uploaded && !uploading && " · saved"}
          </span>
        </div>
      </div>

      {audioUrl && <audio src={audioUrl} controls className="w-full" />}

      {error && (
        <div className="border border-amber-300 bg-amber-50 dark:bg-amber-900/20 rounded-md p-3 text-sm">
          <div>{error}</div>
          <button onClick={onUploaded} className="mt-2 text-[var(--accent)] underline text-xs">
            Skip this question
          </button>
        </div>
      )}
    </div>
  );
}
