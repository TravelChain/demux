async function createPost (state, payload, blockInfo, context) {
  console.log(payload)

  const Post = state.post
  try {
    let post = await Post.find(
      {
        _id: {
          owner: payload.data.owner,
          data_id: payload.data.data_id
        }
      }
    ).exec()

    // if post already exists do not insert it in again
    if (post.length !== 0) return

    post = new Post(
      {
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
    )
    await post.save()
  } catch (err) {
    console.error(err)
  }
}

export default createPost
