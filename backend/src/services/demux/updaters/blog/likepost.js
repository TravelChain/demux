async function likePost (state, payload, blockInfo, context) {
  try {
  	console.log(payload)
  	var blockchain = process.env.BC
    await state.post.findByIdAndUpdate({ timestamp: payload.data.timestamp, author: payload.data.author, blockchain: blockchain }, { $inc: { likes: 1 } }).exec()
  } catch (err) {
    console.error(err)
  }
}

export default likePost
