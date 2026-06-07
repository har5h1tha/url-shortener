import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import urlRouter from './routers/url.router.js';


const app=express();

app.use(express.json())

app.use('/',urlRouter)


export default app;