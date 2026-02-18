import { useState } from 'react';

import CampaignVault from './CampaignVault';
import { mockUserData } from '@/data/mockProfile';
import { useProfileForm } from '@/hooks/useProfileForm';

export default function CampaignsPage() {
  const [selectedSystem, setSelectedSystem] = useState<string>('All Systems');
  const { editedData } = useProfileForm(mockUserData);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-5xl mx-auto flex flex-col gap-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                  Welcome back, Traveler
                </h2>
                <p className="text-slate-500 text-base md:text-lg">
                  Ready to weave your next epic tale?
                </p>
              </div>
            </div>

            {/* Campaigns Vault Section */}
            <section className="pb-4">
              <CampaignVault
                campaigns={editedData.campaign}
                selectedSystem={selectedSystem}
                onSystemChange={setSelectedSystem}
                onCampaignSelect={(campaign) => console.log('Selected campaign:', campaign)}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
