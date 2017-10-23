const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // initialise empty array for results of db query
  res.render('index');
});

router.get('/test', (req, res) => {
  res.send('hello world');
});

router.get('/getAssets', (req, res) => {
  res.json({ asstes: [{ name: 'test', location: { x: 50.1, y: 201.234243 } }] });
});

module.exports = router;
