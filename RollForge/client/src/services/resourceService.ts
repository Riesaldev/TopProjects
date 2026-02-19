import { api } from './api';
import type { ApiResponse, ApiResource, ResourceType } from '@/types/api';

export const resourceService = {
  /**
   * Lista los recursos de una campaña, opcionalmente filtrados por tipo.
   */
  getByCampaign: async (campaignId: number, type?: ResourceType): Promise<ApiResource[]> => {
    const query = type ? `?type=${type}` : '';
    const res = await api.get<ApiResponse<ApiResource[]>>(
      `/api/resources?campaign_id=${campaignId}${query}`,
    );
    return res.data;
  },

  /**
   * Sube un recurso (imagen, audio, PDF) a una campaña.
   */
  upload: async (campaignId: number, file: File, name?: string): Promise<ApiResource> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('campaign_id', String(campaignId));
    if (name) formData.append('name', name);
    const res = await api.upload<ApiResponse<ApiResource>>('/api/resources', formData);
    return res.data;
  },

  /**
   * Elimina un recurso por ID.
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/resources/${id}`);
  },
};
