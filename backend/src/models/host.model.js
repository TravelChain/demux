import mongoose from 'mongoose'

const { Schema } = mongoose

let Host = null

try {
  const HostSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
      username: String,
      hoperator: String,
      childrens: Array,
      active_host: String,
      non_active_child: Boolean,
      parameters_setted: Boolean,
      need_switch: Boolean,
      is_whitelisted: Boolean,
      whitelist: Array,
      consensus_percent: Number,
      goal_validation_percent: Number,
      title: String,
      purpose: String,
      total_shares: Number,
      quote_amount: String,
      symbol: String,
      precision: Number,
      root_token_contract: String,
      registered_at: Date,
      referral_percent: Number,
      activated: Boolean,
      payed: Boolean,
      to_pay: String,
      levels: Array,
      meta: String,
      cycle_start_at_id: Number,
      current_pool_id: Number,
      current_cycle_num: Number,
      current_pool_num: Number,
      priority_flag: Number

  })
  Host = mongoose.model('Host', HostSchema)
} catch (e) {
  Host = mongoose.model('Host')
}

export default Host
