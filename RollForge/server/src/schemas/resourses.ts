import { z } from 'zod';

// common
export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export const createResourceSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.enum(['image', 'audio', 'pdf', 'other']).default('image'),
  url: z.string().url(),
  campaign_id: z.coerce.number().int().positive(),
  is_public: z.coerce.boolean().optional(),
});

export const updateResourceSchema = z
  .object({
    name: z.string().min(2).max(100).optional(),
    type: z.enum(['image', 'audio', 'pdf', 'other']).optional(),
    url: z.string().url().optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: 'Debe enviar al menos un campo' });

export type CreateResourceInput = z.infer<typeof createResourceSchema>;
export type UpdateResourceInput = z.infer<typeof updateResourceSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;
