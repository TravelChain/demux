import mongoose from 'mongoose'
import Blockchain from '../../../../utils/Blockchain.js'


async function sellshares (state, payload, blockInfo, context) {
  
  console.log("This is sellshares", payload.data)

    let host = payload.data.host;
    let username = payload.data.username;

      console.log("im here")
      var PowerObj = await Blockchain.get_power(host, username)
      console.log("host", host)
      console.log("blockchain", process.env.BC)

      const Power = state.power
      let power = await Power.findOne(
          { username: username,
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

export default sellshares
