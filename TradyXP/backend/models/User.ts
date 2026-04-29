import { Schema, model } from 'mongoose'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        // Capital ficticio para operar
        balance: {
            type: Number,
            default: 100000,
        },
        // Moneda ficticia otorgada por consistencia/logros
        virtualCurrency: {
            type: Number,
            default: 0,
        },
        // Progreso y Niveles
        xp: {
            type: Number,
            default: 0,
        },
        level: {
            type: Number,
            default: 1,
        },
        rank: {
            type: String,
            default: 'Novato',
        },
        // Métricas para la "Pestaña de Mejora"
        consistencyScore: {
            type: Number,
            default: 100, // Empieza al 100%
            min: 0,
            max: 100,
        },
        stats: {
            totalTrades: { type: Number, default: 0 },
            winRate: { type: Number, default: 0 },
            maxDrawdown: { type: Number, default: 0 }, // Máxima pérdida desde el punto más alto
        },
    },
    {
        timestamps: true, // Crea automáticamente createdAt y updatedAt
    }
)

// 6ta Ley: Debugging en la creación de usuario
userSchema.post('save', function (doc) {
    console.log(
        `[Model-User]: Datos actualizados para ${doc.username}. Balance: ${doc.balance} | XP: ${doc.xp}`
    )
})

export default model('User', userSchema)
