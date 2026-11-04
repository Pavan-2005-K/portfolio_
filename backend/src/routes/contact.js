const express = require('express');
const rateLimit = require('express-rate-limit');
const Contact = require('../models/Contact');
const { validateContact } = require('../validate');

const router = express.Router();

// Max 5 submissions per IP per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many messages sent. Please try again later.' },
});

// POST /api/contact  (write-only: there is deliberately no GET route)
router.post('/', limiter, async (req, res, next) => {
  try {
    const body = req.body || {};

    // Honeypot: real users never fill this hidden "botcheck" field. Pretend success so bots learn nothing.
    if (body.botcheck) {
      return res.status(201).json({ success: true, message: 'Thanks! Your message was sent.' });
    }

    const { errors, values } = validateContact(body);
    if (Object.keys(errors).length) {
      return res.status(400).json({ success: false, message: Object.values(errors)[0], errors });
    }

    await Contact.create(values);
    res.status(201).json({ success: true, message: 'Thanks! Your message was sent.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
