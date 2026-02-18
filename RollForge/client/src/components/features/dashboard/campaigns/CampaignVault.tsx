import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Campaign } from '@/types/profile';
import { CAMPAIGN_SYSTEMS } from '@/data/mockProfile';
import CampaignCard from './CampaignCard';

interface CampaignVaultProps {
  campaigns: Campaign[];
  selectedSystem: string;
  onSystemChange: (system: string) => void;
  onCampaignSelect?: (campaign: Campaign) => void;
}

export default function CampaignVault({
  campaigns,
  selectedSystem,
  onSystemChange,
  onCampaignSelect,
}: CampaignVaultProps) {
  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate('/dashboard/campaigns/new');
  };
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
            type='button'
            title="Create New Campaign"
            onClick={handleCreateNew}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-primary/20 cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="hidden sm:inline">New Adventure</span>
          </button>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onSelect={onCampaignSelect}
          />
        ))}
      </div>
    </div>
  );
}