import express from 'express';
import urlRouter from './routers/url.router.js';
import errorHandler from './middlewares/error.middleware.js'


const app=express();

app.use(express.json())

app.use('/',urlRouter)
app.use(errorHandler) 

export default app;