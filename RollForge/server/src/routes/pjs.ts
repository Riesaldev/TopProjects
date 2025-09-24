import { Router } from 'express';
import { authUser } from '@/middlewares/index.ts';
import {
  createCharacter,
  deleteCharacter,
  getCharacter,
  listCharacters,
  updateCharacter,
} from '@/controllers/characters/index.ts';

export const pjsRouter = Router();

// Todas las rutas de PJs requieren estar autenticado
pjsRouter.use(authUser);

pjsRouter.get('/', listCharacters);
pjsRouter.get('/:id', getCharacter);
pjsRouter.post('/', createCharacter);
pjsRouter.put('/:id', updateCharacter);
pjsRouter.delete('/:id', deleteCharacter);

export default pjsRouter;
