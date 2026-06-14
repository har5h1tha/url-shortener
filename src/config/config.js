import dotenv from 'dotenv'

dotenv.config()

if(!process.env.MONGO_URI)
    throw new Error("db not FOUND")

const config ={
    MONGO_URI:process.env.MONGO_URI,
    PORT: process.env.PORT || 3000,
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000'
}
export default config