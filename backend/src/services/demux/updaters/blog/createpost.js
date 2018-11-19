import mongoose from 'mongoose'


async function createPost (state, payload, blockInfo, context) {
  console.log(payload)
  const Post = state.post
  try {
    var id = new mongoose.mongo.ObjectId();
  
    let post = await Post.find(
        {_id: id}
    ).exec()

    // if post already exists do not insert it in again
    if (post.length !== 0) return


      var utc = new Date().toJSON().slice(0,19).replace(/-/g,'/');
      
    post = new Post(
      {
        _id: id,
          host: payload.data.host,
          goal_id: payload.data.goal_id,
          author: payload.data.author,
          permlink: payload.data.permlink,
          created: Date.now(),
          last_update: Date.now(),
          body: payload.data.body,
          title: payload.data.title,
          meta: payload.data.meta,
      }
    )
    await post.save()
  } catch (err) {
    console.error(err)
  }
}

export default createPost
