import express from 'express';
import userLogin from '../../controllers/users/loginUserController.js';
import joiValidation from '../../middlewares/joiValidatorMiddleware.js';
import loginUserSchema from '../../schemas/loginUserSchema.js';

const router = express.Router();
router.post('/login',
    joiValidation(loginUserSchema),
    userLogin);

export default router;