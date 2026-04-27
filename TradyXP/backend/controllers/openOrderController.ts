import user from '../models/User.js'
import trade from '../models/Trade.js'
import type { Request, Response } from 'express'

export default async function openOrderController(req: Request, res: Response) {
    try {
        const { userId, stockSymbol, status, amount, entryPrice } = req.body

        const trader = await user.findById(userId)

        console.log(
            `[OpenOrderController]: Buscando usuario ${userId}. ¿Existe? ${!!trader}`
        )

        if (!trader) {
            return res.status(404).json({ message: 'User not found' })
        }

        if (trader.balance < amount) {
            console.log(
                `[OpenOrderController Error]: Fondos insuficientes para ${trader.username}. Saldo: ${trader.balance}, Requerido: ${amount}`
            )
            return res
                .status(400)
                .json({ message: 'Fondos insuficientes para esta operación' })
        }

        const newTrade = await trade.create({
            userId,
            stockSymbol,
            status: status || 'open', // Por defecto debería ser 'open' al entrar
            amount,
            entryPrice,
        })

        console.log(
            `[OpenOrderController Success]: Trade creado exitosamente para ${trader.username}. ID: ${newTrade._id}`
        )

        res.status(201).json(newTrade)
    } catch (error) {
        console.error(`[OrderController Error]:`, error)
        res.status(500).json({ message: 'Error creating trade', error })
    }
}
