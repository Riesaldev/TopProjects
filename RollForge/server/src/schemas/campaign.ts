import { z } from 'zod';

// common
export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export const createCampaignSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(500).nullable().optional(),
  gm_id: z.coerce.number().int().positive(),
});

export const updateCampaignSchema = z
  .object({
    name: z.string().min(3).max(100).optional(),
    description: z.string().max(500).nullable().optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: 'Debe enviar al menos un campo' });

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;
