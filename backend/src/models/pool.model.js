import mongoose from 'mongoose'

const { Schema } = mongoose

let Pool = null

try {
  const PoolSchema = new Schema({
    _id: String,
      blockchain: String,
      host: String,
      id: String,
      ahost: String,
      cycle_num: Number,
      pool_num: Number,
      color: String,
      total_quants: Number,
      creserved_quants: Number,
      remain_quants: Number,
      quant_cost: String,
      total_win_withdraw: String,
      total_loss_withdraw: String,
      pool_started_at: Date,
      priority_until: Date,
      pool_expired_at: Date,

  })
  Pool = mongoose.model('Pool', PoolSchema)
} catch (e) {
  Pool = mongoose.model('Pool')
}

export default Pool
