const validateUrl = (req, res, next) => {
   const { url, alias, expiresInDays } = req.body

  if (!url) return res.status(400).json({ error: 'url is required' })

  try { new URL(url) } catch {
    return res.status(400).json({ error: 'Invalid URL format' })
  }

   if (alias && !/^[a-zA-Z0-9_-]{3,20}$/.test(alias)) {
    return res.status(400).json({ error: 'Alias must be 3-20 chars, letters/numbers/_/- only' })
  }

  if (expiresInDays && (typeof expiresInDays !== 'number' || expiresInDays <= 0)) {
    return res.status(400).json({ error: 'expiresInDays must be a positive number' })
  }

  next()
}

export default validateUrl