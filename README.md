# URL Shortener

A full-stack URL shortener built with Node.js, Express, and MongoDB. Paste a long URL, get a short link with optional custom alias and expiration. Tracks clicks and provides daily analytics.

**Live demo:** https://url-shortener-qlot.onrender.com

> Note: hosted on Render's free tier — the server sleeps after inactivity, so the first request may take ~30 seconds to wake up.

## Features

- Shorten any URL with a randomly generated 7-character code
- Optional custom alias (e.g. `/mygh` instead of `/V1StGXR`)
- Optional link expiration (auto-deleted via MongoDB TTL index)
- Redirects to the original URL on visit (302)
- Click tracking with timestamped click history
- Analytics endpoint with daily click breakdown via aggregation pipeline
- Rate limiting on the shorten endpoint (5 requests/minute per IP)
- Centralized error handling with custom error classes
- Simple frontend served via Express static files
- MVC architecture (routes, controllers, models, middlewares, utils)

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- nanoid (short code generation)
- express-rate-limit
- dotenv
- HTML/CSS/JS frontend

## Setup

1. Clone the repo
2. Run `npm install`
3. Create a `.env` file:
   ```
   MONGO_URI=your_mongodb_atlas_uri
   BASE_URL=http://localhost:3000
   ```
4. Run `npm run dev`
5. Open `http://localhost:3000`

## API Reference

| Method | Endpoint           | Description                                  |
|--------|--------------------|-----------------------------------------------|
| POST   | `/shorten`         | Create a short URL                            |
| GET    | `/:code`           | Redirect to the original URL                  |
| GET    | `/:code/stats`     | Get click count, original URL, created date  |
| GET    | `/:code/analytics` | Get total clicks + daily click breakdown      |

### POST /shorten — Request Body

```json
{
  "url": "https://github.com",
  "alias": "mygh",          // optional
  "expiresInDays": 7          // optional
}
```

### Example Response

```json
{
  "shortUrl": "http://localhost:3000/mygh"
}
```

## Architecture

```
src/
  config/        # env vars and DB connection
  controllers/    # request handlers
  middlewares/    # validation, rate limiting, error handler
  models/         # Mongoose schemas (Url, Click)
  routes/         # route definitions
  utils/          # AppError, catchAsync
public/
  index.html      # frontend UI
server.js         # entry point
```

## What I Learned

- REST API design with Express (routing, middleware, status codes)
- MongoDB schema design, indexes, and TTL-based expiration
- Aggregation pipelines (`$match`, `$group`, `$sort`) for analytics
- Centralized error handling with custom error classes
- Rate limiting and route-level middleware
- Deploying a Node.js app with environment-based configuration
