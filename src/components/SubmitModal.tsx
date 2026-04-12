"use client";

export default function SubmitModal({
  onConfirm,
  onCancel,
  submitting,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  submitting: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-md max-w-sm w-full p-6 shadow-sm">
        <h3 className="font-semibold mb-2">Submit your answers?</h3>
        <p className="text-sm text-[var(--muted)] mb-5 leading-relaxed">
          You won&apos;t be able to change them after this.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="text-sm px-3 py-1.5 text-[var(--muted)] hover:text-[var(--ink)]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={submitting}
            className="text-sm bg-[var(--accent)] text-white px-4 py-1.5 rounded-md hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
