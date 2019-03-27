async function deletePost (state, payload, blockInfo, context) {
  try {
  	console.log(payload)
    var blockchain = process.env.BC
    await state.post.findOneAndDelete({ 
        author: payload.data.author,
        permlink: payload.data.permlink,
        blockchain: blockchain
    }).exec()
  } catch (err) {
    console.error(err)
  }
}

export default deletePost
