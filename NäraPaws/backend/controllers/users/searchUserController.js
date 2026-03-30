// Controlador para búsqueda flexible de usuarios
import db from '../../config/database.js' // Ajusta según tu estructura real

const searchUserController = async (req, res) => {
    try {
        const { id, email, name } = req.query
        let user
        if (id) {
            user = await db.user.findUnique({ where: { id } })
        } else if (email) {
            user = await db.user.findUnique({ where: { email } })
        } else if (name) {
            user = await db.user.findFirst({ where: { name } })
        } else {
            return res
                .status(400)
                .json({ error: 'No search parameter provided' })
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            details: error.message,
        })
    }
}

export default searchUserController
