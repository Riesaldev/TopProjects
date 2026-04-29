// 1. Corregimos la importación de tipos usando 'import type'
import type { Request, Response, RequestHandler } from 'express'
import Trade from '../models/Trade.js'
import User from '../models/User.js'

// 2. Definimos el controlador
const getUserStats: RequestHandler = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const { userId } = req.params

        // Usamos casteo a 'any' para saltar las restricciones de Mongoose que el linter marca
        const trader = await (User as any).findById(userId)

        if (!trader) {
            console.error(`[StatsError]: Usuario ${userId} no encontrado.`)
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        // Solución para el .find del linter
        const closedTrades = await (Trade as any).find({
            userId,
            status: 'closed',
        })

        console.log(
            `[StatsController]: Analizando historial de ${trader.username}`
        )

        if (closedTrades.length === 0) {
            return res
                .status(200)
                .json({ message: 'Sin historial', user: trader })
        }

        const totalTrades = closedTrades.length
        const wins = closedTrades.filter(
            (t: any) => (t.profitLoss || 0) > 0
        ).length
        const winRate = (wins / totalTrades) * 100

        const tradesSinStop = closedTrades.filter(
            (t: any) => !t.stopLoss
        ).length
        const calculatedConsistency = Math.max(0, 100 - tradesSinStop * 10)

        // Actualización de datos
        trader.xp += 10
        trader.consistencyScore = calculatedConsistency

        if (trader.stats) {
            trader.stats.totalTrades = totalTrades
            trader.stats.winRate = winRate
        }

        await trader.save()

        return res.status(200).json({
            summary: {
                username: trader.username,
                consistency: trader.consistencyScore,
                xp: trader.xp,
            },
            performance: {
                totalTrades,
                winRate: winRate.toFixed(2),
                totalPnL: closedTrades
                    .reduce(
                        (acc: number, t: any) => acc + (t.profitLoss || 0),
                        0
                    )
                    .toFixed(2),
            },
        })
    } catch (error) {
        console.error(`[StatsController Fatal Error]:`, error)
        return res.status(500).json({ message: 'Error interno' })
    }
}

export default getUserStats
