import { BaseActionWatcher } from 'demux'
import { NodeosActionReader } from 'demux-eos'

import ActionHandler from './ActionHandler'
import { Post, Market, User } from '../../models'
import updaters from './updaters'
import effects from './effects'
import mongoose from 'mongoose'
import Blockchain from '../../utils/Blockchain'
import CMarket from '../../utils/CMarket'

const actionHandler = new ActionHandler(updaters, effects, process.env.MONGODB_URL)

const actionReader = new NodeosActionReader(
  process.env.EOSIO_HTTP_URL,
  parseInt(process.env.EOSIO_STARTING_BLOCK, 10) // First actions relevant to this dapp happen at this block
)

const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  250 // Poll at twice the block interval for less latency
)

async function fetch_markets() {
  Blockchain.get_markets()
  Blockchain.get_ram_market()
}


// setInterval(fetch_markets, 60000);
export default actionWatcher
