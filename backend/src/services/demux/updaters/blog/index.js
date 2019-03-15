import createPost from './createpost'
import deletePost from './deletepost'
import editPost from './editpost'
import likePost from './likepost'
import createApprove from './approve'
import regUser from './reguser'
import withdraw from './withdraw'
import refresh from './refresh'
import transfer from './transfer'
import start from './start'
import profupdate from './profupdate'

const account = process.env.EOSIO_CONTRACT_ACCOUNT
const core_account = process.env.EOSIO_CORE_ACCOUNT
export default [
  {
    actionType: `${account}::post`, // account::action name
    updater: createPost
  },
  {
    actionType: `${account}::edit`,
    updater: editPost
  },
  {
    actionType: `${account}::del`,
    updater: deletePost
  },
  {
    actionType: `${core_account}::reg`,
    updater: regUser
  },
  {
    actionType: `${core_account}::withdraw`,
    updater: withdraw
  },
  {
    actionType: `${core_account}::refreshbal`,
    updater: refresh
  },
  {
    actionType: `${core_account}::start`,
    updater: start
  },
  {
    actionType: `${core_account}::profupdate`,
    updater: profupdate
  },
  // {
  //   actionType: `eosio.token::transfer`,
  //   updater: transfer
  // },
]
