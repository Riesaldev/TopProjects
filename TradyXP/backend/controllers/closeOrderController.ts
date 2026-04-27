import user from '../models/User.js'
import trade from '../models/Trade.js'
import type { Request, Response } from 'express'

export default async function closeOrderController(
    req: Request,
    res: Response
) {
    try {
        const { tradeId, exitPrice } = req.body

        const existingTrade = await trade.findById(tradeId)

        if (!existingTrade) {
            console.error(`[CloseOrderError]: Trade ${tradeId} no encontrado.`)
            return res.status(404).json({ message: 'Trade not found' })
        }

        if (existingTrade.status !== 'open') {
            console.warn(
                `[CloseOrderWarning]: Intento de cerrar trade ya cerrado: ${tradeId}`
            )
            return res.status(400).json({ message: 'Trade is already closed' })
        }

        const trader = await user.findById(existingTrade.userId)

        if (!trader) {
            console.error(
                `[CloseOrderError]: Usuario ${existingTrade.userId} no encontrado.`
            )
            return res.status(404).json({ message: 'User not found' })
        }

        let profitLoss = 0
        if (existingTrade.type === 'long') {
            profitLoss =
                (exitPrice - existingTrade.entryPrice) * existingTrade.amount
        } else {
            profitLoss =
                (existingTrade.entryPrice - exitPrice) * existingTrade.amount
        }

        console.log(`[CloseOrder]: Calculando cierre para ${trader.username}`)
        console.log(
            `[CloseOrder]: Tipo: ${existingTrade.type.toUpperCase()} | Entrada: ${existingTrade.entryPrice} | Salida: ${exitPrice}`
        )
        console.log(`[CloseOrder]: PnL Final: ${profitLoss.toFixed(2)}€`)

        existingTrade.status = 'closed'
        existingTrade.exitPrice = exitPrice
        existingTrade.profitLoss = profitLoss
        existingTrade.exitTimestamp = new Date() // Importante para el análisis de IA posterior

        await existingTrade.save()

        const oldBalance = trader.balance
        trader.balance += profitLoss

        trader.xp += 10
        if (profitLoss > 0) trader.xp += 20 // Extra por profit

        await trader.save()

        console.log(
            `[BalanceSync]: Usuario ${trader.username} actualizado. ${oldBalance.toFixed(2)}€ -> ${trader.balance.toFixed(2)}€`
        )

        res.status(200).json({
            message: 'Trade closed successfully',
            trade: existingTrade,
            newBalance: trader.balance,
        })
    } catch (error) {
        console.error(`[CloseOrderController Fatal Error]:`, error)
        res.status(500).json({
            message: 'Internal server error during closing',
            error,
        })
    }
}
