import mongoose from 'mongoose'
import Blockchain from '../../../../utils/Blockchain.js'


async function approver (state, payload, blockInfo, context) {
  
  console.log("This is approver/disapprover", payload.data)
  //fetch report from bc
   var ReportObj = await Blockchain.get_report_by_id(payload.data.host, payload.data.report_id)
   console.log("REPORTFROMBC:", ReportObj)
   var TaskObj = await Blockchain.get_task(payload.data.host, ReportObj.task_id)

   var BadgeTypeObj = await Blockchain.get_badgetype(TaskObj.badge_type)
     
  try{

    const Report = state.report
    const Badge = state.badge
      //POWER FROM

    console.log("PARAMS:")
    console.log( ReportObj.username)
    console.log( payload.data.host)
    console.log( ReportObj.report_id)
    console.log( process.env.BC )

    Report.findOneAndUpdate({ 
            username: ReportObj.username,
            host: payload.data.host,
            report_id: ReportObj.report_id,
            blockchain: process.env.BC
    }, {
        comment: ReportObj.comment,
        approved: ReportObj.approved,
        need_check: ReportObj.need_check
      }  ).exec()


      // let report = await Report.findOne(
      //     { username: ReportObj.username,
      //       host: procecc.data.host,
      //       report_id: ReportObj.report_id,
      //       blockchain: process.env.BC
      //     }
      // ).exec()

     
        console.log(ReportObj.approved)
        // report.comment = ReportObj.comment
        // report.approveed = ReportObj.approved
        // report.need_check = ReportObj.need_check

        // await report.save() 
        
        
        if (TaskObj.with_badge)
        {
          console.log('oncreateusbadge') 
          let badge = await Badge.findOne(
          { username: ReportObj.username,
            host: payload.data.host,
            badge_type: TaskObj.badge_type,
            blockchain: process.env.BC,
          }).exec()
          
          if (!badge)
          {
              var id = new mongoose.mongo.ObjectId();
  
                var b = new Badge(
                  {
                    _id: id,
                    username: ReportObj.username,
                    blockchain: process.env.BC,
                    host: payload.data.host,
                    badgetype: TaskObj.badge_type,
                    backed: false,
                    backreason: "",
                    caption: BadgeTypeObj.caption,
                    description: BadgeTypeObj.description,
                    iurl : BadgeTypeObj.iurl 
                  }
                )
                await b.save()

          }
        }

} catch(e){
    console.error("error", e)
  }
}

export default approver
