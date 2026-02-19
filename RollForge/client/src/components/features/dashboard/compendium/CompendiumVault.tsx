import { useMemo } from 'react';
import type { ApiCompendium } from '@/types/api';
import { SkeletonCard } from '@/components/common/Skeleton';
import EmptyState from '@/components/common/EmptyState';
import CompendiumCard from './CompendiumCard';

const COMPENDIUM_SYSTEMS = ['All Systems', 'D&D 5e', 'Pathfinder 2e', 'CoC 7e', 'Shadowrun', 'Blades in the Dark', 'Other'];

interface CompendiumVaultProps {
  compendium: ApiCompendium[];
  isLoading?: boolean;
  selectedSystem: string;
  onSystemChange: (system: string) => void;
  onDelete?: (id: number) => Promise<boolean>;
  onCreateNew?: () => void;
}

export default function CompendiumVault({
  compendium,
  isLoading = false,
  selectedSystem,
  onSystemChange,
  onDelete,
  onCreateNew,
}: CompendiumVaultProps) {
  const filtered = useMemo(() => {
    return selectedSystem === 'All Systems'
      ? compendium
      : compendium.filter(e => e.system === selectedSystem);
  }, [compendium, selectedSystem]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-500/20 rounded-lg text-violet-400">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Compendium Vault</h3>
            <p className="text-sm text-text-muted">{filtered.length} {filtered.length === 1 ? 'entry' : 'entries'} in your arcane library.</p>
          </div>
        </div>
        <div className="flex gap-2">
          {/* Filter Dropdown */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-text-muted">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
            </span>
            <select
              className="pl-8 pr-8 py-2 bg-surface-dark text-text-primary text-sm rounded-lg border border-border-dark focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
              value={selectedSystem}
              onChange={(e) => onSystemChange(e.target.value)}
            >
              {COMPENDIUM_SYSTEMS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <button
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-primary/20 cursor-pointer active:scale-95"
            onClick={onCreateNew}
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="hidden sm:inline">Add Entry</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="auto_stories"
          title="Your library is empty"
          description="Add rulebooks, supplements, and homebrew PDFs to your compendium."
          action={{ label: 'Add Entry', onClick: onCreateNew ?? (() => {}) }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((entry) => (
            <CompendiumCard
              key={entry.id}
              entry={entry}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}