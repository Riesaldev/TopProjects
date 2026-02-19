/**
 * Hook para gestionar campañas con loading, error y CRUD local-first.
 * Mientras el server no esté disponible, opera sobre mockData.
 * Cuando el server esté listo solo hay que descomentar las llamadas a campaignService.
 */

import { useCallback, useEffect, useState } from 'react';
import type { ApiCampaign, CreateCampaignRequest, UpdateCampaignRequest } from '@/types/api';
import { ApiError } from '@/services/api';
import { useToast } from '@/context/ToastContext';

// ─── Mock data (se sustituirá por el servidor) ────────────────────────────────
import { mockUserData } from '@/data/mockProfile';

function mapMockToCampaigns(): ApiCampaign[] {
  return mockUserData.campaign.map((c) => ({
    id: Number(c.id),
    name: c.name,
    description: c.description ?? '',
    system: c.system,
    cover_image: c.backgroundImage ?? null,
    gm_id: 1,
    gm_username: mockUserData.displayName,
    player_count: c.players.length,
    players: c.players.map((p, j) => ({
      user_id: j + 1,
      username: p.name,
      avatar: p.avatar ?? null,
      status: 'offline' as const,
    })),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}
// ─────────────────────────────────────────────────────────────────────────────

export function useCampaigns() {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<ApiCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: descomentar cuando el server esté disponible
      // const data = await campaignService.getAll();
      // setCampaigns(data);
      await new Promise((r) => setTimeout(r, 400)); // simular latencia
      setCampaigns(mapMockToCampaigns());
    } catch (err) {
      const msg =
        err instanceof ApiError ? err.message : 'Error al cargar campañas';
      setError(msg);
      toast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const createCampaign = useCallback(
    async (data: CreateCampaignRequest): Promise<ApiCampaign | null> => {
      try {
        // TODO: const created = await campaignService.create(data);
        const created: ApiCampaign = {
          id: Date.now(),
          name: data.name,
          description: data.description ?? '',
          system: data.system,
          cover_image: data.cover_image ?? null,
          gm_id: 1,
          gm_username: mockUserData.displayName,
          player_count: 0,
          players: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setCampaigns((prev) => [created, ...prev]);
        toast('Campaña creada con éxito', 'success');
        return created;
      } catch (err) {
        const msg =
          err instanceof ApiError ? err.message : 'Error al crear la campaña';
        toast(msg, 'error');
        return null;
      }
    },
    [toast],
  );

  const updateCampaign = useCallback(
    async (id: number, data: UpdateCampaignRequest): Promise<boolean> => {
      try {
        // TODO: const updated = await campaignService.update(id, data);
        setCampaigns((prev) =>
          prev.map((c) =>
            c.id === id
              ? { ...c, ...data, updated_at: new Date().toISOString() }
              : c,
          ),
        );
        toast('Campaña actualizada', 'success');
        return true;
      } catch (err) {
        const msg =
          err instanceof ApiError ? err.message : 'Error al actualizar';
        toast(msg, 'error');
        return false;
      }
    },
    [toast],
  );

  const deleteCampaign = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        // TODO: await campaignService.delete(id);
        setCampaigns((prev) => prev.filter((c) => c.id !== id));
        toast('Campaña eliminada', 'info');
        return true;
      } catch (err) {
        const msg =
          err instanceof ApiError ? err.message : 'Error al eliminar';
        toast(msg, 'error');
        return false;
      }
    },
    [toast],
  );

  return {
    campaigns,
    isLoading,
    error,
    refetch: fetchCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
  };
}
