import mongoose from 'mongoose'
import Blockchain from '../../../../utils/Blockchain.js'


async function createPost (state, payload, blockInfo, context) {
  console.log("payload", payload)
  // var postObj = await Blockchain.get_post(payload.data.author, payload.data.permlink)
  // console.log("postobj", postObj)
  console.log("blockInfo", blockInfo)
  const Post = state.post
  try {
    var blockchain = process.env.BC
    
    var id = new mongoose.mongo.ObjectId();
  
    let post = await Post.find(
        {permlink: payload.data.permlink,
          author: payload.data.author,
          blockchain: blockchain
        }
    ).exec()

    // if post already exists do not insert it in again
    if (post.length !== 0) return
    
    
    try {
      payload.data.json = JSON.parse(payload.data.meta);

    } catch (e){
      console.error(e)
      payload.data.json = {}
    }

    post = new Post(
      {
        _id: id,
          blockchain: blockchain,
          author: payload.data.author,
          parent_author: payload.data.parent_author,
          permlink: payload.data.permlink,
          parent_permlink: payload.data.parent_permlink,
          body: payload.data.body,
          title: payload.data.title,
          meta: payload.data.meta,
          json: payload.data.json,
          created: blockInfo.timestamp,
          last_update: blockInfo.timestamp
      }
    )
    await post.save()
  } catch (err) {
    console.error(err)
  }
}

export default createPost
