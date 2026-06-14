import app from './src/app.js'
import config from './src/config/config.js'
import connectDB from './src/config/db.js'

connectDB()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`Server running on http://localhost:${config.PORT}`)
    })
  })
  .catch((err) => {
    console.error('Startup failed:', err)
    process.exit(1)
  })