import mongoose from 'mongoose'

const { Schema } = mongoose

let Market = null

try {
  const MarketSchema = new Schema({
    _id: String,
      host: String,
      date: Date,
      base: Number,
      quote: Number,
      basecurr: String,
      quotecurr: String,
      cost: Number,
      is1min: Boolean,
      is5min: Boolean,
      is15min: Boolean,
      is30min: Boolean,
      is60min: Boolean,
      is4hour: Boolean,
      is1day: Boolean,
      is1week: Boolean
  })
  Market = mongoose.model('Market', MarketSchema)
} catch (e) {
  Market = mongoose.model('Market')
}

export default Market
