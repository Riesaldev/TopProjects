import { Router } from 'express';
import {
  getCharacters,
  createCharacter,
  getCharacter,
  updateCharacter,
  deleteCharacter,
} from '../controllers/characterController.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/', getCharacters);
router.post('/', createCharacter);
router.get('/:id', getCharacter);
router.patch('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);

export default router;
