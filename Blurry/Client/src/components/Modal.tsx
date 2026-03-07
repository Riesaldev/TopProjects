
import { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  theme?: "light" | "dark";
};

export default function Modal({ open, onClose, title, children, theme = "light" }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const titleId = title ? "modal-title" : undefined;
  const isDark = theme === "dark";

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isDark ? "bg-black/70" : "bg-black bg-opacity-40"}`}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative min-w-[300px] max-w-lg rounded-2xl p-6 shadow-2xl ${
          isDark
            ? "border border-zinc-800 bg-zinc-950 text-zinc-100"
            : "bg-white text-zinc-900"
        }`}
      >
        {title && <h2 id={titleId} className={`mb-4 text-lg font-bold ${isDark ? "text-white" : "text-zinc-900"}`}>{title}</h2>}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className={`absolute right-2 top-2 rounded-md px-2 py-1 text-lg leading-none ${
            isDark
              ? "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
              : "text-gray-400 hover:text-gray-700"
          }`}
          aria-label="Cerrar"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
} 