import { useMemo } from 'react';
import type { Character } from '@/types/profile';
import { CHARACTER_CLASSES } from '@/data/mockProfile';
import CharacterCard from './CharacterCard';

interface CharacterVaultProps {
  characters: Character[];
  selectedClass: string;
  onClassChange: (className: string) => void;
  onCharacterSelect?: (character: Character) => void;
}

export default function CharacterVault({
  characters,
  selectedClass,
  onClassChange,
  onCharacterSelect,
}: CharacterVaultProps) {
  const filteredCharacters = useMemo(() => {
    return selectedClass === 'All Classes'
      ? characters
      : characters.filter(char => char.class === selectedClass);
  }, [characters, selectedClass]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
            <span className="material-symbols-outlined">swords</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Character Vault</h3>
            <p className="text-sm text-text-muted">Manage your heroes across all realms.</p>
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
              value={selectedClass}
              onChange={(e) => onClassChange(e.target.value)}
            >
              {CHARACTER_CLASSES.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>
          {/* New Character Button */}
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="hidden sm:inline">New Character</span>
          </button>
        </div>
      </div>

      {/* Characters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onSelect={onCharacterSelect}
          />
        ))}

        {/* Create New Placeholder */}
        <div className="group relative flex flex-col items-center justify-center bg-surface-dark-lighter rounded-xl border-2 border-dashed border-border-dark-heavy hover:border-primary hover:bg-primary/5 transition-all cursor-pointer h-full min-h-56">
          <div className="size-14 rounded-full bg-border-dark group-hover:bg-primary text-text-muted group-hover:text-white flex items-center justify-center transition-colors mb-3">
            <span className="material-symbols-outlined text-3xl">add</span>
          </div>
          <span className="text-sm font-bold text-text-secondary group-hover:text-primary transition-colors">
            Create New Character
          </span>
          <span className="text-xs text-text-muted mt-1">Start from scratch or import</span>
        </div>
      </div>
    </div>
  );
}
