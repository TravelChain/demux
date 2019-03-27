// const Eos = require('eosjs')
const EosApi = require('eosjs-api')
// const ecc = require('eosjs-ecc')

var scatter_options = { expireInSeconds:60 };

const options = {
  httpEndpoint: process.env.PROTOCOL + process.env.ENDPOINT, 
  verbose: false, // API logging
  sign:true,
  logger: { // Default logging functions

  },
  fetchConfiguration: {}
}

const eosapi = EosApi(options)
const protocol = process.env.PROTOCOL
const endpoint = process.env.ENDPOINT

var network = {
		  protocol: protocol,
          blockchain: process.env.BLOCKCHAIN,
          host: endpoint, // ( or null if endorsed chainId )
          port: process.env.ENDPORT, // ( or null if defaulting to 80 )
          chainId: process.env.CHAINID,
}


import mongoose from 'mongoose'
import { Market } from '../models'

export class Blockchain {

	static async get_markets(){
		var blockchain = process.env.BC

		var mar_1m = await Market.findOne({is1min:true}).sort({date: -1}).exec();
		
		var mar_5m = await Market.findOne({is5min:true}).sort({date: -1}).exec();
		var mar_15m = await Market.findOne({is15min:true}).sort({date: -1}).exec();
		var mar_30m = await Market.findOne({is30min:true}).sort({date: -1}).exec();
		var mar_60m = await Market.findOne({is60min:true}).sort({date: -1}).exec();
		var mar_4h = await Market.findOne({is4hour:true}).sort({date: -1}).exec();
		var mar_1d = await Market.findOne({is1day:true}).sort({date: -1}).exec();
		var mar_1w = await Market.findOne({is1week:true}).sort({date: -1}).exec();
										

		var api = await Blockchain.get_api_instance()
		var more = true
	    try{
			while (more == true){ 
				var i = 0
				await api.getTableRows(true, process.env.EOSIO_CORE_ACCOUNT, process.env.EOSIO_CORE_ACCOUNT, 'hosts', 'username', i, -1, 100).
			      then(data=>{
			      	more = data.more
			        i+= 100
	    	        data.rows.map(element => {
			  	        api.getTableRows(true, process.env.EOSIO_CORE_ACCOUNT, element.username, 'powermarket', 'id', 0, -1, 100).
					      then(market=>{
					      	
					        var id = new mongoose.mongo.ObjectId();
					        let basebal = market.rows[0].base.balance
					        let quotebal = market.rows[0].quote.balance

					        basebal = parseFloat(basebal.replace("CORE", ""))
					        quotebal = parseFloat(quotebal.replace(element.symbol, ""))
					        let cost = (quotebal / basebal).toFixed(8)
					        let date = new Date();
					        
					        let minutes_now = date.getMinutes()
					        let hours_now = date.getHours()
					        let days_now = date.getDay()
					        
					        					        
					        
					        if (mar_5m == null){
								var is5min = true
							} else {
								let minutes_before_5m = mar_5m.date.getMinutes()
					            let abs_m_5m = Math.abs(minutes_now - minutes_before_5m)
				        	    console.log("abs_m_5m: ", abs_m_5m);
					     	
								var is5min = abs_m_5m >= 5
							}
							if (mar_15m == null){
								var is15min = true
							} else {
								let minutes_before_15m = mar_15m.date.getMinutes()
					        	let abs_m_15m = Math.abs(minutes_now - minutes_before_15m)
				        	    console.log("abs_m_15m: ", abs_m_15m);
					     
								var is15min = abs_m_15m >= 15
							}
							if (mar_30m == null){
								var is30min = true
							} else {
								let minutes_before_30m = mar_30m.date.getMinutes()
					        	let abs_m_30m = Math.abs(minutes_now - minutes_before_30m)
					        	console.log("abs_m_30m: ", abs_m_30m);
					     
								var is30min = abs_m_30m >= 30
							}
							if (mar_60m == null){
								var is60min = true
							} else {
								let hours_before_1h = mar_60m.date.getHours()
					        	let abs_m_60m = Math.abs(hours_now - hours_before_1h)
					        	console.log("abs_m_60m: ", abs_m_60m);
					     
								var is60min = abs_m_60m >= 1
							}
							if (mar_4h == null){
								
								var is4hour = true
							} else {
								let hours_before_4h = mar_4h.date.getHours()
					        	let abs_m_4h = Math.abs(hours_now - hours_before_4h)
								console.log("abs_m_4h: ", abs_m_4h);
					     
								var is4hour = abs_m_4h >= 4
							}
							if (mar_1d == null){
								var is1day = true
							} else {
								let days_before_1d = mar_1d.date.getDay()
					        	let abs_m_1d = Math.abs(days_now - days_before_1d)
					        	console.log("abs_m_1d: ", abs_m_1d);
					     
								is1day = abs_m_1d >= 1
							}
							if (mar_1w == null){
								var is1week = true
							} else {
								let days_before_1w = mar_1w.date.getDay()
					        	let abs_m_1w = Math.abs(days_now - days_before_1w)
					        	console.log("abs_m_1w: ", abs_m_1w);
					     		console.log("_________________");
								var is1week = abs_m_1w >= 6
							}
							

					        var market = new Market(
						      {
						        _id: new mongoose.Types.ObjectId(),
						          blockchain: blockchain,
				                  host: element.username,
							      date: date,
							      base: basebal,
							      quote: quotebal,
							      basecurr: "POWER",
							      quotecurr: element.symbol,
							      cost: cost,
							      is1min: true,
							      is5min: is5min,
							      is15min: is15min,
							      is30min: is30min,
						          is60min: is60min,
						          is4hour: is4hour,
						          is1day: is1day, 
						          is1week: is1week
						      }
						    )
						    market.save()

					    }).catch(e =>{
			  				console.log("err:", e)
					    })   
		        	});
			 		   
			    }).catch(e => {
			    	console.log("err:", e)
			    })
		  	}
		  } catch(e){
		  	console.log("err:", e)
		  }
	}


	static async get_ram_market(){
		var mar_1m = await Market.findOne({is1min:true}).sort({date: -1}).exec();
		
		var mar_5m = await Market.findOne({is5min:true}).sort({date: -1}).exec();
		var mar_15m = await Market.findOne({is15min:true}).sort({date: -1}).exec();
		var mar_30m = await Market.findOne({is30min:true}).sort({date: -1}).exec();
		var mar_60m = await Market.findOne({is60min:true}).sort({date: -1}).exec();
		var mar_4h = await Market.findOne({is4hour:true}).sort({date: -1}).exec();
		var mar_1d = await Market.findOne({is1day:true}).sort({date: -1}).exec();
		var mar_1w = await Market.findOne({is1week:true}).sort({date: -1}).exec();
										

		var api = await Blockchain.get_api_instance()
		
		try{
		    api.getTableRows(true, "eosio", "eosio", 'rammarket', 'id', 0, -1, 100).
			      then(market=>{
			      	
			        var id = new mongoose.mongo.ObjectId();
			        let basebal = market.rows[0].base.balance
			        let quotebal = market.rows[0].quote.balance

			        basebal = parseFloat(basebal.replace(" RAM", ""))
			        quotebal = parseFloat(quotebal.replace(" " + process.env.CORE_SYMBOL, ""))
			        let cost = (quotebal / basebal).toFixed(8)
			        let date = new Date();
			        
			        let minutes_now = date.getMinutes()
			        let hours_now = date.getHours()
			        let days_now = date.getDay()
			        
			        					        
			        
			        if (mar_5m == null){
						var is5min = true
					} else {
						let minutes_before_5m = mar_5m.date.getMinutes()
			            let abs_m_5m = Math.abs(minutes_now - minutes_before_5m)
		        	    //console.log("abs_m_5m: ", abs_m_5m);
			     	
						var is5min = abs_m_5m >= 5
					}
					if (mar_15m == null){
						var is15min = true
					} else {
						let minutes_before_15m = mar_15m.date.getMinutes()
			        	let abs_m_15m = Math.abs(minutes_now - minutes_before_15m)
		        	    // console.log("abs_m_15m: ", abs_m_15m);
			     
						var is15min = abs_m_15m >= 15
					}
					if (mar_30m == null){
						var is30min = true
					} else {
						let minutes_before_30m = mar_30m.date.getMinutes()
			        	let abs_m_30m = Math.abs(minutes_now - minutes_before_30m)
			        	// console.log("abs_m_30m: ", abs_m_30m);
			     
						var is30min = abs_m_30m >= 30
					}
					if (mar_60m == null){
						var is60min = true
					} else {
						let hours_before_1h = mar_60m.date.getHours()
			        	let abs_m_60m = Math.abs(hours_now - hours_before_1h)
			        	//console.log("abs_m_60m: ", abs_m_60m);
			     
						var is60min = abs_m_60m >= 1
					}
					if (mar_4h == null){
						
						var is4hour = true
					} else {
						let hours_before_4h = mar_4h.date.getHours()
			        	let abs_m_4h = Math.abs(hours_now - hours_before_4h)
						//console.log("abs_m_4h: ", abs_m_4h);
			     
						var is4hour = abs_m_4h >= 4
					}
					if (mar_1d == null){
						var is1day = true
					} else {
						let days_before_1d = mar_1d.date.getDay()
			        	let abs_m_1d = Math.abs(days_now - days_before_1d)
			        	//console.log("abs_m_1d: ", abs_m_1d);
			     
						is1day = abs_m_1d >= 1
					}
					if (mar_1w == null){
						var is1week = true
					} else {
						let days_before_1w = mar_1w.date.getDay()
			        	let abs_m_1w = Math.abs(days_now - days_before_1w)
			        	//console.log("abs_m_1w: ", abs_m_1w);
			     		//console.log("_________________");
						var is1week = abs_m_1w >= 6
					}
					

			        var market = new Market(
				      {
				        _id: new mongoose.Types.ObjectId(),
		                  host: "systemrammarket",
					      date: date,
					      base: basebal,
					      quote: quotebal,
					      basecurr: "RAM",
					      quotecurr: process.env.CORE_SYMBOL,
					      cost: cost,
					      is1min: true,
					      is5min: is5min,
					      is15min: is15min,
					      is30min: is30min,
				          is60min: is60min,
				          is4hour: is4hour,
				          is1day: is1day, 
				          is1week: is1week
				      }
				    )

				    console.log("RAMMARKET: ", market)
				    market.save()

			    }).catch(e =>{
	  				console.log("err:", e)
			    })   

		  } catch(e){
		  	console.log("err:", e)
		  }
	}




	static async get_post(author, permlink){
		try{
		  
	      var api = await Blockchain.get_api_instance()
		  var postObj = ""
		  var more = true
		  while (more == true){ 
		    var i = 0
		    await api.getTableRows(true, process.env.EOSIO_CONTRACT_ACCOUNT, author, 'comments', 'id', i, -1, 100, "i64", 2).
		      then(data=>{
		        more = data.more
		        i+= 100
		        data.rows.map(element => {
		          if (permlink == element.permlink)
		            {
		              postObj = element;
		            }
		        });
		    })
		      console.log("PostObj from get-post", postObj)
		      return postObj
		  }
		} catch (e){
			console.log("err:", e)
		}
	}


	static async get_balance(owner, id){
		try{
		  
	      var api = await Blockchain.get_api_instance()
		  var BalanceObj = ""
		  var more = true

  		  while (more == true){ 
		    var i = 0
		    await api.getTableRows(true, process.env.EOSIO_CORE_ACCOUNT, owner, 'balance', 'id', i, -1, 1000).
		      then(data=>{
		        more = data.more
		        i+= 100
		        // console.log(data)
		        data.rows.map(element => {
		          if (id == element.id)
		            {
		              BalanceObj = element;
		            }
		        });
		    })
		      // console.log("BalanceObj from get-balance", BalanceObj)
		      return BalanceObj
		  }
		} catch (e){
			console.error("err:", e)
		}
	}

static async get_host(hostname){
		try{
		  
	      var api = await Blockchain.get_api_instance()
		  var BalanceObj = ""
		  var more = true

  		  while (more == true){ 
		    var i = 0
		    await api.getTableRows(true, process.env.EOSIO_CORE_ACCOUNT, process.env.EOSIO_CORE_ACCOUNT, 'hosts', 'username', i, -1, 1000).
		      then(data=>{
		        more = data.more
		        i+= 100
		        // console.log(data)
		        data.rows.map(element => {
		          if (hostname == element.username)
		            {
		              BalanceObj = element;
		            }
		        });
		    })
		      // console.log("BalanceObj from get-balance", BalanceObj)
		      return BalanceObj
		  }
		} catch (e){
			console.error("err:", e)
		}
	}

	static async get_api_instance(){		
		return eosapi;

	}



}

export default Blockchain;






