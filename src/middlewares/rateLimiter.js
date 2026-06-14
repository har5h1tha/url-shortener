import rateLimit from 'express-rate-limit'

export const shortenLimiter = rateLimit({
  windowMs: 60 * 1000,   // 1 minute window
  max: 5,                // 5 requests per window per IP
  message: { error: 'Too many requests. Please try again after a minute.' },
  standardHeaders: true, // returns RateLimit-* headers
  legacyHeaders: false
})