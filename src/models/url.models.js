import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema({
  shortCode:   { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
  clicks:      { type: Number, default: 0 },
  expiresAt:   { type: Date, default: null }
}, { timestamps: true })

urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const urlModel= mongoose.model("Url", urlSchema);

export default urlModel;