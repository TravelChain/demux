import mongoose from 'mongoose'
import Blockchain from '../../../../utils/Blockchain.js'


async function undelshares (state, payload, blockInfo, context) {
  
  console.log("This is undelshares", payload.data)
try{
    let host = payload.data.host;
    let from_username = payload.data.from;
    let reciever_username = payload.data.reciever;

      console.log("im here")
      var FromObj = await Blockchain.get_power(host, from_username)
      var RecObj = await Blockchain.get_power(host, reciever_username)
      
      const Power = state.power

      //POWER FROM
      let power_from = await Power.findOne(
          { username: from_username,
            host: host,
            blockchain: process.env.BC
          }
      ).exec()

      console.log("power", power_from)
      

      if (power_from){
        power_from.power = FromObj.power
        power_from.staked = FromObj.staked
        power_from.delegated = FromObj.delegated
        await power_from.save()

      } else {
        var id = new mongoose.mongo.ObjectId();
       
        let power_from = new Power(
          {
            _id: id,
            username: from_username,
            host: host,
            power: FromObj.power,
            staked: FromObj.staked,
            delegated: FromObj.delegated,
            blockchain: process.env.BC

          }
        )   
        await power_from.save()       
      }
      //POWER RECIEVER

      let power_reciever = await Power.findOne(
          { username: reciever_username,
            host: host,
            blockchain: process.env.BC
          }
      ).exec()

      console.log("power", power_reciever)
      

      if (power_reciever){
        power_reciever.power = RecObj.power
        power_reciever.staked = RecObj.staked
        power_reciever.delegated = RecObj.delegated
        await power_reciever.save()

      } else {
        var id = new mongoose.mongo.ObjectId();
       
        let power_reciever = new Power(
          {
            _id: id,
            username: reciever_username,
            host: host,
            power: RecObj.power,
            staked: RecObj.staked,
            delegated: RecObj.delegated,
            blockchain: process.env.BC

          }
        )   
        await power_reciever.save()       
      }

} catch(e){
    console.error("error", e)
  }
}

export default undelshares
