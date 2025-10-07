/*
 * Express middleware server for Jaydin Morrison's portfolio.
 *
 * This server performs three primary functions:
 *  1. Applies security hardening via Helmet and prevents basic XSS attacks via xss-clean.
 *  2. Enforces HTTP Basic authentication on all routes using credentials defined in environment variables.
 *  3. Proxies API requests to the underlying Django service, rewriting the `/api` prefix.  A dedicated
 *     `/api/contact` handler is provided to illustrate how to intercept and customise proxied requests.
 *
 * In production the middleware also serves the compiled Vue frontend from `../frontend/dist`.
 */

const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const basicAuth = require('express-basic-auth')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')
const fetch = require('node-fetch')
require('dotenv').config()

const app = express()

// Apply security middlewares
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(xss())

// Configure basic authentication
const users = {}
if (!process.env.BASIC_AUTH_USER || !process.env.BASIC_AUTH_PASS) {
  console.warn('WARNING: BASIC_AUTH_USER or BASIC_AUTH_PASS not set. All requests will be denied.')
}
users[process.env.BASIC_AUTH_USER] = process.env.BASIC_AUTH_PASS
app.use(
  basicAuth({
    users,
    challenge: true,
    unauthorizedResponse: () => ({ error: 'Authentication required.' }),
  }),
)

// Base URL of the Django API, including the /api prefix
const djangoApiUrl = process.env.DJANGO_API_URL || 'http://localhost:8000/api'

// Proxy all /api requests to Django, removing the /api prefix
app.use(
  '/api',
  createProxyMiddleware({
    target: djangoApiUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  }),
)

// Example of intercepting a specific endpoint (contact form)
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields.' })
  }
  try {
    const response = await fetch(`${djangoApiUrl}/contact/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
    const data = await response.json()
    return res.status(response.status).json(data)
  } catch (err) {
    console.error('Error forwarding contact form', err)
    return res.status(500).json({ error: 'Internal server error.' })
  }
})

// Serve the compiled frontend in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  const distDir = path.join(__dirname, '../frontend/dist')
  app.use(express.static(distDir))
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Middleware server listening on port ${PORT}`)
})