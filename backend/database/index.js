const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/cryptoData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Database connected successfully');
});

db.on('error', (err) => {
  console.error('Database connection error:', err);
});

// Schema for storing crypto data
const cryptoSchema = new mongoose.Schema({
  name: String,
  last: String,
  buy: String,
  sell: String,
  volume: String,
  base_unit: String,
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = { db, Crypto };
