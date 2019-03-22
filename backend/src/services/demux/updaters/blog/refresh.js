import mongoose from 'mongoose'
import Blockchain from '../../../../utils/Blockchain.js'


async function refresh (state, payload, blockInfo, context) {
  console.log(";     this is refresh", payload.data)
  
  var BalanceObj = await Blockchain.get_balance(payload.data.username, payload.data.balance_id)
  console.log(BalanceObj)
  //var postObj = await Blockchain.get_post(payload.data.author, payload.data.permlink)
  const Balance = state.balance

  try {
    
    let balance = await Balance.findOne(
        { username: payload.data.username,
          host: BalanceObj.host,
          ownid: payload.data.balance_id,
          withdrawed: false}
    ).exec()
    console.log("FOUNDED OBJ,", balance)
    // // if post already exists do not insert it in again
    
    if (balance) {
      //UPDATE
      console.log("THIS IS UPDATE")
      balance.quants_for_sale = BalanceObj.quants_for_sale
      balance.next_quants_for_sale = BalanceObj.next_quants_for_sale
      balance.win = BalanceObj.win
      balance.available = BalanceObj.available
      balance.forecasts = BalanceObj.forecasts
      balance.ref_amount = BalanceObj.ref_amount
      balance.sys_amount = BalanceObj.sys_amount
      balance.last_recalculated_win_pool_id = BalanceObj.last_recalculated_win_pool_id

      await balance.save()

    } else {
      //NEW    
      var id = new mongoose.mongo.ObjectId();
      console.log("NEW", id)
      let balance = new Balance(
        {
          _id: id,
            ownid: BalanceObj.id,
            username: payload.data.username,
            host: BalanceObj.host,
            chost: BalanceObj.chost,
            cycle_num: BalanceObj.cycle_num,
            pool_num: BalanceObj.pool_num,
            global_pool_id: BalanceObj.global_pool_id,
            quants_for_sale: BalanceObj.quants_for_sale,
            next_quants_for_sale: BalanceObj.next_quants_for_sale,
            last_recalculated_win_pool_id: BalanceObj.last_recalculated_win_pool_id,
            win: BalanceObj.win,
            pool_color: BalanceObj.pool_color,
            available: BalanceObj.available,
            purchase_amount: BalanceObj.purchase_amount,
            withdrawed: BalanceObj.withdrawed,
            forecasts: BalanceObj.forecasts,
            ref_amount: BalanceObj.ref_amount,
            sys_amount: BalanceObj.sys_amount,
            meta: BalanceObj.meta

        }
      )
      await balance.save()

    } 
  }
  catch (err) {
    console.error(err)
  }
}

export default refresh
