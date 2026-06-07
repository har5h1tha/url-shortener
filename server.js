import app from './src/app.js'
import config from './src/config/config.js'
import connectDB from './src/config/db.js'

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server running on http://localhost:${3000}`)
    })
  })
  .catch((err) => {
    console.error('Startup failed:', err)
    process.exit(1)
  })