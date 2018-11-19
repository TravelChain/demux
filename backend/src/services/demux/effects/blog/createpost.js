function createPost (state, payload, blockInfo, context) {
  console.log(payload)
  const post = {
    _id: {
          owner: payload.data.owner,
          data_id: payload.data.data_id
    },
    owner: payload.data.owner,
    data_id: payload.data.data_id,
    datastr: payload.data.datastr,
    type_id: payload.data.type_id,
    group_id: payload.data.group_id,
  }
  context.socket.emit('createpost', post)
}

export default createPost
