import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './db/db.js'
import tradeRoutes from './routes/tradeRoutes.js'
import { checkOpenPositions } from './services/marketMonitor.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

connectDb()

app.use('/api/trades', tradeRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)

    // Iniciamos el Vigilante de Mercado
    // Se ejecuta cada 5 segundos (5000ms)
    setInterval(async () => {
        // 6ta Ley: Tick de sistema
        // console.log("[System]: Ejecutando verificación de posiciones...");
        await checkOpenPositions()
    }, 5000)
})
