"use client";

import { useEffect, useRef, useState } from "react";

export default function Timer({
  deadline,
  onExpire,
}: {
  deadline: number | null;
  onExpire: () => void;
}) {
  const [now, setNow] = useState<number | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = deadline && now ? deadline - now : 0;

  useEffect(() => {
    if (now && deadline && remaining <= 0 && !fired.current) {
      fired.current = true;
      onExpire();
    }
  }, [remaining, deadline, now, onExpire]);

  if (!now || !deadline) {
    return <div className="font-mono text-sm text-[var(--muted)]">--:--</div>;
  }

  const secs = Math.max(0, Math.floor(remaining / 1000));
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  const low = remaining < 60000;

  return (
    <div className={`font-mono text-sm ${low ? "text-red-600" : "text-[var(--ink)]"}`}>
      {m}:{s}
    </div>
  );
}
