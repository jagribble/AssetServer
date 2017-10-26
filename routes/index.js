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

/*
INSERT asset into database

INSERT INTO Asset (assetName, assetX, assetY)
VALUES ('testAsset', 51.34343, 0.923132);
*/
router.post('/insert', (req, res) => {
  console.log(req.body.name);
  client.query(`INSERT INTO Asset (assetName, assetX, assetY) VALUES ('${req.body.name}', ${req.body.assetX}, ${req.body.assetY})`)
    .then((result) => {
      console.log(result.rows[0]);
      res.send(result);
    })
    .catch((e) => {
      console.error(e.stack);
      res.send(e);
    });
});


router.get('/selectAsset', (req, res) => {
  client.query('SELECT * FROM Asset')
    .then((result) => {
      console.log(result.rows[0]);
      res.send(result.rows);
    })
    .catch((e) => {
      console.error(e.stack);
      res.send(e);
    });
});

router.get('/getAssets', (req, res) => {
  res.json({ asstes: [{ name: 'test', location: { x: 50.1, y: 201.234243 } }] });
});

module.exports = router;
