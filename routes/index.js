const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // initialise empty array for results of db query
  res.render('index');
});

router.get('/test', (req, res) => {
  res.send('hello world');
});

module.exports = router;
