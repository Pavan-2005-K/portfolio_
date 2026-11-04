const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, minlength: 2, maxlength: 100 },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      maxlength: 254,
      match: [emailRegex, 'Email is not valid'],
    },
    subject: { type: String, required: [true, 'Subject is required'], trim: true, minlength: 2, maxlength: 150 },
    message: { type: String, required: [true, 'Message is required'], trim: true, minlength: 10, maxlength: 2000 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model('Contact', contactSchema, 'contacts');
module.exports.emailRegex = emailRegex;
