async function createApprove (state, payload, blockInfo, context) {
  console.log(payload)
  
  const Approve = state.approve
  try {
    let approve = await Approve.find(
      {
        _id: {
          owner: payload.data.owner,
          buyer: payload.data.buyer,
          data_id: payload.data.data_id
        }
      }
    ).exec()

    // if post already exists do not insert it in again
    if (approve.length !== 0) return

    approve = new Approve(
      {
        _id: {
          owner: payload.data.owner,
          buyer: payload.data.buyer,
          data_id: payload.data.data_id
        },
        owner: payload.data.owner,
        buyer: payload.data.buyer,
        data_id: payload.data.data_id,
        offer_id: payload.data.offer_id,
        public_key: payload.data.public_key,
        encrypted_wif: payload.data.encrypted_wif,
      }
    )
    await approve.save()
  } catch (err) {
    console.error(err)
  }
}

export default createApprove
