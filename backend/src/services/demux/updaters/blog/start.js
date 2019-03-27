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

      console.log("CREATE NEW")    
      let host = new Host(
        {

          _id: id,
            blockchain: blockchain,
            username: HostObj.username,
            registered_at: HostObj.registered_at,
            architect: HostObj.architect,
            hoperator: HostObj.hoperator,
            consensus_percent: HostObj.consensus_percent,
            referral_percent: HostObj.referral_percent,
            levels: HostObj.levels,
            dac_mode: HostObj.dac_mode,
            dacs: HostObj.dacs,

            chosts: HostObj.chosts,
            ahost: HostObj.ahost,
            
            non_active_chost: HostObj.non_active_chost,
            need_switch: HostObj.need_switch,
            fhosts_mode: HostObj.fhosts_mode,
            fhosts: HostObj.fhosts,
            title: HostObj.title,
            purpose: HostObj.purpose,
            total_shares: HostObj.total_shares,
            quote_amount: HostObj.quote_amount,
            root_token_contract: HostObj.root_token_contract,
            root_token: HostObj.root_token,
            symbol: HostObj.symbol,
            precision: HostObj.precision,
            to_pay: HostObj.to_pay,
            payed: HostObj.payed,
            cycle_start_at_id: HostObj.cycle_start_at_id,
            current_pool_id: HostObj.current_pool_id,
            current_cycle_num: HostObj.current_cycle_num,
            current_pool_num: HostObj.current_pool_num,

            parameters_setted: HostObj.parameters_setted,
            activated: HostObj.activated,
            priority_flag: HostObj.priority_flag,
            meta: HostObj.meta,
        }
      )
      await host.save()

    } 
  }
  catch (err) {
    console.error(err)
  }
}

export default start
