import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ApiCampaign } from '@/types/api';
import { CAMPAIGN_SYSTEMS } from '@/data/mockProfile';
import CampaignCard from './CampaignCard';
import EmptyState from '@/components/common/EmptyState';
import { SkeletonCard } from '@/components/common/Skeleton';

interface CampaignVaultProps {
  campaigns: ApiCampaign[];
  isLoading: boolean;
  selectedSystem: string;
  onSystemChange: (system: string) => void;
  onDelete: (id: number) => Promise<boolean>;
}

export default function CampaignVault({
  campaigns,
  isLoading,
  selectedSystem,
  onSystemChange,
  onDelete,
}: CampaignVaultProps) {
  const navigate = useNavigate();

  const filtered = useMemo(
    () =>
      selectedSystem === 'All Systems'
        ? campaigns
        : campaigns.filter((c) => c.system === selectedSystem),
    [campaigns, selectedSystem],
  );

  return (
    <div className="flex flex-col">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg text-primary">
            <span className="material-symbols-outlined">swords</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Campaign Vault</h3>
            <p className="text-sm text-text-muted">
              {campaigns.length} {campaigns.length === 1 ? 'mundo' : 'mundos'} disponibles
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-text-muted pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
            </span>
            <select
              className="pl-8 pr-8 py-2 bg-surface-dark text-text-primary text-sm rounded-lg border border-border-dark focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
              value={selectedSystem}
              onChange={(e) => onSystemChange(e.target.value)}
            >
              {CAMPAIGN_SYSTEMS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => navigate('/campaigns/new')}
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-primary/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="hidden sm:inline">New Adventure</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="explore"
          title={selectedSystem === 'All Systems' ? 'Aún no tienes campañas' : `Sin campañas de ${selectedSystem}`}
          description="Crea tu primera aventura y empieza a forjar leyendas."
          action={selectedSystem === 'All Systems' ? { label: 'Nueva campaña', onClick: () => navigate('/campaigns/new') } : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}