import { useMemo } from 'react';
import type { Compendium } from '@/types/profile';
import { COMPENDIUM_SYSTEMS } from '@/data/mockProfile';
import CompendiumCard from './CompendiumCard';

interface CompendiumVaultProps {
  compendium: Compendium[];
  selectedSystem: string;
  onSystemChange: (system: string) => void;
  onCompendiumSelect?: (compendium: Compendium) => void;
  onCreateNew?: () => void;
}

export default function CompendiumVault({
  compendium,
  selectedSystem,
  onSystemChange,
  onCompendiumSelect,
  onCreateNew,
}: CompendiumVaultProps) {
  const filteredCompendium = useMemo(() => {
    return selectedSystem === 'All Systems'
      ? compendium
      : compendium.filter(comp => comp.system === selectedSystem);
  }, [compendium, selectedSystem]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
            <span className="material-symbols-outlined">swords</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Compendium Vault</h3>
            <p className="text-sm text-text-muted">Manage your grimoire and arcane knowledge.</p>
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
              {COMPENDIUM_SYSTEMS.map((system) => (
                <option key={system} value={system}>
                  {system}
                </option>
              ))}
            </select>
          </div>
          {/* New Character Button */}
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-primary/20 cursor-pointer active:scale-95"
            onClick={onCreateNew}>
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="hidden sm:inline">New Compendium</span>
          </button>
        </div>
      </div>

      {/* Characters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompendium.map((pdf) => (
          <CompendiumCard
            key={pdf.id}
            compendium={pdf}
            onSelect={onCompendiumSelect}
          />
        ))}
      </div>
    </div>
  );
}