const express = require('express');
const { Crypto } = require('../database/index');

const router = express.Router();

router.get('/cryptoData', async (req, res) => {
  try {
    const data = await Crypto.find().limit(10);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;