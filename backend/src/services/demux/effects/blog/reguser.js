import mongoose from 'mongoose'

function regUser (state, payload, blockInfo, context) {
  const user = {
    username: payload.data.username,
    referer: payload.data.referer,
    meta: payload.data.meta,
  }
  context.socket.emit('reguser', user)
}

export default regUser
