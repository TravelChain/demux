import mongoose from 'mongoose'

const { Schema } = mongoose

let Power = null

try {
  const PowerSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
      blockchain: String,
      username: String,
      host: String,
      power: Number,
      staked: Number,
      delegated: Number
      
  })
  Power = mongoose.model('Power', PowerSchema)
} catch (e) {
  Power = mongoose.model('Power')
}

export default Power
