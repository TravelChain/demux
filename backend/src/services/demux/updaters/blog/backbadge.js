import mongoose from 'mongoose'
import Blockchain from '../../../../utils/Blockchain.js'


async function backbadge (state, payload, blockInfo, context) {
//       console.log("This is backbadge", payload.data)
//       let BadgeObj = await Blockchain.get_badge(payload.data.username, payload.data.badge_id)
      
//       let BadgeTypeObj = await Blockchain.get_badgetype(payload.data.host, payload.data.badge_type)
      
//     console.log("This is BadgeTypeObj", BadgeTypeObj)
//   try{

//     const Badge = state.badge
//     const BadgeType = state.badgetype

//       //POWER FROM
      
     
//       let badgetype = await BadgeType.findOne(
//           { ownid: BadgeTypeObj.id,
//             username: payload.data.username,
//             host: payload.data.host,
//             blockchain: process.env.BC
//           }
//       ).exec()

//         badgetype.remain = BadgeTypeObj.remain;
//         await badgetype.save()  
      
//       let badge = await Badge.findOne(
//           { ownid: payload.data.badge_id,
//             username: payload.data.username,
//             host: payload.data.host,
//             blockchain: process.env.BC
//           }
//       ).exec()

        
//         let badge = new Badge(
//           {
//             username: payload.data.to,
//             blockchain: process.env.BC,
//             host: payload.data.host,
//             comment: payload.data.comment,
//             badgetype: payload.data.badge_type,
//             backed: false,
//             backreason: '',
//           }
//         )   
//         await badge.save()  



// } catch(e){
//     console.error("error", e)
//   }
}

export default giftbadge
