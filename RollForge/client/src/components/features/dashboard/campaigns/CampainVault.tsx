import { useMemo } from 'react';
import type { Campaign } from '@/types/profile';
import { CAMPAIGN_SYSTEMS } from '@/data/mockProfile';
import CampainCard from './CampainCard';

interface CampainVaultProps {
  campaigns: Campaign[];
  selectedSystem: string;
  onSystemChange: (system: string) => void;
  onCampaignSelect?: (campaign: Campaign) => void;
  onCampaignLaunch?: (campaign: Campaign) => void;
  onCreateNew?: () => void;
}

export default function CampainVault({
  campaigns,
  selectedSystem,
  onSystemChange,
  onCampaignSelect,
  onCampaignLaunch,
  onCreateNew,
}: CampainVaultProps) {
  const filteredCampaigns = useMemo(() => {
    return selectedSystem === 'All Systems'
      ? campaigns
      : campaigns.filter(campaign => campaign.system === selectedSystem);
  }, [campaigns, selectedSystem]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg text-primary">
            <span className="material-symbols-outlined">swords</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Campaign Vault</h3>
            <p className="text-sm text-text-muted">Manage your worlds</p>
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
              {CAMPAIGN_SYSTEMS.map((system) => (
                <option key={system} value={system}>
                  {system}
                </option>
              ))}
            </select>
          </div>
          {/* New Campaign Button */}
          <button
            onClick={onCreateNew}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="hidden sm:inline">New Campaign</span>
          </button>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <CampainCard
            key={campaign.id}
            campaign={campaign}
            onSelect={onCampaignSelect}
            onLaunch={onCampaignLaunch}
          />
        ))}

        {/* Create New Placeholder */}
        <button
          onClick={onCreateNew}
          className="group flex flex-col items-center justify-center h-full min-h-62.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-transparent hover:border-primary hover:bg-primary/5 transition-all duration-300"
        >
          <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-surface-dark group-hover:bg-primary group-hover:text-white flex items-center justify-center text-slate-400 dark:text-slate-500 transition-colors mb-3">
            <span className="material-symbols-outlined">add</span>
          </div>
          <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-primary">
            Create New Campaign
          </span>
        </button>
      </div>
    </div>
  );
}