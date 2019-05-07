import mongoose from 'mongoose'
import Blockchain from '../../../../utils/Blockchain.js'


async function setbadge (state, payload, blockInfo, context) {
  
  console.log("This is crbadge", payload.data)

  try{

    const BadgeType = state.badgetype

      //POWER FROM
      let badgetype = await BadgeType.findOne(
          { ownid: payload.data.id,
            host: payload.data.host,
            blockchain: process.env.BC
          }
      ).exec()

      console.log("power", badgetype)
      

      if (badgetype){
        badgetype.ownid = payload.data.id
        badgetype.caption = payload.data.caption
        badgetype.description = payload.data.description
        badgetype.iurl = payload.data.iurl
        badgetype.total = payload.data.total
        badgetype.power = payload.data.power

        await badgetype.save()

      } else {
        var id = new mongoose.mongo.ObjectId();
       
        let badgetype = new BadgeType(
          {
            _id: id,
            ownid: payload.data.id,
            blockchain: process.env.BC,
            host: payload.data.host,
            caption: payload.data.caption,
            description: payload.data.description,
            iurl: payload.data.iurl,
            total: payload.data.total,
            power: payload.data.power
          }
        )   
        await badgetype.save()       
      }

} catch(e){
    console.error("error", e)
  }
}

export default setbadge
