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

Using data examples from https://www.gouldspumps.com/ittgp/medialibrary/goulds/website/Literature/White%20Papers/smart_pumping_system.pdf?ext=.pdf
CREATE TABLE DataType(
  dataTypeID SERIAL PRIMARY KEY,
  dataName VARCHAR(50),
  dataUnit VARCHAR(10),
);

CREATE TABLE DataPoint(
  dataPointID SERIAL PRIMARY KEY,
  timeStamp TIMESTAMP,
  data VARCHAR(50),
  assetID INT FORIEGN KEY,
  dataTypeID INT FORIEGN KEY
)
* */

client.connect();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/change', (req, res) => {
  client.query('CREATE TABLE DataPoint(dataPointID SERIAL PRIMARY KEY,timeStamp TIMESTAMP,data VARCHAR(50),assetID INT ,dataTypeID INT)').then((result) => {
    res.send(result);
  });
});

/*
Delete routes
*/
router.delete('/delete/:assetID',(req,res)=>{
  client.query(`DELETE FROM Asset WHERE assetID=${req.params.assetID}`).then((result)=>{
    res.send(result);
  });
});

/*
INSERT routes
*/
// INSERT asset refering to an orginazarion
router.post('/:orginization/insert/asset', (req, res) => {
  client.query(`SELECT orginizationID FROM orginization WHERE name='${req.params.orginization}'`).then((organization) => {
    console.log(organization);
    client.query(`INSERT INTO Asset (assetName, assetX, assetY,orginizationID) VALUES ('${req.body.name}', ${req.body.assetX}, ${req.body.assetY}, ${organization.rows[0].orginizationid})`)
      .then((result) => {
        console.log(result.rows[0]);
        res.send(result);
      });
  });
});

router.post('/insert/asset', (req, res) => {
  client.query(`INSERT INTO Asset (assetName, assetX, assetY,orginizationID) VALUES ('${req.body.name}', ${req.body.assetX}, ${req.body.assetY}, ${req.body.orginizationID})`)
    .then((result) => {
      console.log(result.rows[0]);
      res.send(result);
    });
});

// INSERT a data type refering to an asset
router.post('/intert/datatype', (req, res) => {
  client.query(`INSERT INTO Data (dataName, dataUnit) VALUES ('${req.body.name}','${req.body.unit}'`).then((result) => {
    res.send(result);
  });
});

// INSERT a datapoint for an asset
router.post('/insert/asset/:assetID/datapoint/datatype/:dataTypeID', (req, res) => {
  client.query(`INSERT INTO DataPoint (timeStamp, data,assetID,dataTypeID) VALUES (${req.body.time},${req.body.data},${req.params.assetID},${req.params.dataTypeID})`).then((result) => {
    res.send(result);
  });
});

// INSERT an organization
router.post('/insert/orginization', (req, res) => {
  console.log(req.body.name);
  client.query(`INSERT INTO orginization (name) VALUES ('${req.body.name}')`)
    .then((result) => {
      console.log(result);
      res.send(result);
    });
});
/*
SELECT routes
*/
// SELECT all assets owned by an orginization
router.get('/:orginization/assets', (req, res) => {
  console.log(`SELECT * FROM Asset WHERE orginizationID=(SELECT orginizationID FROM orginization WHERE name='${req.params.orginization}')`);
  client.query(`SELECT * FROM Asset WHERE orginizationID=(SELECT orginizationID FROM orginization WHERE name='${req.params.orginization}')`).then((result) => {
    res.send(result);
  });
});

// SELECT asset where the assetID matches
router.get('/:orginization/asset/:id', (req, res) => {
  client.query(`SELECT * FROM Asset WHERE assetID=${req.params.id}`).then((result) => {
    res.send(result);
  });
});

// SELECT ALL assets
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

// SELECT ALL orginization
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

// SELECT all data types
router.get('/data', (req, res) => {
  client.query('SELECT * FROM Data').then((result) => {
    res.send(result);
  });
});

// SELECT all datapoints
router.get('/datapoints', (req, res) => {
  client.query('SELECT * FROM DataPoint').then((result) => {
    res.send(result);
  });
});


module.exports = router;
