import { Router } from 'express'
import { shortenUrl, redirectUrl } from '../controllers/url.controllers.js'

const urlRouter = Router()

urlRouter.post('/shorten', shortenUrl)   // POST to create short URL
urlRouter.get('/:code', redirectUrl)     // GET to redirect

export default urlRouter