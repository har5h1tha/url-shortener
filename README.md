A URL shortener built with Node.js, Express, and MongoDB Atlas. Paste a long URL, get a short link. Tracks click count on every redirect.

## Features
- Shorten any URL with a randomly generated 7-character code
- Redirects to the original URL on visit
- Tracks click count per short link
- MVC architecture (routes, controllers, models)
- MongoDB Atlas for persistent storage

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- nanoid (short code generation)
- dotenv

## Setup
1. Clone the repo
2. Run `npm install`
3. Create a `.env` file:
4. Run `npm run dev`

## API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/shorten` | Shorten a long URL |
| GET | `/:code` | Redirect to original URL |
