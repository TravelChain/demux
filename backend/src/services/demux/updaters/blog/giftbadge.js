import mongoose from 'mongoose'
import Blockchain from '../../../../utils/Blockchain.js'


async function giftbadge (state, payload, blockInfo, context) {
      console.log("This is giftbadge", payload.data)
      let BadgeTypeObj = await Blockchain.get_badgetype(payload.data.host, payload.data.badge_type)
      
    console.log("This is BadgeTypeObj", BadgeTypeObj)
  try{

    const Badge = state.badge
    const BadgeType = state.badgetype

      //POWER FROM
      
     
      let badgetype = await BadgeType.findOne(
          { ownid: payload.data.badge_type,
            host: payload.data.host,
            blockchain: process.env.BC
          }
      ).exec()

        badgetype.remain = BadgeTypeObj.remain;
        await badgetype.save()  
      
      var id = new mongoose.mongo.ObjectId();
        console.log("imonemplace", BadgeTypeObj)
        
        let badge = new Badge(
          {
            _id: id,
            username: payload.data.to,
            blockchain: process.env.BC,
            host: payload.data.host,
            comment: payload.data.comment,
            badgetype: payload.data.badge_type,
            backed: false,
            backreason: '',
          }
        )   
        await badge.save()  



} catch(e){
    console.error("error", e)
  }
}

export default giftbadge
