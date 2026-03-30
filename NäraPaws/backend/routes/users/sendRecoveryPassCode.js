import express from 'express'
import sendRecoveryPassCodeController from '../../controllers/users/sendRecoveryPassCodeController.js'

const router = express.Router()

router.post('/send-recovery-pass-code', sendRecoveryPassCodeController)

export default router
