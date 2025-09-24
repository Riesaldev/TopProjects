import { Router } from 'express';
import { authUser } from '@/middlewares/index.ts';
import {
  createResource,
  deleteResource,
  getResource,
  listResources,
  updateResource,
} from '@/controllers/resourses/index.ts';

// Explicación (como junior): igual que campaigns pero para recursos

export const resourcesRouter = Router();

resourcesRouter.use(authUser);

resourcesRouter.get('/', listResources);
resourcesRouter.get('/:id', getResource);
resourcesRouter.post('/', createResource);
resourcesRouter.put('/:id', updateResource);
resourcesRouter.delete('/:id', deleteResource);

export default resourcesRouter;
