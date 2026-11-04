require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI. Copy .env.example to .env and fill it in.');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI, { dbName: 'portfolio', serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log('MongoDB connected (database: portfolio)');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
