import { useMemo } from 'react';
import type { ApiCharacter } from '@/types/api';
import { SkeletonCard } from '@/components/common/Skeleton';
import EmptyState from '@/components/common/EmptyState';
import CharacterCard from './CharacterCard';

const CHARACTER_CLASSES = ['All Classes', 'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];

interface CharacterVaultProps {
  characters: ApiCharacter[];
  isLoading?: boolean;
  selectedClass: string;
  onClassChange: (className: string) => void;
  onDelete?: (id: number) => Promise<boolean>;
  onCreateNew?: () => void;
}

export default function CharacterVault({
  characters,
  isLoading = false,
  selectedClass,
  onClassChange,
  onDelete,
  onCreateNew,
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
          <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-primary/20 cursor-pointer active:scale-95"
            onClick={onCreateNew}>
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="hidden sm:inline">New Character</span>
          </button>
        </div>
      </div>

      {/* Characters Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filteredCharacters.length === 0 ? (
        <EmptyState
          icon="person_search"
          title="No characters yet"
          description="Create your first hero and start your legend."
          action={{ label: 'Create Character', onClick: onCreateNew ?? (() => {}) }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCharacters.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
