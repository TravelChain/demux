import mongoose from 'mongoose'
import Blockchain from '../../../../utils/Blockchain.js'


async function createPost (state, payload, blockInfo, context) {
  console.log("payload", payload)
  var postObj = await Blockchain.get_post(payload.data.author, payload.data.permlink)
  console.log("postobj", postObj)
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
    
    if (postObj.is_goal == 0){
      postObj.goal_id = 0;
      postObj.host = "";
    }

    post = new Post(
      {
        _id: id,
          blockchain: blockchain,
          ownid: postObj.id,
          host: postObj.host,
          is_goal: postObj.is_goal,
          goal_id: postObj.goal_id,
          author: postObj.author,
          parent_author: postObj.parent_author,
          permlink: postObj.permlink,
          parent_permlink: postObj.parent_permlink,
          body: postObj.body,
          title: postObj.title,
          meta: postObj.meta,
          created: postObj.created,
          last_update: postObj.last_update
      }
    )
    await post.save()
  } catch (err) {
    console.error(err)
  }
}

export default createPost
