import express from 'express'
import passwordRecovery from '../../controllers/users/sendRecoveryPassCodeController.js'
import joiValidation from '../../middlewares/joiValidatorMiddleware.js'
import passwordRecoverySchema from '../../schemas/passwordRecoverySchema.js'

const router = express.Router()

router.post(
    '/password-recovery',
    joiValidation(passwordRecoverySchema),
    passwordRecovery
)

export default router
