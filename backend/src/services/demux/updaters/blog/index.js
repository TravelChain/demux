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
import delshares from './delshares'
import undelshares from './undelshares'
import sellshares from './sellshares'
import setbadge from './setbadge'
import giftbadge from './giftbadge'
import setreport from './setreport'
import editreport from './editreport'
import approver from './approver'
import refreshst from './refreshst'

const account = process.env.EOSIO_CONTRACT_ACCOUNT
const core_account = process.env.EOSIO_CORE_ACCOUNT
const gateway1_account = process.env.GATEWAY1

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
  {
    actionType: `eosio.token::transfer`,
    updater: transfer
  },
  {
    actionType: `faketoken::transfer`,
    updater: transfer
  },
  {
    actionType: `${core_account}::sellshares`,
    updater: sellshares
  },
  {
    actionType: `${core_account}::delshares`,
    updater: delshares
  },
  {
    actionType: `${core_account}::undelshares`,
    updater: undelshares
  },
  {
    actionType: `${core_account}::setbadge`,
    updater: setbadge
  },
  {
    actionType: `${core_account}::giftbadge`,
    updater: giftbadge
  },
  {
    actionType: `${core_account}::refreshst`,
    updater: refreshst
  },
  {
    actionType: `${core_account}::priorenter`,
    updater: refreshst
  },
  
  // {
  //   actionType: `${core_account}::setreport`,
  //   updater: setreport
  // },
  // {
  //   actionType: `${core_account}::editreport`,
  //   updater: editreport
  // },
  // {
  //   actionType: `${core_account}::approver`,
  //   updater: approver
  // },
  // {
  //   actionType: `${core_account}::disapprover`,
  //   updater: approver
  // },
]
