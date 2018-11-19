async function editPost (state, payload, blockInfo, context) {
  try {
  	console.log(payload)
    await state.post.findByIdAndUpdate({ owner: payload.data.owner, data_id: payload.data.data_id }, payload.data).exec()
  } catch (err) {
    console.error(err)
  }
}
export default editPost
