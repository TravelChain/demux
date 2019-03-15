import mongoose from 'mongoose'
import Blockchain from '../../../../utils/Blockchain.js'


async function start (state, payload, blockInfo, context) {
  console.log("this is start", payload.data)
  
  var HostObj = await Blockchain.get_host(payload.data.host)
  console.log(HostObj)
  //var postObj = await Blockchain.get_post(payload.data.author, payload.data.permlink)
  const Host = state.host

  try {
    var id = new mongoose.mongo.ObjectId();
  
    let host = await Host.findOne(
        {username: payload.data.host,
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
            username: HostObj.username,
            hoperator: HostObj.hoperator,
            childrens: HostObj.childrens,
            active_host: HostObj.active_host,
            non_active_child: HostObj.non_active_child,
            parameters_setted: HostObj.parameters_setted,
            need_switch: HostObj.need_switch,
            is_whitelisted: HostObj.is_whitelisted,
            whitelist: HostObj.whitelist,
            consensus_percent: HostObj.consensus_percent,
            goal_validation_percent: HostObj.goal_validation_percent,
            title: HostObj.title,
            purpose: HostObj.purpose,
            total_shares: HostObj.total_shares,
            quote_amount: HostObj.quote_amount,
            symbol: HostObj.symbol,
            precision: HostObj.precision,
            root_token_contract: HostObj.root_token_contract,
            registered_at: HostObj.registered_at,
            referral_percent: HostObj.referral_percent,
            activated: HostObj.activated,
            payed: HostObj.payed,
            to_pay: HostObj.to_pay,
            levels: HostObj.levels,
            meta: HostObj.meta,
            cycle_start_at_id: HostObj.cycle_start_at_id,
            current_pool_id: HostObj.current_pool_id,
            current_cycle_num: HostObj.current_cycle_num,
            current_pool_num: HostObj.current_pool_num,
            priority_flag: HostObj.priority_flag
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
