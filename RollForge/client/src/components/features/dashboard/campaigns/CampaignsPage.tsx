import { useState } from 'react';
import { useCampaigns } from '@/hooks/useCampaigns';
import CampaignVault from './CampaignVault';
import { mockUserData } from '@/data/mockProfile';
import { authService } from '@/services/authService';

export default function CampaignsPage() {
  const [selectedSystem, setSelectedSystem] = useState('All Systems');
  const { campaigns, isLoading, deleteCampaign } = useCampaigns();
  const user = authService.getCurrentUser();
  const displayName = user?.username ?? mockUserData.displayName;

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Welcome */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary mb-2">
              Welcome back, {displayName}
            </h2>
            <p className="text-text-muted text-base md:text-lg">
              Ready to weave your next epic tale?
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <div className="text-center">
              <p className="text-2xl font-black text-primary">{campaigns.length}</p>
              <p className="text-xs text-text-muted uppercase tracking-wide">Campañas</p>
            </div>
            <div className="w-px bg-border-dark" />
            <div className="text-center">
              <p className="text-2xl font-black text-text-primary">{mockUserData.hoursPlayed}</p>
              <p className="text-xs text-text-muted uppercase tracking-wide">Jugadas</p>
            </div>
          </div>
        </div>

        <section className="pb-4">
          <CampaignVault
            campaigns={campaigns}
            isLoading={isLoading}
            selectedSystem={selectedSystem}
            onSystemChange={setSelectedSystem}
            onDelete={deleteCampaign}
          />
        </section>
      </div>
    </div>
  );
}
