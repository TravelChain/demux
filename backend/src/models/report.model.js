import mongoose from 'mongoose'

const { Schema } = mongoose

let Report = null

try {
  const ReportSchema = new Schema({
   
    _id: mongoose.Schema.Types.ObjectId,
      report_id: Number,
      task_id: Number,
      goal_id: Number,
      username: String,
      curator: String,
      data: String,
      requested: String,
      need_check: Boolean,
      approved: Boolean,
      comment: String,
      blockchain: String,
      
  })
  Report = mongoose.model('Report', ReportSchema)
} catch (e) {
  Report = mongoose.model('Report')
}

export default Report
