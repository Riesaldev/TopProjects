import { useState } from 'react';
import type { ApiCompendium } from '@/types/api';
import ConfirmDialog from '@/components/common/ConfirmDialog';

const SYSTEM_COLORS: Record<string, string> = {
  'D&D 5e': 'text-red-400',
  'Pathfinder 2e': 'text-amber-400',
  'CoC 7e': 'text-green-400',
};

interface CompendiumCardProps {
  entry: ApiCompendium;
  onDelete?: (id: number) => Promise<boolean>;
}

export default function CompendiumCard({ entry, onDelete }: CompendiumCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const systemColor = SYSTEM_COLORS[entry.system] ?? 'text-primary';

  const handleDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    const ok = await onDelete(entry.id);
    if (!ok) setIsDeleting(false);
    setShowConfirm(false);
  };

  return (
    <>
      <div className="group relative bg-surface-dark rounded-xl overflow-hidden border border-border-dark hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5">
        {/* Cover / placeholder */}
        <div
          className="h-28 w-full bg-cover bg-center relative"
          style={entry.cover_url ? { backgroundImage: `url(${entry.cover_url})` } : { background: 'linear-gradient(135deg, #1a1625, #2a2836)' }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-surface-dark to-transparent" />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
            {entry.system}
          </div>
          {/* Delete action */}
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setShowConfirm(true)}
              className="p-1 bg-black/60 backdrop-blur-sm rounded text-text-muted hover:text-accent-red transition-colors"
              title="Remove from library"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
            </button>
          </div>
        </div>

        <div className="p-4 relative">
          {/* Icon */}
          <div className="absolute -top-9 left-4 w-14 h-14 rounded-lg border-4 border-surface-dark overflow-hidden bg-surface-dark-lighter shadow-lg flex items-center justify-center">
            {entry.cover_url ? (
              <img alt={entry.name} className="w-full h-full object-cover" src={entry.cover_url} />
            ) : (
              <span className={`material-symbols-outlined text-[32px] ${systemColor}`}>menu_book</span>
            )}
          </div>
          <div className="ml-16">
            <h4 className="font-bold text-text-primary leading-tight truncate">{entry.name}</h4>
            <span className={`text-xs font-medium ${systemColor}`}>{entry.system}</span>
          </div>
          {/* Meta */}
          <div className="mt-3 flex items-center gap-3 text-xs text-text-muted">
            {entry.author && (
              <span className="flex items-center gap-1 truncate">
                <span className="material-symbols-outlined text-[14px]">person</span>
                {entry.author}
              </span>
            )}
            {entry.pages && (
              <span className="flex items-center gap-1 ml-auto shrink-0">
                <span className="material-symbols-outlined text-[14px]">description</span>
                {entry.pages}p
              </span>
            )}
          </div>
          {/* Open PDF button */}
          {entry.file_url && (
            <a
              href={entry.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 w-full text-xs font-semibold text-primary hover:text-white hover:bg-primary border border-primary/40 hover:border-primary rounded-lg py-1.5 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              Open PDF
            </a>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Remove from Library"
        message={`Remove "${entry.name}" from your compendium? The file won't be deleted if stored externally.`}
        isDestructive
        isLoading={isDeleting}
      />
    </>
  );
}
