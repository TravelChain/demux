async function deletePost (state, payload, blockInfo, context) {
  try {
  	console.log(payload)
    await state.post.findOneAndDelete({ 
        author: payload.data.author,
        permlink: payload.data.permlink,
    }).exec()
  } catch (err) {
    console.error(err)
  }
}

export default deletePost
