import Trade from '../models/Trade.js'
import User from '../models/User.js'

// Simulamos una función que obtiene el precio actual.
// Más adelante la conectaremos a tu API de datos real.
async function getCurrentPrice(symbol: string): Promise<number> {
    // Por ahora devolvemos un precio ficticio para testear la lógica
    // 6ta Ley: Debugging de consulta de precio
    // console.log(`[PriceFetch]: Obteniendo precio para ${symbol}`);
    return 5200.0
}

export async function checkOpenPositions() {
    try {
        // 1. Buscamos solo los trades que siguen abiertos
        const openTrades = await Trade.find({ status: 'open' })

        if (openTrades.length === 0) return

        // 6ta Ley: Monitorización activa
        console.log(
            `[Monitor]: Vigilando ${openTrades.length} posiciones abiertas...`
        )

        for (const trade of openTrades) {
            const currentPrice = await getCurrentPrice(trade.stockSymbol)
            let shouldClose = false
            let triggerReason = ''

            // 2. Lógica para posiciones LONG (Compras)
            if (trade.type === 'long') {
                if (trade.stopLoss && currentPrice <= trade.stopLoss) {
                    shouldClose = true
                    triggerReason = 'Stop Loss'
                } else if (
                    trade.takeProfit &&
                    currentPrice >= trade.takeProfit
                ) {
                    shouldClose = true
                    triggerReason = 'Take Profit'
                }
            }
            // 3. Lógica para posiciones SHORT (Ventas)
            else if (trade.type === 'short') {
                if (trade.stopLoss && currentPrice >= trade.stopLoss) {
                    shouldClose = true
                    triggerReason = 'Stop Loss'
                } else if (
                    trade.takeProfit &&
                    currentPrice <= trade.takeProfit
                ) {
                    shouldClose = true
                    triggerReason = 'Take Profit'
                }
            }

            // 4. Ejecución del cierre automático
            if (shouldClose) {
                console.log(
                    `[AutoClose]: ${triggerReason} alcanzado para ${trade.stockSymbol} (${trade._id})`
                )

                // Calculamos PnL final
                let pnl = 0
                if (trade.type === 'long') {
                    pnl = (currentPrice - trade.entryPrice) * trade.amount
                } else {
                    pnl = (trade.entryPrice - currentPrice) * trade.amount
                }

                // Actualizamos el trade
                trade.status = 'closed'
                trade.exitPrice = currentPrice
                trade.profitLoss = pnl
                trade.exitTimestamp = new Date()
                await trade.save()

                // Actualizamos el balance del usuario
                const trader = await User.findById(trade.userId)
                if (trader) {
                    trader.balance += pnl
                    await trader.save()
                    console.log(
                        `[AccountSync]: Balance de ${trader.username} actualizado tras cierre automático: ${trader.balance}€`
                    )
                }
            }
        }
    } catch (error) {
        console.error('[MonitorError]: Error en el ciclo de vigilancia:', error)
    }
}
