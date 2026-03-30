import generateErrorUtil from '../../utils/generateErrorUtil.js'
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js'
import updateUserModel from '../../models/users/updateUserModel.js'
import emailService from '../../services/emailService.js'
import crypto from 'crypto'

const sendRecoveryPassCodeService = async (req, res, next) => {
    try {
        const { email } = req.body
        if (!email) {
            throw generateErrorUtil('Email is required', 400)
        }

        const user = await selectUserByEmailModel(email)
        if (!user || !user.is_active) {
            throw generateErrorUtil('User not found', 404)
        }
        const hashedCode = await crypto.randomBytes(20).toString('hex')
        await updateUserModel(user.id, {
            recoveryPassCode: hashedCode,
            recoveryPassCodeExpires: new Date(Date.now() + 3600000), // 1 hour
        })

        await emailService.sendRecoveryCode(email, hashedCode)

        res.json({ message: 'Recovery code sent successfully.' })
    } catch (error) {
        next(error)
    }
}

export default sendRecoveryPassCodeService
