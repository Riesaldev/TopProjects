import express from 'express';
import userRegister from '../../controllers/users/registerUserController.js';
import joiValidate from '../../middlewares/joiValidatorMiddleware.js';
import registerUserSchema from '../../schemas/registerUserSchema.js';

const router = express.Router();

router.post('/register',
    joiValidate(registerUserSchema),
    userRegister);

export default router;