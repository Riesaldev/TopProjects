import { useState } from 'react';
import CharacterVault from './CharacterVault';
import { mockUserData } from '@/data/mockProfile';
import { useProfileForm } from '@/hooks/useProfileForm';

export default function CharactersPage() {
  const [selectedClass, setSelectedClass] = useState<string>('All Classes');
  const { editedData } = useProfileForm(mockUserData);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-5xl mx-auto flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                  Your Characters
                </h2>
                <p className="text-slate-500 text-base md:text-lg">
                  Manage and create your heroes
                </p>
              </div>
              <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-primary/25 transition-all active:scale-95">
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span>Create Character</span>
              </button>
            </div>

            {/* Character Vault */}
            <section className="pb-10">
              <CharacterVault
                characters={editedData.characters}
                selectedClass={selectedClass}
                onClassChange={setSelectedClass}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}