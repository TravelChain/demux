import mongoose from 'mongoose'
import Blockchain from '../../../../utils/Blockchain.js'


async function withdraw (state, payload, blockInfo, context) {
  console.log(payload.data)
  // var BalanceObj = await Blockchain.get_balance(payload.data.username, payload.data.balance_id)
  
  const Balance = state.balance
  var blockchain = process.env.BC

  try {
    
    let balance = await Balance.findOne(
        {
          username: payload.data.username,
          host: payload.data.host,
          ownid: payload.data.balance_id,
          withdrawed: false,
          blockchain: blockchain
        }
    ).exec()
    console.log("FOUNDED OBJ on WITHDRAW,", balance)
    // // if post already exists do not insert it in again
    
    if (balance) {
      //UPDATE
      console.log('ON UPDATE')
      balance.withdrawed = true

      await balance.save()

    }
  }
  catch (err) {
    console.error(err)
  }
}

export default withdraw
