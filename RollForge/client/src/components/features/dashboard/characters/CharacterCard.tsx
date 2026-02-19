import { useState } from 'react';
import type { ApiCharacter } from '@/types/api';
import ConfirmDialog from '@/components/common/ConfirmDialog';

interface CharacterCardProps {
  character: ApiCharacter;
  onDelete?: (id: number) => Promise<boolean>;
}

export default function CharacterCard({ character, onDelete }: CharacterCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    const ok = await onDelete(character.id);
    if (!ok) setIsDeleting(false);
    setShowConfirm(false);
  };

  return (
    <>
      <div className="group relative bg-surface-dark rounded-xl overflow-hidden border border-border-dark hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5">
        {/* Background banner */}
        <div
          className="h-28 w-full bg-cover bg-center relative"
          style={character.background_image ? { backgroundImage: `url(${character.background_image})` } : { background: 'linear-gradient(135deg, #1a1625, #2a2836)' }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-surface-dark to-transparent" />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
            {character.system} <span className="text-text-muted"> · </span> Lv {character.level}
          </div>
          {/* Action buttons */}
          <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setShowConfirm(true)}
              className="p-1 bg-black/60 backdrop-blur-sm rounded text-text-muted hover:text-accent-red transition-colors"
              title="Delete character"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
            </button>
          </div>
        </div>

        {/* Portrait + info */}
        <div className="p-4 relative">
          <div className="absolute -top-9 left-4 w-14 h-14 rounded-lg border-4 border-surface-dark overflow-hidden bg-surface-dark-lighter shadow-lg">
            {character.image_url ? (
              <img alt={character.name} className="w-full h-full object-cover" src={character.image_url} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary font-bold text-lg">
                {character.name[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <div className="ml-16">
            <h4 className="font-bold text-text-primary leading-tight truncate">{character.name}</h4>
            <span className="text-xs text-text-muted">{character.race} {character.class}</span>
          </div>
          {/* Quick stats */}
          <div className="mt-3 flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-green-400">
              <span className="material-symbols-outlined text-[14px]">favorite</span>
              {character.hp}/{character.max_hp}
            </span>
            <span className="flex items-center gap-1 text-blue-400">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              AC {character.ac}
            </span>
            <span className="flex items-center gap-1 text-text-muted ml-auto">
              <span className="font-medium text-text-secondary">{character.main_stat}</span> {character.main_stat_value}
            </span>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Character"
        message={`Are you sure you want to permanently delete "${character.name}"? This action cannot be undone.`}
        isDestructive
        isLoading={isDeleting}
      />
    </>
  );
}
