async function editPost (state, payload, blockInfo, context) {
  try {
  	payload.data.last_update = Date.now()
  	console.log(payload)
        
    await state.post.findOneAndUpdate({ 
    	    author: payload.data.author,
          permlink: payload.data.permlink,
    }, payload.data).exec()
  } catch (err) {
    console.error(err)
  }
}
export default editPost
