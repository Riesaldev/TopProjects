import { Router } from 'express';
import multer from 'multer';
import { getResources, uploadResource, deleteResource } from '../controllers/resourceController.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();
const upload = multer({ dest: 'uploads/resources/' });

router.use(authenticate);

router.get('/', getResources);
router.post('/', upload.single('file'), uploadResource);
router.delete('/:id', deleteResource);

export default router;
