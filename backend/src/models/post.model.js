import mongoose from 'mongoose'

const { Schema } = mongoose

let Post = null

try {
  const PostSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
      blockchain: String,
      created: Date,
      last_update: Date,
      author: String,
      parent_author: String,
      permlink: String,
      parent_permlink: String,
      body: String,
      title: String,
      meta: String,
      json: Array,
      deleted: Boolean,
  })
  Post = mongoose.model('Post', PostSchema)
} catch (e) {
  Post = mongoose.model('Post')
}

export default Post
