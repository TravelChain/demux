import mongoose from 'mongoose'
import Blockchain from './Blockchain.js'

export class CMarket {

	static async fetch_core_market(state, blockInfo, host){		
	var start = new Date().getTime();
	try{
	  const Rate = state.rate
      const Pool = state.pool
      const Coremarket = state.coremarket
      const Hosts = state.host
      const Spiral = state.spiral

      var Host_bc = await Blockchain.get_host(host)

      if (Host_bc.meta){
      	try {
	    	let json = JSON.parse(Host_bc.meta);
			
			if (json.app)
				Host_bc.app = json.app
			else Host_bc.app = "undefined"

	    } catch (e) {
	        Host_bc.app = "undefined"
	    }
     	
		}
	console.log("APP", Host_bc.app)

      var Host_obj = await Hosts.find({
      	username: host,
      	blockchain: process.env.BC
      }).exec()

		console.log("Host_obj", Host_obj)	
      // console.log(Host_obj)

      if (Host_obj.length > 0){
      	console.log("in ffirst)")
	     await Hosts.findOneAndUpdate({
	      	username: host,
	      	blockchain: process.env.BC
	      }, Host_bc).exec()
	     console.log("host updated")
     } else {
     	console.log("on second")
     	Host_bc.blockchain = process.env.BC
     	Host_bc._id = new mongoose.mongo.ObjectId();

     	let h = new Hosts(
        {

          _id: Host_bc._id,
            blockchain: Host_bc.blockchain,
            username: Host_bc.username,
            registered_at: Host_bc.registered_at,
            architect: Host_bc.architect,
            hoperator: Host_bc.hoperator,
            consensus_percent: Host_bc.consensus_percent,
            referral_percent: Host_bc.referral_percent,
            levels: Host_bc.levels,
            dac_mode: Host_bc.dac_mode,
            dacs: Host_bc.dacs,
            app: Host_bc.app,
            chosts: Host_bc.chosts,
            ahost: Host_bc.ahost,      
            non_active_chost: Host_bc.non_active_chost,
            need_switch: Host_bc.need_switch,
            fhosts_mode: Host_bc.fhosts_mode,
            fhosts: Host_bc.fhosts,
            title: Host_bc.title,
            purpose: Host_bc.purpose,
            total_shares: Host_bc.total_shares,
            quote_amount: Host_bc.quote_amount,
            root_token_contract: Host_bc.root_token_contract,
            root_token: Host_bc.root_token,
            symbol: Host_bc.symbol,
            precision: Host_bc.precision,
            to_pay: Host_bc.to_pay,
            payed: Host_bc.payed,
            cycle_start_at_id: Host_bc.cycle_start_at_id,
            current_pool_id: Host_bc.current_pool_id,
            current_cycle_num: Host_bc.current_cycle_num,
            current_pool_num: Host_bc.current_pool_num,

            parameters_setted: Host_bc.parameters_setted,
            activated: Host_bc.activated,
            priority_flag: Host_bc.priority_flag,
            meta: Host_bc.meta,
        }
      )
      await h.save()
     	console.log("host inserted")

     }

     var Spiral_obj = await Spiral.findOne({
     	host: host,
     	blockchain: process.env.BC,
     	ahost: Host_bc.ahost
     }).exec()
     console.log("Spiral_obj2", Spiral_obj)


     if (!Spiral_obj){
     	let Spiral_bc = await Blockchain.get_spiral(host, Host_bc.ahost)
     	Spiral_bc._id = await 
     	console.log("Spiral_BC", Spiral_bc)
     	let spiral = new Spiral({
     		_id: new mongoose.mongo.ObjectId(),
     		blockchain: process.env.BC,
     		host: host,
     		ahost: Host_bc.ahost,
     		size_of_pool: Spiral_bc.size_of_pool,
     		overlap: Spiral_bc.overlap,
     		profit_growth: Spiral_bc.profit_growth,
     		base_rate: Spiral_bc.base_rate,
     		loss_percent: Spiral_bc.loss_percent,
     		pool_limit: Spiral_bc.pool_limit,
     		pool_timeout: Spiral_bc.pool_timeout,
     		priority_seconds: Spiral_bc.priority_seconds
     	})
     	await spiral.save()
     }

      var Rates_obj = await Rate.findOne(
          { host: host,
          	ahost: host,
            blockchain: process.env.BC
          }
      ).exec()

      if (!Rates_obj){
        Rates_obj = await Blockchain.get_rates(host, Host_bc.ahost)
        Rate.insertMany(Rates_obj)
      }
		
      

      
      var Pools = await Blockchain.get_pools(host)
      
      var last_pool_id = Pools.length
      var last_pool_id_minus1 = last_pool_id-1

      var last_pool_obj = Pools[last_pool_id-1] 
      var last_pool_obj_minus1 = Pools[last_pool_id-2] 
      
      // console.log("last_pool_obj", last_pool_obj)
      // console.log("last_pool_obj_minus1", last_pool_obj_minus1)
      
      var Rate_obj = await Rate.findOne(
          { host: host,
            blockchain: process.env.BC,
            pool_id: last_pool_obj.pool_num - 1
          }
      ).exec()
      var Rate_obj_minus1 = await Rate.findOne(
          { host: host,
            blockchain: process.env.BC,
            pool_id: last_pool_obj.pool_num - 2
          }
      ).exec()

      var Rate_obj_plus1 = await Rate.findOne(
          { host: host,
            blockchain: process.env.BC,
            pool_id: last_pool_obj.pool_num
          }
      ).exec()

      // console.log("last_rate_obj", Rate_obj)
      // console.log("last_rate_obj_minus1", Rate_obj_minus1)
      if (last_pool_obj.pool_num <= 2){
        var total_quants = last_pool_obj_minus1.total_quants
        
        var _id = new mongoose.mongo.ObjectId();
        
        let coremarket1 = await Coremarket.findOne({
          host: host,
          blockchain: process.env.BC,
          pool_id: last_pool_obj_minus1.id,
        })

        let coremarket2 = await Coremarket.findOne({
          host: host,
          blockchain: process.env.BC,
          pool_id: last_pool_obj.id,
        })

        var first_start_rate = Rate_obj_minus1.buy_rate
        var first_finish_rate = Rate_obj.buy_rate
        var first_sold_quants = total_quants - last_pool_obj_minus1.remain_quants
        var first_current_rate = first_start_rate  + first_sold_quants / total_quants * (first_finish_rate - first_start_rate)
        
        if (!coremarket1){
          let timestamp = new Date(blockInfo.timestamp)
          timestamp.setSeconds(0)
          let hours = timestamp.getMinutes()
          timestamp.setMinutes(hours-1)
          timestamp.setMilliseconds(0)
          timestamp = new Date(timestamp)
          let coremarket1 = new Coremarket(
          {
            _id: _id,
            pool_id: last_pool_obj_minus1.id,
            cycle_num: last_pool_obj_minus1.cycle_num,
            pool_num: last_pool_obj_minus1.pool_num,
            color: last_pool_obj_minus1.color,
            type: "hour",
            blockchain: process.env.BC,
            host: host,
            timestamp: timestamp,
            open: first_start_rate,
            high: first_finish_rate,
            low: first_start_rate,
            close: first_current_rate,
          })

          await coremarket1.save()

      } else {

          coremarket1.close = first_current_rate
          // console.log("im heere: ", first_current_rate == coremarket1.high ? true : false)
          await coremarket1.save()

      }

      var second_start_rate = Rate_obj.buy_rate
      var second_finish_rate = Rate_obj_plus1.buy_rate
      var second_sold_quants = total_quants - last_pool_obj.remain_quants
      var second_current_rate = second_start_rate  + second_sold_quants / total_quants * (second_finish_rate - second_start_rate)

      if (!coremarket2){
        var _id2 = new mongoose.mongo.ObjectId();
        	let timestamp = new Date(blockInfo.timestamp)
          timestamp.setSeconds(0)
          timestamp.setMilliseconds(0)
          timestamp = new Date(timestamp)
        
          let coremarket2 = new Coremarket(
          {
            _id: _id2,
            pool_id: last_pool_obj.id,
            cycle_num: last_pool_obj.cycle_num,
            pool_num: last_pool_obj.pool_num,
            color: last_pool_obj.color,
            type: "hour",
            blockchain: process.env.BC,
            host: host,
            timestamp: timestamp,
            open: second_start_rate,
            high: second_finish_rate,
            low: second_start_rate,
            close: second_current_rate,
          })

          await coremarket2.save()

      } else {

          coremarket2.close = second_current_rate
          // coremarket2.timestamp = blockInfo.timestamp
          await coremarket2.save()

      }

      
       console.log("first_current_rate", first_current_rate)
       console.log("second_current_rate", second_current_rate)

    } else {
      	console.log(">2")
        var last_pool_obj_minus2 = Pools[last_pool_id-3] 
        var total_quants = last_pool_obj_minus1.total_quants
        
        console.log("last_pool_obj_minus2.id: ", last_pool_obj_minus1.id)
        
        var coremarket1 = await Coremarket.findOne({
          host: host,
          blockchain: process.env.BC,
          pool_id: last_pool_obj_minus1.id,
        }).sort({ timestamp: -1 }).limit(1);
        console.log("coremarket1", coremarket1)
        var first_start_rate = coremarket1.low
        var first_finish_rate = coremarket1.high
        var first_sold_quants = total_quants - last_pool_obj_minus1.remain_quants
        var first_current_rate = first_start_rate  + first_sold_quants / total_quants * (first_finish_rate - first_start_rate)
        console.log("first_current_rate", first_current_rate)
        console.log("first_start_rate", first_start_rate)
        console.log("first_finish_rate", first_finish_rate)

        coremarket1.close = first_current_rate
        // coremarket1.timestamp = blockInfo.timestamp
        await coremarket1.save()


        var coremarket2 = await Coremarket.findOne({
          host: host,
          blockchain: process.env.BC,
          pool_id: last_pool_obj.id,
        }).sort({ timestamp: -1 }).limit(1);

        
        var second_start_rate = Rate_obj.buy_rate
        var second_finish_rate = Rate_obj_plus1.buy_rate
        var second_sold_quants = total_quants - last_pool_obj.remain_quants
        var second_current_rate = second_start_rate  + second_sold_quants / total_quants * (second_finish_rate - second_start_rate)


        if (!coremarket2){
        	console.log("NO coremarket2")

        	// var coremarket2_filled = await Coremarket.findOne({
	        //   host: host,
	        //   blockchain: process.env.BC,
	        //   pool_id: last_pool_obj.id,
	        // }).sort({ timestamp: -1 }).limit(1);

	        // if (coremarket2_filled){
	        	// console.log("coremarket2_filled", coremarket2_filled)
	        	// coremarket2 = first_current_rate
		        // await coremarket2.save()

	        // } 

        	var _id3 = new mongoose.mongo.ObjectId();
	          let timestamp = new Date(blockInfo.timestamp)
	          timestamp.setSeconds(0)
	          timestamp.setMilliseconds(0)
	          timestamp = new Date(timestamp)
	          let coremarket2 = new Coremarket(
	          {
	            _id: _id3,
	            pool_id: last_pool_obj.id,
	            cycle_num: last_pool_obj.cycle_num,
	            pool_num: last_pool_obj.pool_num,
	            color: last_pool_obj.color,
	            type: "hour",
	            blockchain: process.env.BC,
	            host: host,
	            timestamp: timestamp,
	            open: second_start_rate,
	            high: second_finish_rate,
	            low: second_start_rate,
	            close: second_current_rate,
	          })

	          await coremarket2.save()
        
          


          // console.log("current_rate", second_current_rate)
          // console.log("first_start_rate", second_start_rate)
          // console.log("first_finish_rate", second_finish_rate)

          
         

        } else {

          let da_now = new Date(blockInfo.timestamp);
          console.log("with coremarket2", coremarket2)
          // let coremarket2 = coremarket2[0]
          let da_old = new Date(coremarket2.timestamp)

          let new_minutes = da_now.getMinutes()
          

          let old_minutes = da_old.getMinutes()
		  console.log("new_minutes:", new_minutes)
          console.log("old_minutes:", old_minutes)
		  
		  // if (new_minutes == old_minutes){
		  	console.log("same time")
		  	coremarket2.close = second_current_rate
	        
	        await coremarket2.save()
	          
          // } else {
          // 	console.log("different time")
          // 	var _id4 = new mongoose.mongo.ObjectId();
          // 	  // coremarket2.close = second_current_rate
          // 	  // await coremarket2.save()
          // 	  let timestamp = new Date(blockInfo.timestamp)
	         //  timestamp.setSeconds(0)
	         //  timestamp.setMilliseconds(0)
	         //  timestamp = new Date(timestamp)
	         //  let coremarket3 = new Coremarket(
		        //   {
		        //     _id: _id4,
		        //     pool_id: coremarket2.pool_id,
		        //     cycle_num: coremarket2.cycle_num,
		        //     pool_num: coremarket2.pool_num,
		        //     color: coremarket2.color,
		        //     type: "hour",
		        //     blockchain: process.env.BC,
		        //     host: coremarket2.host,
		        //     timestamp: timestamp,
		        //     open: coremarket2.open,
		        //     high: coremarket2.high,
		        //     low: coremarket2.low,
		        //     close: second_current_rate,
		        //   })
	         
	         //  console.log(coremarket3)
	         //  await coremarket3.save()

          // }
          // console.log("filled:", second_current_rate == coremarket2.high ? true : false)
          
        }

    }


      var end = new Date().getTime();
      var time = end - start;
      console.log("Call to doSomething took ", time)

	} catch(e){
		console.error(e)
	}
	}



}

export default CMarket;






