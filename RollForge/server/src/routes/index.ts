import { Router } from 'express';
import authRouter from './auth.js';
import campaignRouter from './campaigns.js';
import characterRouter from './characters.js';
import resourceRouter from './resources.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/campaigns', campaignRouter);
router.use('/characters', characterRouter);
router.use('/resources', resourceRouter);

export default router;
