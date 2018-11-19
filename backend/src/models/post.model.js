import mongoose from 'mongoose'

const { Schema } = mongoose

let Post = null

try {
  const PostSchema = new Schema({
    _id: {
      owner: String,
      data_id: Number
    },
    owner: String,
    data_id: Number,
    datastr: String,
    type_id: String,
    group_id: Number
  })
  Post = mongoose.model('Post', PostSchema)
} catch (e) {
  Post = mongoose.model('Post')
}

export default Post
