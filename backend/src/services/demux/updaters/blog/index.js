import createPost from './createpost'
import deletePost from './deletepost'
import editPost from './editpost'
import likePost from './likepost'
import createApprove from './approve'

const account = process.env.EOSIO_CONTRACT_ACCOUNT
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
  }
]
