import mongoose from 'mongoose'

const { Schema } = mongoose

let BadgeType = null

try {
  const BadgeTypeSchema = new Schema({
   
    _id: mongoose.Schema.Types.ObjectId,
      ownid: Number,
      blockchain: String,
      host: String,
      caption: String,
      description: String,
      iurl: String,
      total: Number,
      remain: Number,
      power: Number
      
  })
  BadgeType = mongoose.model('BadgeType', BadgeTypeSchema)
} catch (e) {
  BadgeType = mongoose.model('BadgeType')
}

export default BadgeType
