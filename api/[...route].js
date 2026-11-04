const mongoose = require('mongoose');
const app = require('../backend/src/app');

let connectionPromise;

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) return;
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured');

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGODB_URI, {
        dbName: 'portfolio',
        serverSelectionTimeoutMS: 10000,
      })
      .finally(() => {
        connectionPromise = null;
      });
  }

  await connectionPromise;
}

module.exports = async function handler(req, res) {
  try {
    if (req.method !== 'OPTIONS') await connectToDatabase();
    app(req, res);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
      success: false,
      message: 'Database unavailable. Please try again later.',
    }));
  }
};

