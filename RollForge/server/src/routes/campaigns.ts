import { Router } from 'express';
import multer from 'multer';
import {
  getCampaigns,
  createCampaign,
  getCampaign,
  updateCampaign,
  deleteCampaign,
} from '../controllers/campaignController.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();
const upload = multer({ dest: 'uploads/covers/' });

router.use(authenticate);

router.get('/', getCampaigns);
router.post('/', createCampaign);
router.get('/:id', getCampaign);
router.patch('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);
// TODO: router.post('/:id/cover', upload.single('cover'), uploadCover);

export { upload };
export default router;
