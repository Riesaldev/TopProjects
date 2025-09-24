import { Router } from 'express';
import { authUser } from '@/middlewares/index.ts';
import {
  createCampaign,
  deleteCampaign,
  getCampaign,
  listCampaigns,
  updateCampaign,
} from '@/controllers/campaigns/index.ts';

// Explicación (como junior):
// 1) Creamos un enrutador específico para las campañas.
// 2) Protegemos todas las rutas con authUser (hay que estar autenticado).
// 3) Definimos endpoints CRUD típicos.

export const campaignsRouter = Router();

// Paso 1: todas las rutas de campañas requieren estar autenticado
campaignsRouter.use(authUser);

// Paso 2: listamos campañas
campaignsRouter.get('/', listCampaigns);

// Paso 3: obtenemos una campaña concreta
campaignsRouter.get('/:id', getCampaign);

// Paso 4: creamos una campaña
campaignsRouter.post('/', createCampaign);

// Paso 5: actualizamos una campaña
campaignsRouter.put('/:id', updateCampaign);

// Paso 6: eliminamos una campaña
campaignsRouter.delete('/:id', deleteCampaign);

export default campaignsRouter;
