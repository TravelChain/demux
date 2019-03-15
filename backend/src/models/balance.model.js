import mongoose from 'mongoose'

const { Schema } = mongoose

let Balance = null

try {
  const BalanceSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
      username: String,
      ownid: Number,
      host: String,
      children_host: String,
      cycle_num: Date,
      pool_num: Date,
      is_goal: Number,
      goal_id: String,
      global_pool_id: String,
      quants_for_sale: String,
      next_quants_for_sale: String,
      last_recalculated_win_pool_id: String,
      win: Boolean,
      pool_color: String,
      available: String,
      purchase_amount: String,
      date_of_purchase: String,
      ref_amount: String,
      sys_amount: String,
      sold_amount: String,
      date_of_sale: String,
      forecasts: Array,
      ref_amount: String,
      sys_amount: String,
      withdrawed: Boolean,

  })
  Balance = mongoose.model('Balance', BalanceSchema)
} catch (e) {
  Balance = mongoose.model('Balance')
}

export default Balance
