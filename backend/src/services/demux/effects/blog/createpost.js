import mongoose from 'mongoose'

function createPost (state, payload, blockInfo, context) {
  console.log(payload)
  
  const post = {
    host: payload.data.host,
    goal_id: payload.data.goal_id,
    author: payload.data.author,
    permlink: payload.data.permlink,

    body: payload.data.body,
    title: payload.data.title,
    meta: payload.data.meta,
  }
  context.socket.emit('createpost', post)
}

export default createPost
