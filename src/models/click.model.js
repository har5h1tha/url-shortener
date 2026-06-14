import mongoose from 'mongoose'

const clickSchema = new mongoose.Schema({
  shortCode: { type: String, required: true, index: true },
  ip:        { type: String },
  userAgent: { type: String },
  referrer:  { type: String }
}, { timestamps: true })

export default mongoose.model('Click', clickSchema)