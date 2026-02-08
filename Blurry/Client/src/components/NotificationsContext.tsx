"use client";
import { createContext, useContext, useState } from "react";

interface Toast {
  id: number;
  msg: string;
  type: "info" | "success" | "error";
}

interface NotificationsContextType {
  showToast: (msg: string, type?: "info" | "success" | "error") => void;
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

  const showToast = (msg: string, type: "info"|"success"|"error" = "info") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setUnread(u => u + 1);
    setTimeout(() => setToasts(t => t.filter(toast => toast.id !== id)), 3500);
  };
  const markAllRead = () => setUnread(0);

  return (
    <NotificationsContext.Provider value={{ showToast, unread, markAllRead }}>
      {children}
      {/* Toasts en el centro superior */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        {toasts.map(t => (
          <div key={t.id} className={`px-6 py-3 rounded shadow-lg font-semibold text-white ${t.type === "success" ? "bg-green-600" : t.type === "error" ? "bg-red-600" : "bg-blue-600"} animate-fade-in-out`}>
            {String(t.msg)}
          </div>
        ))}
      </div>
    </NotificationsContext.Provider>
  );
}