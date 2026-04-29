import axios from 'axios'

// 6ta Ley: Debugging de entorno
const API_URL = 'http://localhost:5000/api'

const api = axios.create({
    baseURL: API_URL
})

export const tradeService = {
    // Obtener estadísticas y usuario
    getUserStats: async (userId: string) => {
        const { data } = await api.get(`/trades/stats/${userId}`)
        return data
    },
    // Abrir operación
    openTrade: async (tradeData: unknown) => {
        const { data } = await api.post('/trades/open', tradeData)
        return data
    },
    // Cerrar operación
    closeTrade: async (tradeId: string, exitPrice: number) => {
        const { data } = await api.post('/trades/close', { tradeId, exitPrice })
        return data
    }
}

export default api
