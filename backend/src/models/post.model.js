import mongoose from 'mongoose'

const { Schema } = mongoose

let Post = null

try {
  const PostSchema = new Schema({
    _id: String,
      host: String,
      created: Date,
      last_update: Date,
      goal_id: Number,
      author: String,
      permlink: String,
      body: String,
      title: String,
      meta: String
  })
  Post = mongoose.model('Post', PostSchema)
} catch (e) {
  Post = mongoose.model('Post')
}

export default Post
