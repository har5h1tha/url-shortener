import { Router } from 'express'
import { shortenUrl, redirectUrl,getStats,getAnalytics } from '../controllers/url.controllers.js'
import validateUrl from '../middlewares/validateUrl.js'
import { shortenLimiter } from '../middlewares/rateLimiter.js'
const urlRouter = Router()



urlRouter.post('/shorten', shortenLimiter, validateUrl, shortenUrl)  // POST to create short URL
urlRouter.get('/:code/stats', getStats) 
urlRouter.get('/:code/analytics', getAnalytics)
urlRouter.get('/:code', redirectUrl)     // GET to redirect

export default urlRouter