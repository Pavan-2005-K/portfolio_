const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contact');

const app = express();

app.set('trust proxy', 1); // Trust the hosting proxy for correct client IPs in rate limiting
app.disable('x-powered-by');
app.use(helmet());

const allowed = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim().replace(/\/$/, ''))
  .filter(Boolean);

function isLocalDevelopmentOrigin(origin) {
  if (process.env.NODE_ENV !== 'development') return false;

  try {
    const url = new URL(origin);
    return (
      (url.protocol === 'http:' || url.protocol === 'https:') &&
      ['localhost', '127.0.0.1'].includes(url.hostname)
    );
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin(origin, cb) {
      // Allow same-origin / curl, configured frontends, and local dev servers.
      if (!origin || allowed.includes(origin) || isLocalDevelopmentOrigin(origin)) return cb(null, true);
      cb(null, false);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    maxAge: 600,
  })
);

app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    status: 'ok',
    database: states[mongoose.connection.readyState] || 'unknown',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/contact', contactRoutes);

app.use('/api', (req, res) => res.status(404).json({ success: false, message: 'Not found' }));

// Central error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Invalid JSON' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ success: false, message: 'Request too large' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: 'Invalid input' });
  }
  console.error('Unhandled error:', err.message);
  res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
});

module.exports = app;
