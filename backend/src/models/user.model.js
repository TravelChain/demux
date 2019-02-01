import mongoose from 'mongoose'

const { Schema } = mongoose

let User = null

try {
  const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
      username: String,
      referer: String,
      meta: String
      
  })
  User = mongoose.model('User', UserSchema)
} catch (e) {
  User = mongoose.model('User')
}

export default User
