import { Router } from 'express';
import { authUser } from '@/middlewares/index.ts';
import {
  createCampaign,
  deleteCampaign,
  getCampaign,
  listCampaigns,
  updateCampaign,
} from '@/controllers/campaigns/index.ts';

export const campainsRouter = Router();

// Todas las rutas de campañas requieren estar autenticado
campainsRouter.use(authUser);

campainsRouter.get('/', listCampaigns);
campainsRouter.get('/:id', getCampaign);
campainsRouter.post('/', createCampaign);
campainsRouter.put('/:id', updateCampaign);
campainsRouter.delete('/:id', deleteCampaign);

export default campainsRouter;
