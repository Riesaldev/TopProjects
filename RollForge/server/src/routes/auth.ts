import { Router } from 'express';
import { login, register, recoverPassword, resetPassword, getMe } from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/recover-password', recoverPassword);
router.post('/reset-password', resetPassword);
router.get('/me', authenticate, getMe);

export default router;
