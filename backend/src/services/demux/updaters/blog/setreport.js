import mongoose from 'mongoose'
import Blockchain from '../../../../utils/Blockchain.js'


async function setreport (state, payload, blockInfo, context) {
  
  console.log("This is setreport", payload.data)
  //fetch report from bc
   let ReportObj = await Blockchain.get_report(payload.data.host, payload.data.task_id, payload.data.username)
     
  try{

    const Report = state.report

      //POWER FROM
      let report = await Report.findOne(
          { username: ReportObj.username,
            report_id: ReportObj.report_id,
            blockchain: process.env.BC
          }
      ).exec()

      console.log("report", report)
      

      if (report){
        return

      } else {
        var id = new mongoose.mongo.ObjectId();
       
        let report = new Report(
          {
            _id: id,
            report_id: ReportObj.report_id,
            goal_id: ReportObj.goal_id,
            task_id: ReportObj.task_id,
            blockchain: process.env.BC,
            host: ReportObj.host,
            username: ReportObj.username,
            curator: ReportObj.curator,
            requested: ReportObj.requested,
            need_check: ReportObj.need_check,
            approved: ReportObj.approved,
            comment: ReportObj.comment,
            data: ReportObj.data,
            
          }
        )   
        await report.save()       
      }

} catch(e){
    console.error("error", e)
  }
}

export default setreport
