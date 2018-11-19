function CreateApprove (state, payload, blockInfo, context) {
  console.log(payload)
  const approve = {
    _id: {
          owner: payload.data.owner,
          buyer: payload.data.buyer,
          data_id: payload.data.data_id
    },
    offer_id: payload.data.offer_id,
    public_key: payload.data.public_key,
    encrypted_wif: payload.data.encrypted_wif,
  }
  context.socket.emit('createapprove', approve)
}

export default CreateApprove
