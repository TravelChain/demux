import mongoose from 'mongoose'
import Blockchain from '../../../../utils/Blockchain.js'
import CMarket from '../../../../utils/CMarket.js'


async function transfer (state, payload, blockInfo, context) {
  
  console.log("This is TRANSFER", payload.data)
  var start = new Date().getTime();
  if (payload.data.to == process.env.EOSIO_CORE_ACCOUNT){
    let subcode = payload.data.memo.substr(0, 3);
    let host = payload.data.memo.substr(4);
    console.log(subcode)
    console.log(host)

    if (subcode == "100"){
      await CMarket.fetch_core_market(state, blockInfo, host)
    //   console.log("this is deposit")
    //   //here we get rates, if dont have for current pool
    //   //here we get target pool
    //   //here we configure market and save it
    //   const Rate = state.rate
    //   const Pool = state.pool
    //   const Coremarket = state.coremarket

    //   var Rates_obj = await Rate.find(
    //       { host: host,
    //         blockchain: process.env.BC
    //       }
    //   ).exec()

    //   if (Rates_obj.length == 0){
    //     Rates_obj = await Blockchain.get_rates(host)
        
    //     Rate.insertMany(Rates_obj)
    //   }
      
    //   var Pools = await Blockchain.get_pools(host)
      
    //   var last_pool_id = Pools.length
    //   var last_pool_id_minus1 = last_pool_id-1

    //   var last_pool_obj = Pools[last_pool_id-1] 
    //   var last_pool_obj_minus1 = Pools[last_pool_id-2] 
      
    //   // console.log("last_pool_obj", last_pool_obj)
    //   // console.log("last_pool_obj_minus1", last_pool_obj_minus1)
      
    //   var Rate_obj = await Rate.findOne(
    //       { host: host,
    //         blockchain: process.env.BC,
    //         pool_id: last_pool_obj.pool_num - 1
    //       }
    //   ).exec()
    //   var Rate_obj_minus1 = await Rate.findOne(
    //       { host: host,
    //         blockchain: process.env.BC,
    //         pool_id: last_pool_obj.pool_num - 2
    //       }
    //   ).exec()

    //   var Rate_obj_plus1 = await Rate.findOne(
    //       { host: host,
    //         blockchain: process.env.BC,
    //         pool_id: last_pool_obj.pool_num
    //       }
    //   ).exec()

    //   // console.log("last_rate_obj", Rate_obj)
    //   // console.log("last_rate_obj_minus1", Rate_obj_minus1)
    //   if (last_pool_obj.pool_num <= 2){
    //     var total_quants = last_pool_obj_minus1.total_quants
        
    //     var _id = new mongoose.mongo.ObjectId();
        
    //     let coremarket1 = await Coremarket.findOne({
    //       host: host,
    //       blockchain: process.env.BC,
    //       pool_id: last_pool_obj_minus1.id,
    //     })

    //     let coremarket2 = await Coremarket.findOne({
    //       host: host,
    //       blockchain: process.env.BC,
    //       pool_id: last_pool_obj.id,
    //     })

    //     var first_start_rate = Rate_obj_minus1.buy_rate
    //     var first_finish_rate = Rate_obj.buy_rate
    //     var first_sold_quants = total_quants - last_pool_obj_minus1.remain_quants
    //     var first_current_rate = first_start_rate  + first_sold_quants / total_quants * (first_finish_rate - first_start_rate)
        
    //     if (!coremarket1){
          
    //       let coremarket1 = new Coremarket(
    //       {
    //         _id: _id,
    //         pool_id: last_pool_obj_minus1.id,
    //         cycle_num: last_pool_obj_minus1.cycle_num,
    //         pool_num: last_pool_obj_minus1.pool_num,
    //         color: last_pool_obj_minus1.color,
    //         type: "hour",
    //         blockchain: process.env.BC,
    //         host: host,
    //         filled: false,
    //         timestamp: blockInfo.timestamp,
    //         open: first_start_rate,
    //         high: first_finish_rate,
    //         low: first_start_rate,
    //         close: first_current_rate,
    //       })

    //       await coremarket1.save()

    //   } else {

    //       coremarket1.close = first_current_rate
    //       coremarket1.filled = first_current_rate == coremarket1.high ? true : false
    //       console.log("im heere: ", first_current_rate == coremarket1.high ? true : false)
    //       await coremarket1.save()

    //   }

    //   var second_start_rate = Rate_obj.buy_rate
    //   var second_finish_rate = Rate_obj_plus1.buy_rate
    //   var second_sold_quants = total_quants - last_pool_obj.remain_quants
    //   var second_current_rate = second_start_rate  + second_sold_quants / total_quants * (second_finish_rate - second_start_rate)

    //   if (!coremarket2){
    //     var _id2 = new mongoose.mongo.ObjectId();
        
        
    //       let coremarket2 = new Coremarket(
    //       {
    //         _id: _id2,
    //         pool_id: last_pool_obj.id,
    //         cycle_num: last_pool_obj.cycle_num,
    //         pool_num: last_pool_obj.pool_num,
    //         color: last_pool_obj.color,
    //         type: "hour",
    //         blockchain: process.env.BC,
    //         host: host,
    //         filled: false,
    //         timestamp: blockInfo.timestamp,
    //         open: second_start_rate,
    //         high: second_finish_rate,
    //         low: second_start_rate,
    //         close: second_current_rate,
    //       })

    //       await coremarket2.save()

    //   } else {

    //       coremarket2.close = second_current_rate
    //       coremarket2.filled = second_current_rate == coremarket2.high ? true : false
    //       await coremarket2.save()

    //   }

      
    //    console.log("first_current_rate", first_current_rate)
    //    console.log("second_current_rate", second_current_rate)

    // } else {
    //   console.log("next_step")
    //     var last_pool_obj_minus2 = Pools[last_pool_id-3] 
    //     var total_quants = last_pool_obj_minus1.total_quants
        
    //     console.log("last_pool_obj_minus2.id: ", last_pool_obj_minus1.id)
        
    //     var coremarket1 = await Coremarket.findOne({
    //       host: host,
    //       blockchain: process.env.BC,
    //       pool_id: last_pool_obj_minus1.id,
    //     })

    //     var first_start_rate = coremarket1.low
    //     var first_finish_rate = coremarket1.high
    //     var first_sold_quants = total_quants - last_pool_obj_minus1.remain_quants
    //     var first_current_rate = first_start_rate  + first_sold_quants / total_quants * (first_finish_rate - first_start_rate)
    //     console.log("current_rate", first_current_rate)
    //     console.log("first_start_rate", first_start_rate)
    //     console.log("first_finish_rate", first_finish_rate)

    //     coremarket1.close = first_current_rate
    //     coremarket1.filled = first_current_rate == coremarket1.high ? true : false
    //     await coremarket1.save()


    //     var coremarket2 = await Coremarket.findOne({
    //       host: host,
    //       blockchain: process.env.BC,
    //       pool_id: last_pool_obj.id,
    //     })

        
    //     var second_start_rate = Rate_obj.buy_rate
    //     var second_finish_rate = Rate_obj_plus1.buy_rate
    //     var second_sold_quants = total_quants - last_pool_obj.remain_quants
    //     var second_current_rate = second_start_rate  + second_sold_quants / total_quants * (second_finish_rate - second_start_rate)


    //     if (!coremarket2){
    //       var _id3 = new mongoose.mongo.ObjectId();
    //       let coremarket2 = new Coremarket(
    //       {
    //         _id: _id3,
    //         pool_id: last_pool_obj.id,
    //         cycle_num: last_pool_obj.cycle_num,
    //         pool_num: last_pool_obj.pool_num,
    //         color: last_pool_obj.color,
    //         type: "hour",
    //         blockchain: process.env.BC,
    //         host: host,
    //         filled: false,
    //         timestamp: blockInfo.timestamp,
    //         open: second_start_rate,
    //         high: second_finish_rate,
    //         low: second_start_rate,
    //         close: second_current_rate,
    //       })

    //       await coremarket2.save()


    //       console.log("current_rate", second_current_rate)
    //       console.log("first_start_rate", second_start_rate)
    //       console.log("first_finish_rate", second_finish_rate)

          
         

    //     } else {
    //       coremarket2.close = second_current_rate
    //       coremarket2.filled = second_current_rate == coremarket2.high ? true : false
    //       console.log("filled:", second_current_rate == coremarket2.high ? true : false)
    //       await coremarket2.save()
    //     }

    // }


    //   var end = new Date().getTime();
    //   var time = end - start;
    //   console.log("Call to doSomething took ", time)
    }













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
