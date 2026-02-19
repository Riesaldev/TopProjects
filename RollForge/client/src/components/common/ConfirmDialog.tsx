import Modal from './Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmar',
  isDestructive = false,
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-sm text-text-secondary mb-6">{message}</p>
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="px-4 py-2 rounded-xl border border-border-dark text-text-muted hover:text-text-primary text-sm font-medium transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className={`
            px-4 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center gap-2
            ${isDestructive
              ? 'bg-accent-red/10 border border-accent-red/30 text-accent-red hover:bg-accent-red hover:text-white'
              : 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20'
            }
          `}
        >
          {isLoading && (
            <span className="material-symbols-outlined animate-spin text-base">
              progress_activity
            </span>
          )}
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
