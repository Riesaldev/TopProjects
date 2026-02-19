import { useState, useEffect, useCallback } from 'react';
import type { ApiCompendium, CreateCompendiumRequest } from '@/types/api';
import { useToast } from '@/context/ToastContext';

// ─── Mock data ────────────────────────────────────────────────────────────────
function mockCompendiumData(): ApiCompendium[] {
  return [
    {
      id: 1, name: "Dungeon Master's Guide", system: "D&D 5e",
      description: "A comprehensive guide for Dungeon Masters.", cover_url: null,
      file_url: null, author: "Wizards of the Coast", pages: 320,
      user_id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
      id: 2, name: "Monster Manual", system: "D&D 5e",
      description: "A bestiary of monsters for D&D 5e.", cover_url: null,
      file_url: null, author: "Wizards of the Coast", pages: 352,
      user_id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
      id: 3, name: "Player's Handbook", system: "D&D 5e",
      description: "Everything players need to create and play characters.", cover_url: null,
      file_url: null, author: "Wizards of the Coast", pages: 316,
      user_id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
      id: 4, name: "Pathfinder Core Rulebook", system: "Pathfinder 2e",
      description: "The complete rulebook for Pathfinder Second Edition.", cover_url: null,
      file_url: null, author: "Paizo", pages: 638,
      user_id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
      id: 5, name: "Call of Cthulhu Rulebook", system: "CoC 7e",
      description: "Horror roleplaying in the worlds of H.P. Lovecraft.", cover_url: null,
      file_url: null, author: "Chaosium", pages: 446,
      user_id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
  ];
}

interface UseCompendiumReturn {
  compendium: ApiCompendium[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addEntry: (data: CreateCompendiumRequest, file?: File) => Promise<ApiCompendium | null>;
  deleteEntry: (id: number) => Promise<boolean>;
}

export function useCompendium(): UseCompendiumReturn {
  const [compendium, setCompendium] = useState<ApiCompendium[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCompendium = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: replace with const data = await compendiumService.getAll();
      await new Promise((r) => setTimeout(r, 400));
      setCompendium(mockCompendiumData());
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load compendium';
      setError(msg);
      toast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCompendium();
  }, [fetchCompendium]);

  const addEntry = useCallback(async (data: CreateCompendiumRequest, _file?: File): Promise<ApiCompendium | null> => {
    try {
      // TODO: const created = await compendiumService.create(data); if (_file) await compendiumService.uploadFile(created.id, _file);
      const created: ApiCompendium = {
        ...data,
        id: Date.now(),
        description: data.description ?? null,
        cover_url: null,
        file_url: null,
        author: data.author ?? null,
        pages: null,
        user_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setCompendium((prev) => [created, ...prev]);
      toast('Entry added to compendium!', 'success');
      return created;
    } catch {
      toast('Failed to add entry', 'error');
      return null;
    }
  }, [toast]);

  const deleteEntry = useCallback(async (id: number): Promise<boolean> => {
    try {
      // TODO: await compendiumService.delete(id);
      setCompendium((prev) => prev.filter((e) => e.id !== id));
      toast('Entry removed from compendium', 'success');
      return true;
    } catch {
      toast('Failed to delete entry', 'error');
      return false;
    }
  }, [toast]);

  return { compendium, isLoading, error, refetch: fetchCompendium, addEntry, deleteEntry };
}
