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
  orginizationID BIGINT FORIEGN KEY,
);

CREATE TABLE orginization(
  orginizationID SERIAL PRIMARY KEY,
  name VARCHAR(50),
);

* */

client.connect();

router.get('/', (req, res) => {
  // initialise empty array for results of db query
  res.render('index');
});

router.get('/change', (req, res) => {
  // initialise empty array for results of db query
  client.query('DELETE FROM Asset').then((result) => {
    res.send(result);
  });
  // res.render('index');
});

/*
INSERT asset into database

INSERT INTO Asset (assetName, assetX, assetY)
VALUES ('testAsset', 51.34343, 0.923132);
*/
router.post('/insert/asset', (req, res) => {
  console.log(req.body.name);
  client.query(`INSERT INTO Asset (assetName, assetX, assetY,orginizationID) VALUES ('${req.body.name}', ${req.body.assetX}, ${req.body.assetY}, ${req.body.orginizationID})`)
    .then((result) => {
      console.log(result.rows[0]);
      res.send(result);
    })
    .catch((e) => {
      console.error(e.stack);
      res.send(e);
    });
});

// SELECT * FROM orginization'
// ALTER TABLE orginization RENAME TO Orginization
router.get('/:orginization/assets', (req, res) => {
  console.log(`SELECT * FROM Asset WHERE orginizationID=(SELECT orginizationID FROM orginization WHERE name='${req.params.orginization}')`);
  client.query(`SELECT * FROM Asset WHERE orginizationID=(SELECT orginizationID FROM orginization WHERE name='${req.params.orginization}')`).then((result) => {
    res.send(result);
  });
});

router.post('/insert/orginization', (req, res) => {
  console.log(req.body.name);
  client.query(`INSERT INTO orginization (name) VALUES ('${req.body.name}')`)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((e) => {
      console.error(e.stack);
      res.send(e);
    });
});

router.get('/assets', (req, res) => {
  client.query('SELECT * FROM Asset')
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((e) => {
      console.error(e.stack);
      res.send(e);
    });
});

router.get('/orginization', (req, res) => {
  client.query('SELECT * FROM orginization')
    .then((result) => {
      console.log(result);
      res.send(result);
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
