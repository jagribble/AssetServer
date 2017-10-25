const express = require('express');
const { Client } = require('pg');

const router = express.Router();

// connect to the postgres database
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});


/**
Create database tables

CREATE TABLE Asset(
  assetID SERIAL PRIMARY KEY,
  assetName VARCHAR(50).
  assetX FLOAT(13),
  assetY FLOAT(13),
);
* */

client.connect();

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
