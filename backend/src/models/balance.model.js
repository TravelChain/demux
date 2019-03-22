import mongoose from 'mongoose'

const { Schema } = mongoose

let Balance = null

try {
  const BalanceSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
      username: String,
      ownid: Number,
      host: String,
      chost: String,
      cycle_num: Number,
      pool_num: Number,
      global_pool_id: String,
      quants_for_sale: String,
      next_quants_for_sale: String,
      last_recalculated_win_pool_id: String,
      win: Boolean,
      pool_color: String,
      available: String,
      purchase_amount: String,
      forecasts: Array,
      ref_amount: String,
      sys_amount: String,
      withdrawed: Boolean,
      meta: String
  })
  Balance = mongoose.model('Balance', BalanceSchema)
} catch (e) {
  Balance = mongoose.model('Balance')
}

export default Balance
