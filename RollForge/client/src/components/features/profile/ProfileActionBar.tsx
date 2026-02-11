interface ProfileActionBarProps {
  hasChanges: boolean;
  isSaving: boolean;
  error?: string;
  onSave: () => Promise<void>;
  onCancel: () => void;
}

export default function ProfileActionBar({
  hasChanges,
  isSaving,
  error,
  onSave,
  onCancel,
}: ProfileActionBarProps) {
  return (
    <div className="z-40">
      <div className="bg-surface-dark/80 backdrop-blur-md border border-border-dark p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <span className={`text-sm hidden sm:inline ${hasChanges
              ? 'text-accent-yellow'
              : 'text-text-muted'
            }`}>
            {hasChanges ? 'Cambios sin guardar.' : 'Sin cambios.'}
          </span>
          {error && (
            <p className="text-xs text-accent-red mt-1 sm:mt-0">{error}</p>
          )}
        </div>
        <div className="flex gap-3 ml-auto w-full sm:w-auto">
          <button
            onClick={onCancel}
            disabled={!hasChanges || isSaving}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-border-dark text-text-secondary font-medium text-sm hover:bg-surface-dark-lighter transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!hasChanges || isSaving}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSaving && (
              <span className="animate-spin">
                <span className="material-symbols-outlined text-[16px]">hourglass_bottom</span>
              </span>
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
