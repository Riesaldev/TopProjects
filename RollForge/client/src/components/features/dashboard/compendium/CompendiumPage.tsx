import { useState } from 'react';
import CompendiumVault from './CompendiumVault';
import { useCompendium } from '@/hooks/useCompendium';

export default function CompendiumPage() {
  const [selectedSystem, setSelectedSystem] = useState<string>('All Systems');
  const { compendium, isLoading, addEntry, deleteEntry } = useCompendium();

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary mb-1">
              Arcane Library
            </h2>
            <p className="text-text-muted text-base">
              Your collection of rulebooks, supplements, and homebrew PDFs.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-text-muted shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-primary">menu_book</span>
              <span className="font-semibold text-text-primary">{compendium.length}</span> entries
            </span>
          </div>
        </div>

        {/* Compendium Vault */}
        <section className="pb-10">
          <CompendiumVault
            compendium={compendium}
            isLoading={isLoading}
            selectedSystem={selectedSystem}
            onSystemChange={setSelectedSystem}
            onDelete={deleteEntry}
            onCreateNew={() => {
              // TODO: replace with a proper modal/form
              const name = window.prompt('Entry name?');
              if (name) addEntry({ name, system: selectedSystem === 'All Systems' ? 'D&D 5e' : selectedSystem });
            }}
          />
        </section>
      </div>
    </div>
  );
}
