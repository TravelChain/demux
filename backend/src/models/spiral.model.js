import mongoose from 'mongoose'

const { Schema } = mongoose

let Spiral = null

try {
  const SpiralSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
      blockchain: String,
      host: String,
      ahost: String,
      size_of_pool: Number,
      overlap: Number,
      profit_growth: Number,
      base_rate: Number,
      loss_percent: Number,
      pool_limit: Number,
      pool_timeout: Number,
      priority_seconds: Number
      
  })
  Spiral = mongoose.model('Spiral', SpiralSchema)
} catch (e) {
  Spiral = mongoose.model('Spiral')
}

export default Spiral
