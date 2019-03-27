import mongoose from 'mongoose'


async function transfer (state, payload, blockInfo, context) {
  
  //var postObj = await Blockchain.get_post(payload.data.author, payload.data.permlink)
  // console.log("This is TRANSFER", payload.data)
  // if (payload.data.to == process.env.EOSIO_CORE_ACCOUNT){
  //   if (payload.data.memo == "100-alice.tc")
  //   {
  //     console.log("im here")
  //     const Balance = state.balance
  //     var id = new mongoose.mongo.ObjectId();
  //     let balance = new Balance(
  //       {
  //         _id: id,
          
  //         host: "alice.tc",
  //       }
  //     )
  //     await balance.save()
  //   }
  // }
  // const User = state.user

  // try {
    
  //   var id = new mongoose.mongo.ObjectId();
  
  //   let user = await User.find(
  //       {username: payload.data.username}
  //   ).exec()

  //   // if post already exists do not insert it in again
  //   if (user.length !== 0) return
    
  //   user = new User(
  //     {
  //       _id: id,
  //         username: payload.data.username,
  //         referer: payload.data.referer,
  //         meta: payload.data.meta,
  //     }
  //   )
  //   await user.save()
  // } catch (err) {
  //   console.error(err)
  // }
}

export default transfer
