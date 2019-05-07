import mongoose from 'mongoose'
import Blockchain from '../../../../utils/Blockchain.js'


async function editreport (state, payload, blockInfo, context) {
  
  console.log("This is editreport", payload.data)
  //fetch report from bc
   let ReportObj = await Blockchain.get_report_by_id(payload.data.host, payload.data.report_id, payload.data.username)
     
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
        report.data = payload.data.data

        await report.save() 
        

      } else {
        console.error("REPORT IS NOT FOUND")
        return     
      }

} catch(e){
    console.error("error", e)
  }
}

export default editreport
