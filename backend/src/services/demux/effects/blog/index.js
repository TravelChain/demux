import createPost from './createpost'
import deletePost from './deletepost'
import editPost from './editpost'
import likePost from './likepost'
import CreateApprove from './approve'
const account = process.env.EOSIO_CONTRACT_ACCOUNT
const blogaccount = "bob.tc"
export default [
  {
    actionType: `${account}::approve`, // account::action name
    effect: CreateApprove
  },
  {
    actionType: `${account}::userreg`,
    effect: deletePost
  },
  {
    actionType: `${account}::editpost`,
    effect: editPost
  },
  {
    actionType: `eosio.token::transfer`,
    effect: likePost
  },
  {
    actionType: `${blogaccount}::post`,
    effect: Post
  },
  {
    actionType: `${blogaccount}::edit`,
    effect: Edit
  },
  {
    actionType: `${blogaccount}::del`,
    effect: Delete
  }
]
