import { api } from './api';
import type {
  ApiResponse,
  ApiCharacter,
  CreateCharacterRequest,
  UpdateCharacterRequest,
} from '@/types/api';

export const characterService = {
  /**
   * Lista todos los personajes del usuario autenticado.
   * Opcional: filtrar por campaña.
   */
  getAll: async (campaignId?: number): Promise<ApiCharacter[]> => {
    const query = campaignId ? `?campaign_id=${campaignId}` : '';
    const res = await api.get<ApiResponse<ApiCharacter[]>>(`/api/characters${query}`);
    return res.data;
  },

  /**
   * Obtiene un personaje por ID.
   */
  getById: async (id: number): Promise<ApiCharacter> => {
    const res = await api.get<ApiResponse<ApiCharacter>>(`/api/characters/${id}`);
    return res.data;
  },

  /**
   * Crea un nuevo personaje.
   */
  create: async (data: CreateCharacterRequest): Promise<ApiCharacter> => {
    const res = await api.post<ApiResponse<ApiCharacter>>('/api/characters', data);
    return res.data;
  },

  /**
   * Actualiza un personaje existente.
   */
  update: async (id: number, data: UpdateCharacterRequest): Promise<ApiCharacter> => {
    const res = await api.patch<ApiResponse<ApiCharacter>>(`/api/characters/${id}`, data);
    return res.data;
  },

  /**
   * Elimina un personaje.
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/characters/${id}`);
  },

  /**
   * Sube una imagen de avatar para un personaje.
   */
  uploadAvatar: async (id: number, file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);
    const res = await api.upload<ApiResponse<{ url: string }>>(
      `/api/characters/${id}/avatar`,
      formData,
    );
    return res.data;
  },
};
