import createPost from './createpost'
import deletePost from './deletepost'
import editPost from './editpost'
import likePost from './likepost'
import createApprove from './approve'
import regUser from './reguser'

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
  }
]
