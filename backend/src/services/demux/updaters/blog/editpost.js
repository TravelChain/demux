async function editPost (state, payload, blockInfo, context) {
  try {
  	payload.data.last_update = blockInfo.timestamp
  	console.log(payload)
    var blockchain = process.env.BC

    await state.post.findOneAndUpdate({ 
    	    author: payload.data.author,
          permlink: payload.data.permlink,
          blockchain: blockchain
    }, payload.data).exec()
  } catch (err) {
    console.error(err)
  }
}
export default editPost
