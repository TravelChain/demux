import mongoose from 'mongoose'
import CMarket from '../../../../utils/CMarket.js'


async function refreshst (state, payload, blockInfo, context) {
  console.log(";     this is refreshst", payload.data)
  
  try {
      CMarket.fetch_core_market(state, blockInfo, payload.data.host)
  }
  catch (err) {
    console.error(err)
  }
}

export default refreshst
