import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema({
  shortCode:   { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
  clicks:      { type: Number, default: 0 }
}, { timestamps: true })


const urlModel= mongoose.model("Url", urlSchema);

export default urlModel;