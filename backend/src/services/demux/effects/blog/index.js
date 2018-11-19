import createPost from './createpost'
import deletePost from './deletepost'
import editPost from './editpost'

const account = process.env.EOSIO_CONTRACT_ACCOUNT

export default [
  {
    actionType: `${account}::post`,
    effect: createPost
  },
  {
    actionType: `${account}::edit`,
    effect: editPost
  },
  {
    actionType: `${account}::del`,
    effect: deletePost
  }
]
