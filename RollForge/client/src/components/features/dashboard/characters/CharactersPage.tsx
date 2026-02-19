import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterVault from './CharacterVault';
import { useCharacters } from '@/hooks/useCharacters';

export default function CharactersPage() {
  const [selectedClass, setSelectedClass] = useState<string>('All Classes');
  const navigate = useNavigate();
  const { characters, isLoading, deleteCharacter } = useCharacters();

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary mb-1">
              Your Characters
            </h2>
            <p className="text-text-muted text-base">
              Manage and create your heroes across all realms.
            </p>
          </div>
          {/* Quick stats */}
          <div className="flex items-center gap-4 text-sm text-text-muted shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-primary">person</span>
              <span className="font-semibold text-text-primary">{characters.length}</span> characters
            </span>
          </div>
        </div>

        {/* Character Vault */}
        <section className="pb-10">
          <CharacterVault
            characters={characters}
            isLoading={isLoading}
            selectedClass={selectedClass}
            onClassChange={setSelectedClass}
            onDelete={deleteCharacter}
            onCreateNew={() => navigate('/characters/new')}
          />
        </section>
      </div>
    </div>
  );
}