import mongoose from 'mongoose'

const { Schema } = mongoose

let CoreMarket = null

try {
  const CoreMarketSchema = new Schema({
    _id: String,
      pool_id: Number,
      pool_num: Number,
      cycle_num: Number,
      blockchain: String,
      host: String,
      open: Number,
      high: Number,
      low: Number,
      close: Number,
      color: String,
      type: String,
      filled: Boolean,
      timestamp: Date,
      
  })
  CoreMarket = mongoose.model('CoreMarket', CoreMarketSchema)
} catch (e) {
  CoreMarket = mongoose.model('CoreMarket')
}

export default CoreMarket
