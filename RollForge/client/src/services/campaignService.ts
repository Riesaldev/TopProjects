import { api } from './api';
import type {
  ApiResponse,
  ApiCampaign,
  CreateCampaignRequest,
  UpdateCampaignRequest,
} from '@/types/api';

export const campaignService = {
  /**
   * Lista todas las campañas del usuario autenticado.
   */
  getAll: async (): Promise<ApiCampaign[]> => {
    const res = await api.get<ApiResponse<ApiCampaign[]>>('/api/campaigns');
    return res.data;
  },

  /**
   * Obtiene los detalles de una campaña por ID.
   */
  getById: async (id: number): Promise<ApiCampaign> => {
    const res = await api.get<ApiResponse<ApiCampaign>>(`/api/campaigns/${id}`);
    return res.data;
  },

  /**
   * Crea una nueva campaña.
   */
  create: async (data: CreateCampaignRequest): Promise<ApiCampaign> => {
    const res = await api.post<ApiResponse<ApiCampaign>>('/api/campaigns', data);
    return res.data;
  },

  /**
   * Actualiza los datos de una campaña existente.
   */
  update: async (id: number, data: UpdateCampaignRequest): Promise<ApiCampaign> => {
    const res = await api.patch<ApiResponse<ApiCampaign>>(`/api/campaigns/${id}`, data);
    return res.data;
  },

  /**
   * Elimina una campaña.
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/campaigns/${id}`);
  },

  /**
   * Sube una imagen de portada para una campaña.
   */
  uploadCover: async (id: number, file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('cover', file);
    const res = await api.upload<ApiResponse<{ url: string }>>(
      `/api/campaigns/${id}/cover`,
      formData,
    );
    return res.data;
  },
};
