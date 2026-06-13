import urlModel from '../models/url.models.js'
import config from '../config/config.js'

import { nanoid } from 'nanoid'

import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/AppError.js'


export const shortenUrl = catchAsync(async (req, res) => {
  const { url } = req.body
  const shortCode = nanoid(7)

  await urlModel.create({ 
    shortCode, 
    originalUrl: url 
  })

  res.status(201).json({ 
    shortUrl: `${config.BASE_URL}/${shortCode}` 
  })
})


export const redirectUrl = catchAsync(async (req, res) => {
  const { code } = req.params

  const entry = await urlModel.findOneAndUpdate(
    { shortCode: code },
    { $inc: { clicks: 1 } },
    { returnDocument: 'after' }
  )

  if (!entry) throw new AppError('Short URL not found', 404)

  res.redirect(entry.originalUrl)
})

export const getStats = catchAsync(async (req, res) => {
  const { code } = req.params

  const entry = await urlModel.findOne({ shortCode: code })

  if (!entry) throw new AppError('Short URL not found', 404)

  res.status(200).json({
    shortCode: entry.shortCode,
    originalUrl: entry.originalUrl,
    clicks: entry.clicks,
    createdAt: entry.createdAt
  })
})