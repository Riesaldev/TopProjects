import { Router } from 'express';
import { authUser } from '@/middlewares/index.ts';
import {
  createResource,
  deleteResource,
  getResource,
  listResources,
  updateResource,
} from '@/controllers/resourses/index.ts';

export const resoursesRouter = Router();

// Todas las rutas de recursos requieren estar autenticado
resoursesRouter.use(authUser);

resoursesRouter.get('/', listResources);
resoursesRouter.get('/:id', getResource);
resoursesRouter.post('/', createResource);
resoursesRouter.put('/:id', updateResource);
resoursesRouter.delete('/:id', deleteResource);

export default resoursesRouter;
