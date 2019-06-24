import mongoose from 'mongoose'

const { Schema } = mongoose

let Rate = null

try {
  const RateSchema = new Schema({
    _id: String,
      pool_id: Number,
      blockchain: String,
      host: String,
      ahost: String,
      total_quants: Number,
      buy_rate: Number,
      sell_rate: Number,
      client_income: String,
      delta: String,
      pool_cost: String,
      total_in_box: String,
      payment_to_wins: String,
      payment_to_loss: String,
      system_income: String,
      live_balance_for_sale: String
  })
  Rate = mongoose.model('Rate', RateSchema)
} catch (e) {
  Rate = mongoose.model('Rate')
}

export default Rate
