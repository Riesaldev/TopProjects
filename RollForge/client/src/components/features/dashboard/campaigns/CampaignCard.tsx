import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ApiCampaign } from '@/types/api';
import ConfirmDialog from '@/components/common/ConfirmDialog';

interface CampaignCardProps {
  campaign: ApiCampaign;
  onDelete: (id: number) => Promise<boolean>;
}

export default function CampaignCard({ campaign, onDelete }: CampaignCardProps) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const visiblePlayers = campaign.players.slice(0, 3);
  const remaining = campaign.players.length - 3;

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(campaign.id);
    setIsDeleting(false);
    setShowConfirm(false);
  };

  return (
    <>
      <article
        className="group relative flex flex-col bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-border-dark hover:border-primary/50 cursor-pointer"
        onClick={() => navigate(`/campaigns/resources/${campaign.id}`)}
      >
        {/* Cover */}
        <div
          className="h-40 w-full bg-cover bg-center relative"
          style={{
            backgroundImage: campaign.cover_image
              ? `url('${campaign.cover_image}')`
              : 'linear-gradient(135deg, #1a1825 0%, #2a2836 100%)',
          }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
          <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-xs font-bold text-white px-2 py-1 rounded border border-white/10">
            {campaign.system}
          </span>
          <div
            className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => navigate(`/campaigns/${campaign.id}/edit`)}
              className="p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white hover:bg-primary transition-colors"
              title="Editar"
            >
              <span className="material-symbols-outlined text-base">edit</span>
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white hover:bg-accent-red transition-colors"
              title="Eliminar"
            >
              <span className="material-symbols-outlined text-base">delete</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col flex-1">
          <h4 className="text-base font-bold text-text-primary mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {campaign.name}
          </h4>
          <p className="text-sm text-text-muted mb-4 line-clamp-2 leading-relaxed">
            {campaign.description || 'Sin descripción.'}
          </p>
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-border-dark">
            <div className="flex -space-x-2">
              {visiblePlayers.map((p) =>
                p.avatar ? (
                  <img key={p.user_id} src={p.avatar} alt={p.username} className="h-6 w-6 rounded-full ring-2 ring-surface-dark object-cover" />
                ) : (
                  <div key={p.user_id} className="h-6 w-6 rounded-full ring-2 ring-surface-dark bg-surface-hover flex items-center justify-center text-[10px] font-bold text-text-muted" title={p.username}>
                    {p.username.charAt(0).toUpperCase()}
                  </div>
                ),
              )}
              {remaining > 0 && (
                <div className="h-6 w-6 rounded-full ring-2 ring-surface-dark bg-surface-hover flex items-center justify-center text-[10px] font-bold text-text-muted">+{remaining}</div>
              )}
            </div>
            <span className="text-xs text-text-muted flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">group</span>
              {campaign.player_count}
            </span>
          </div>
        </div>
      </article>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Eliminar campaña"
        message={`¿Seguro que quieres eliminar "${campaign.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        isDestructive
        isLoading={isDeleting}
      />
    </>
  );
}