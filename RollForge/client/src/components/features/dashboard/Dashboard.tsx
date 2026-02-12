import { useState } from 'react';

import CampainVault from '../campains/CampainVault';
import CharacterVault from '@/components/features/characters/CharacterVault';
import { mockUserData } from '@/data/mockProfile';
import { useProfileForm } from '@/hooks/useProfileForm';

export default function Dashboard() {
  const [selectedClass, setSelectedClass] = useState<string>('All Classes');
  const [selectedSystem, setSelectedSystem] = useState<string>('All Systems');

  const {
    editedData,
  } = useProfileForm(mockUserData);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-5xl mx-auto flex flex-col gap-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Welcome back, Traveler</h2>
                <p className="text-slate-500 text-base md:text-lg">Ready to weave your next epic tale?</p>
              </div>
              <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-primary/25 transition-all active:scale-95">
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span>Create Campaign</span>
              </button>
            </div>

            {/* Campaigns Vault Section */}
            <section className="pb-4">
              <CampainVault
                campaigns={editedData.campaign}
                selectedSystem={selectedSystem}
                onSystemChange={setSelectedSystem}
                onCampaignSelect={(campaign) => console.log('Selected campaign:', campaign)}
                onCampaignLaunch={(campaign) => console.log('Launch campaign:', campaign)}
                onCreateNew={() => console.log('Create new campaign')}
              />
            </section>

            {/* Character Vault Section */}
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