async function deletePost (state, payload, blockInfo, context) {
  try {
  	console.log(payload)
    await state.post.findOneAndDelete({ 
    	host: payload.data.host,
        goal_id: payload.data.goal_id,
        author: payload.data.author,
        permlink: payload.data.permlink,
    }).exec()
  } catch (err) {
    console.error(err)
  }
}

export default deletePost
