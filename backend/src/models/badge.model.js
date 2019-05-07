import mongoose from 'mongoose'

const { Schema } = mongoose

let Badge = null

try {
  const BadgeSchema = new Schema({
   
    _id: mongoose.Schema.Types.ObjectId,
      ownid: Number,
      username: String,
      blockchain: String,
      host: String,
      badgetype: Number,
      comment: String,
      backed: Boolean,
      backreason: String,
      caption: String,
      description: String,
      iurl: String,
      
  })
  Badge = mongoose.model('Badge', BadgeSchema)
} catch (e) {
  Badge = mongoose.model('Badge')
}

export default Badge
