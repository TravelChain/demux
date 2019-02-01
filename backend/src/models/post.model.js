import mongoose from 'mongoose'

const { Schema } = mongoose

let Post = null

try {
  const PostSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
      ownid: String,
      host: String,
      is_goal: Boolean,
      created: Date,
      last_update: Date,
      goal_id: Number,
      author: String,
      parent_author: String,
      permlink: String,
      parent_permlink: String,
      body: String,
      title: String,
      meta: String
  })
  Post = mongoose.model('Post', PostSchema)
} catch (e) {
  Post = mongoose.model('Post')
}

export default Post
