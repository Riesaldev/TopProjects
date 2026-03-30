import updateUserModel from '../../models/users/updateUserModel.js'
import bcrypt from 'bcryptjs'
import generateErrorUtil from '../../utils/generateErrorUtil.js'
import prisma from '../../prisma/prismaClient.js'

const updateUserPassController = async (req, res, next) => {
    try {
        const { token } = req.query
        const { newPassword } = req.body
        if (!token || !newPassword) {
            throw generateErrorUtil('Token and new password are required', 400)
        }
        // Buscar usuario por token de recuperación
        const user = await prisma.user.findFirst({
            where: { recoveryPassCode: token },
        })
        if (
            !user ||
            !user.recoveryPassCodeExpires ||
            user.recoveryPassCodeExpires < new Date()
        ) {
            throw generateErrorUtil('Invalid or expired token', 400)
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await updateUserModel(user.id, {
            password: hashedPassword,
            recoveryPassCode: null,
            recoveryPassCodeExpires: null,
        })
        res.json({ message: 'Password updated successfully.' })
    } catch (error) {
        next(error)
    }
}

export default updateUserPassController
