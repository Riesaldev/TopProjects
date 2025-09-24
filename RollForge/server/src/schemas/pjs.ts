import { z } from 'zod';

// common
export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export const createCharacterSchema = z.object({
  name: z.string().min(2).max(100),
  image_url: z.union([z.string().url(), z.literal('')]).nullable().optional(),
  user_id: z.coerce.number().int().positive(),
  campaign_id: z.coerce.number().int().positive(),
});

export const updateCharacterSchema = z
  .object({
    name: z.string().min(2).max(100).optional(),
    image_url: z.union([z.string().url(), z.literal('')]).nullable().optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: 'Debe enviar al menos un campo' });

export type CreateCharacterInput = z.infer<typeof createCharacterSchema>;
export type UpdateCharacterInput = z.infer<typeof updateCharacterSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;
