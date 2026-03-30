import express from 'express';
import searchUserController from '../../controllers/users/searchUserController.js';
import joiValidation from '../../middlewares/joiValidatorMiddleware.js';
import searchUserSchema from '../../schemas/searchUserSchema.js';

const router = express.Router();

router.get('/search', joiValidation(searchUserSchema), searchUserController);

export default router;