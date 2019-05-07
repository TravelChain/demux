import mongoose from 'mongoose'
import Blockchain from '../../../../utils/Blockchain.js'


async function transfer (state, payload, blockInfo, context) {
  
  console.log("This is TRANSFER", payload.data)

  if (payload.data.to == process.env.EOSIO_CORE_ACCOUNT){
    let subcode = payload.data.memo.substr(0, 3);
    let host = payload.data.memo.substr(4);
    console.log(subcode)
    console.log(host)

    if (subcode == "200")
    {
      console.log("im here")
      var PowerObj = await Blockchain.get_power(host, payload.data.from)
      console.log("host", host)
      console.log("from", payload.data.from)
      console.log("blockchain", process.env.BC)

      const Power = state.power
      let power = await Power.findOne(
          { username: payload.data.from,
            host: host,
            blockchain: process.env.BC
          }
      ).exec()

      console.log("power", power)
      

      if (power){
        power.power = PowerObj.power
        power.staked = PowerObj.staked
        power.delegated = PowerObj.delegated
        await power.save()

      } else {
        var id = new mongoose.mongo.ObjectId();
       
        let power = new Power(
          {
            _id: id,
            username: payload.data.from,
            host: host,
            power: PowerObj.power,
            staked: PowerObj.staked,
            delegated: PowerObj.delegated,
            blockchain: process.env.BC

          }
        )   
        await power.save()       
      }


      
    }
  }
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
