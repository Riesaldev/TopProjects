import express from 'express'
import useRecoveryPassController from '../../controllers/users/useRecoveryPassCodeController.js'
import joiValidation from '../../middlewares/joiValidatorMiddleware.js'
import useRecoveryPassSchema from '../../schemas/useRecoveryPassSchema.js'

const router = express.Router()

router.post(
    '/use-recovery-pass',
    joiValidation(useRecoveryPassSchema),
    useRecoveryPassController
)

export default router
