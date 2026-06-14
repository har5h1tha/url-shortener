import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import urlRouter from './routers/url.router.js'
import errorHandler from './middlewares/error.middleware.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))  // serve frontend
app.use('/', urlRouter)
app.use(errorHandler)

export default app