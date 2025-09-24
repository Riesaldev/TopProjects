import { z } from 'zod';

// Parámetro de ruta común: id numérico positivo
export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export const createTokenSchema = z.object({
  name: z.string().min(2).max(100),
  image_url: z.union([z.string().url(), z.literal('')]).nullable().optional(),
  character_id: z.coerce.number().int().positive(),
});

export const updateTokenSchema = z
  .object({
    name: z.string().min(2).max(100).optional(),
    image_url: z.union([z.string().url(), z.literal('')]).nullable().optional(),
    character_id: z.coerce.number().int().positive().nullable().optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: 'Debe enviar al menos un campo' });

export type CreateTokenInput = z.infer<typeof createTokenSchema>;
export type UpdateTokenInput = z.infer<typeof updateTokenSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;

// Listar tokens: filtro opcional por character_id
export const listTokensQuerySchema = z.object({
  character_id: z.coerce.number().int().positive().optional(),
  campaign_id: z.coerce.number().int().positive().optional(),
  user_id: z.coerce.number().int().positive().optional(),
});
