import urlModel from '../models/url.models.js'
import config from '../config/config.js'

import { nanoid } from 'nanoid'


export async function shortenUrl(req, res) {
  const { url } = req.body

  if (!url) return res.status(400).json({ error: 'url is required' })

  // validate it's an actual URL
    try { 
        new URL(url)
    } catch {
        return res.status(400).json({ 
            error: 'Invalid URL format'
        })
    }

    const shortCode = nanoid(7)
    await urlModel.create({ 
        shortCode,
        originalUrl: url
        })

  res.status(201).json({
    shortUrl: `${config.BASE_URL}/${shortCode}`
  })
}

export async function redirectUrl(req, res) {
  const { code } = req.params

  const entry = await urlModel.findOneAndUpdate(
    { shortCode: code },
    { $inc: { clicks: 1 } },  // count every visit
    { new: true }
  )

  if (!entry) return res.status(404).json({ error: 'URL not found' })

  res.redirect(entry.originalUrl)
}