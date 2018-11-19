import mongoose from 'mongoose'

const { Schema } = mongoose

let Approve = null

try {
  const ApproveSchema = new Schema({
    _id: {
      owner: String,
      buyer: String,
      data_id: Number
    },
    owner: String,
    buyer: String,
    data_id: Number,
    offer_id: Number,
    public_key: String,
    encrypted_wif: String,
  })
  Approve = mongoose.model('Approve', ApproveSchema)
} catch (e) {
  Approve = mongoose.model('Approve')
}

export default Approve
