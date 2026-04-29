import { Router } from 'express'
import close from '../controllers/closeOrderController.js'
import open from '../controllers/openOrderController.js'
import getUserStats from '../controllers/statsController.js'
import Trade from '../models/Trade.js'
import User from '../models/User.js'

const router: Router = Router()

// 1. Ruta para abrir una posición (LONG/SHORT)
router.post('/open', open)

// 2. Ruta para cerrar una posición manualmente
router.post('/close', close)

// 3. Ruta para obtener el estado actual del usuario (Balance, XP, Rango)
router.get('/user/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener perfil' })
    }
})

// 4. Ruta para obtener estadísticas del usuario
router.get('/stats/:userId', getUserStats)

// 5. Ruta para el historial de trades (Para tu sección de mejora)
router.get('/history/:userId', async (req, res) => {
    try {
        // 6ta Ley: Debugging de consulta de historial
        console.log(
            `[API]: Cargando historial para usuario ${req.params.userId}`
        )
        const history = await Trade.find({
            userId: req.params.userId,
            status: 'closed',
        }).sort({ exitTimestamp: -1 })
        res.json(history)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener historial' })
    }
})

// 5. Ruta para ver posiciones abiertas actualmente
router.get('/active/:userId', async (req, res) => {
    try {
        const activeTrades = await Trade.find({
            userId: req.params.userId,
            status: 'open',
        })
        res.json(activeTrades)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener posiciones activas' })
    }
})

export default router
