import { useEffect, useState } from 'react';
import { useToast, type Toast, type ToastVariant } from '@/context/ToastContext';

// ─── Individual Toast ─────────────────────────────────────────────────────────

const variantConfig: Record<
  ToastVariant,
  { icon: string; classes: string }
> = {
  success: {
    icon: 'check_circle',
    classes: 'bg-accent-green/10 border-accent-green/30 text-accent-green',
  },
  error: {
    icon: 'error',
    classes: 'bg-accent-red/10 border-accent-red/30 text-accent-red',
  },
  warning: {
    icon: 'warning',
    classes: 'bg-accent-yellow/10 border-accent-yellow/30 text-accent-yellow',
  },
  info: {
    icon: 'info',
    classes: 'bg-primary/10 border-primary/30 text-primary',
  },
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);
  const config = variantConfig[toast.variant];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3
        border rounded-xl shadow-lg backdrop-blur-md
        transition-all duration-300
        ${config.classes}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}
      role="alert"
    >
      <span className="material-symbols-outlined text-xl shrink-0">{config.icon}</span>
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button
        onClick={onDismiss}
        className="ml-2 opacity-70 hover:opacity-100 transition-opacity shrink-0"
        aria-label="Cerrar notificación"
      >
        <span className="material-symbols-outlined text-base">close</span>
      </button>
    </div>
  );
}

// ─── Container ────────────────────────────────────────────────────────────────

export default function ToastContainer() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-100 flex flex-col gap-2 w-80 max-w-[calc(100vw-3rem)]"
      aria-live="assertive"
      aria-atomic="false"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
      ))}
    </div>
  );
}
