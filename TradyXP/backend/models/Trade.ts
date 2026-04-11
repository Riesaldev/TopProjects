import { model, Schema } from "mongoose";

const tradeSchema = new Schema({
  userId: { type: String, required: true },
  stockSymbol: { type: String, required: true },
  entryPrice: { type: Number, required: true },
  exitPrice: { type: Number },
  status: { type: String, enum: ["open", "closed"], default: "open" },
  stopLoss: { type: Number },
  takeProfit: { type: Number },
  timeStamp: { type: Date, default: Date.now },
});

const Trade = model("Trade", tradeSchema);

export default Trade;
