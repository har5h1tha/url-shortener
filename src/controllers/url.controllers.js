import urlModel from '../models/url.models.js'
import config from '../config/config.js'

import { nanoid } from 'nanoid'

import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/AppError.js'


export const shortenUrl = catchAsync(async (req, res) => {
  const { url, alias, expiresInDays } = req.body

  let shortCode = alias || nanoid(7)

  if (alias) {
    const existing = await urlModel.findOne({ shortCode: alias })
    if (existing) throw new AppError('Alias already in use', 409)
  }

  let expiresAt = null
  if (expiresInDays) {
    expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
  }

  await urlModel.create({ 
    shortCode, 
    originalUrl: url ,
    expiresAt 
  })

  res.status(201).json({ 
    shortUrl: `${config.BASE_URL}/${shortCode}` 
  })
})


export const redirectUrl = catchAsync(async (req, res) => {
   const { code } = req.params

    const entry = await urlModel.findOne({ shortCode: code })

    if (!entry) throw new AppError('Short URL not found', 404)

    if (entry.expiresAt && entry.expiresAt < new Date()) {
      throw new AppError('This link has expired', 410)
    }

    entry.clicks += 1
    await entry.save()

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
    createdAt: entry.createdAt,
    expiresAt: entry.expiresAt
  })
})