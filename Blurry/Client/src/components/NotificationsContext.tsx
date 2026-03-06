"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface Toast {
  id: number;
  msg: string;
  type: "info" | "success" | "error" | "warning";
}

export type ToastType = Toast["type"];
export type FeedbackOutcome = "success" | "partial" | "error";

interface NotificationsContextType {
  showToast: (msg: string, type?: ToastType) => void;
  showSuccess: (msg: string) => void;
  showError: (msg: string) => void;
  showInfo: (msg: string) => void;
  showWarning: (msg: string) => void;
  showOperationFeedback: (action: string, outcome: FeedbackOutcome, detail?: string) => void;
  unread: number;
  markAllRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | null>(null);

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
}

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [unread, setUnread] = useState<number>(0);

  const showToast = useCallback((msg: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setUnread(u => u + 1);
    setTimeout(() => setToasts(t => t.filter(toast => toast.id !== id)), 3500);
  }, []);

  const showSuccess = useCallback((msg: string) => showToast(msg, "success"), [showToast]);
  const showError = useCallback((msg: string) => showToast(msg, "error"), [showToast]);
  const showInfo = useCallback((msg: string) => showToast(msg, "info"), [showToast]);
  const showWarning = useCallback((msg: string) => showToast(msg, "warning"), [showToast]);

  const showOperationFeedback = useCallback((action: string, outcome: FeedbackOutcome, detail?: string) => {
    const safeAction = action.trim();
    const safeDetail = detail?.trim();

    if (outcome === "success") {
      showSuccess(safeDetail ? `${safeAction} completada: ${safeDetail}` : `${safeAction} completada correctamente.`);
      return;
    }

    if (outcome === "partial") {
      showWarning(safeDetail ? `${safeAction} completada con observaciones: ${safeDetail}` : `${safeAction} completada con observaciones.`);
      return;
    }

    showError(safeDetail ? `${safeAction} fallida: ${safeDetail}` : `${safeAction} fallida.`);
  }, [showError, showSuccess, showWarning]);

  const markAllRead = useCallback(() => setUnread(0), []);

  const contextValue = useMemo(
    () => ({
      showToast,
      showSuccess,
      showError,
      showInfo,
      showWarning,
      showOperationFeedback,
      unread,
      markAllRead,
    }),
    [showToast, showSuccess, showError, showInfo, showWarning, showOperationFeedback, unread, markAllRead],
  );

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
      {/* Toasts en el centro superior */}
      <div
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map(t => (
          <div
            key={t.id}
            role={t.type === "error" ? "alert" : "status"}
            className={`px-6 py-3 rounded shadow-lg font-semibold text-white ${t.type === "success" ? "bg-green-600" : t.type === "error" ? "bg-red-600" : t.type === "warning" ? "bg-amber-600" : "bg-blue-600"} animate-fade-in-out`}
          >
            {String(t.msg)}
          </div>
        ))}
      </div>
    </NotificationsContext.Provider>
  );
}