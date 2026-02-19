interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  icon = 'inbox',
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-3xl text-text-muted">{icon}</span>
      </div>
      <h3 className="text-lg font-bold text-text-primary mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-text-muted max-w-xs leading-relaxed mb-6">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-primary/20"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
