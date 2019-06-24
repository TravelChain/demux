import mongoose from 'mongoose'
import Blockchain from '../../../../utils/Blockchain.js'


async function start (state, payload, blockInfo, context) {
  console.log("this is start", payload.data)
  var blockchain = process.env.BC
  var HostObj = await Blockchain.get_host(payload.data.host)
  console.log(HostObj)
  //var postObj = await Blockchain.get_post(payload.data.author, payload.data.permlink)
  const Host = state.host

  try {
    var id = new mongoose.mongo.ObjectId();
  
    let host = await Host.findOne(
        {username: payload.data.host,
          blockchain: blockchain
          }
    ).exec()
    console.log("FOUNDED OBJ,", host)
    // // if post already exists do not insert it in again
    
    if (host) {
      return;

    } else {
      //NEW
      // for (var key in HostObj.levels) {
      //   HostObj.levels[key] = HostObj.levels[key] / 1000000;
      // }
      if (HostObj.meta){
          let json = JSON.parse(HostObj.meta);
        if (json.app)
          HostObj.app = json.app
        else HostObj.app = "undefined"
      }
      console.log("CREATE NEW")    
      
      await host.save()

    } 
  }
  catch (err) {
    console.error(err)
  }
}

export default start
