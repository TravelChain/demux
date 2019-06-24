import mongoose from 'mongoose'

const { Schema } = mongoose

let Host = null

try {
  const HostSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
      blockchain: String,
      username: String,
      registered_at: Date,
      architect: String,
      hoperator: String,
      consensus_percent: Number,
      referral_percent: Number,
      levels: Array,
      dac_mode: Number,
      dacs: Array,
      chosts: Array,
      ahost: String,
      non_active_chost: Boolean,
      need_switch: Boolean,
      fhosts_mode: Number,
      fhosts: Array,
      title: String,
      purpose: String,
      total_shares: Number,
      quote_amount: String,
      root_token_contract: String,
      root_token: String,
      symbol: String,
      precision: Number,
      to_pay: String,
      payed: Boolean,
      cycle_start_id: Number,
      current_pool_id: Number,
      current_cycle_num: Number,
      current_pool_num: Number,
      parameters_setted: Boolean,
      activated: Boolean,
      priority_flag: Boolean,
      meta: String,
      app: String
      
  })
  Host = mongoose.model('Host', HostSchema)
} catch (e) {
  Host = mongoose.model('Host')
}

export default Host
