import mongoose from 'mongoose'

function createPost (state, payload, blockInfo, context) {
  console.log(payload)
  
  const post = {
    host: payload.data.host,
    goal_id: payload.data.goal_id,
    author: payload.data.author,
    parent_author: payload.data.parent_author,
    permlink: payload.data.permlink,
    parent_permlink: payload.data.parent_permlink,
    body: payload.data.body,
    title: payload.data.title,
    meta: payload.data.meta,
  }
  context.socket.emit('createpost', post)
}

export default createPost
