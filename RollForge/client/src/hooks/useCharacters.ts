/**
 * Hook para gestionar personajes con loading, error y CRUD local-first.
 */

import { useCallback, useEffect, useState } from 'react';
import type { ApiCharacter, CreateCharacterRequest, UpdateCharacterRequest } from '@/types/api';
import { ApiError } from '@/services/api';
import { useToast } from '@/context/ToastContext';

// ─── Mock data ───────────────────────────────────────────────────────────────
import { mockUserData } from '@/data/mockProfile';

function mapMockToCharacters(): ApiCharacter[] {
  return mockUserData.characters.map((c) => ({
    id: Number(c.id),
    name: c.name,
    image_url: c.portraitImage ?? null,
    user_id: 1,
    campaign_id: null,
    system: c.system,
    class: c.class,
    race: c.race,
    level: c.level,
    hp: c.hp,
    max_hp: c.hp,
    ac: c.ac,
    main_stat: c.mainStat,
    main_stat_value: c.mainStatValue,
    background_image: c.backgroundImage ?? null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}
// ─────────────────────────────────────────────────────────────────────────────

export function useCharacters(campaignId?: number) {
  const { toast } = useToast();
  const [characters, setCharacters] = useState<ApiCharacter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: const data = await characterService.getAll(campaignId);
      await new Promise((r) => setTimeout(r, 400));
      const all = mapMockToCharacters();
      setCharacters(
        campaignId ? all.filter((c) => c.campaign_id === campaignId) : all,
      );
    } catch (err) {
      const msg =
        err instanceof ApiError ? err.message : 'Error al cargar personajes';
      setError(msg);
      toast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [campaignId, toast]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const createCharacter = useCallback(
    async (data: CreateCharacterRequest): Promise<ApiCharacter | null> => {
      try {
        // TODO: const created = await characterService.create(data);
        const created: ApiCharacter = {
          id: Date.now(),
          name: data.name,
          image_url: data.image_url ?? null,
          user_id: 1,
          campaign_id: data.campaign_id ?? null,
          system: data.system,
          class: data.class,
          race: data.race,
          level: data.level ?? 1,
          hp: data.hp ?? 10,
          max_hp: data.max_hp ?? 10,
          ac: data.ac ?? 10,
          main_stat: data.main_stat ?? 'STR',
          main_stat_value: data.main_stat_value ?? 10,
          background_image: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setCharacters((prev) => [created, ...prev]);
        toast('Personaje creado con éxito', 'success');
        return created;
      } catch (err) {
        const msg =
          err instanceof ApiError ? err.message : 'Error al crear el personaje';
        toast(msg, 'error');
        return null;
      }
    },
    [toast],
  );

  const updateCharacter = useCallback(
    async (id: number, data: UpdateCharacterRequest): Promise<boolean> => {
      try {
        // TODO: await characterService.update(id, data);
        setCharacters((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, ...data, updated_at: new Date().toISOString() } : c,
          ),
        );
        toast('Personaje actualizado', 'success');
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

  const deleteCharacter = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        // TODO: await characterService.delete(id);
        setCharacters((prev) => prev.filter((c) => c.id !== id));
        toast('Personaje eliminado', 'info');
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
    characters,
    isLoading,
    error,
    refetch: fetchCharacters,
    createCharacter,
    updateCharacter,
    deleteCharacter,
  };
}
