import mongoose from 'mongoose'


async function regUser (state, payload, blockInfo, context) {
  var blockchain = process.env.BC
  // var BalanceObj = await Blockchain.get_balance(payload.data.author, payload.data.permlink)
  console.log(payload.data)
  const User = state.user

  try {
    
    var id = new mongoose.mongo.ObjectId();
  
    let user = await User.find(
        {username: payload.data.username,
          blockchain: blockchain}
    ).exec()

    // if post already exists do not insert it in again
    if (user.length !== 0) return
    
    user = new User(
      {
        _id: id,
          blockchain: blockchain,
          username: payload.data.username,
          referer: payload.data.referer,
          meta: payload.data.meta,
      }
    )
    await user.save()
  } catch (err) {
    console.error(err)
  }
}

export default regUser
