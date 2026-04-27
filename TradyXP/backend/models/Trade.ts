import { model, Schema } from 'mongoose'

const tradeSchema = new Schema({
    userId: { type: String, required: true },
    stockSymbol: { type: String, required: true },
    entryPrice: { type: Number, required: true },
    exitPrice: { type: Number },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    type: { type: String, enum: ['long', 'short'], required: true },
    profitLoss: { type: Number },
    amount: { type: Number, required: true },
    stopLoss: { type: Number },
    takeProfit: { type: Number },
    openTimeStamp: { type: Date, default: Date.now },
    exitTimestamp: { type: Date },
})

const Trade = model('Trade', tradeSchema)

export default Trade
