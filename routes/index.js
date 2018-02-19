const express = require('express');
const { Client } = require('pg');
const request = require('request');

const router = express.Router();

// connect to the postgres database
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

const options = {
  method: 'POST',
  url: 'https://app79553870.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body:
   {
     grant_type: 'client_credentials',
     client_id: 'fDeYbcz6ZMDRhr4iVkNK5hubFdOFr3yF',
     client_secret: '6gPLWTrbu8ClXv1ZqW-xZfVOZtBvfkgHOLqSPRie9PIZuzFcXmDnnmffdsi2_W4O',
     audience: 'https://app79553870.auth0.com/api/v2/',
   },
  json: true,
};

const userRequest = {
  method: 'GET',
  url: 'https://app79553870.auth0.com/api/v2/users',
  headers: {
    authorization: '',
    'content-type': 'application/json',
  },
};
/**
Create database tables
// user table already defined so AppUser used instead
CREATE TABLE AppUser(
  userID VARCHAR(50) PRIMARY KEY,
  organizationID BIGINT FORIEGN KEY,
  verified boolean,
);


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
// CREATE TABLE AppUser (userID VARCHAR(50) PRIMARY KEY,organizationID BIGINT,verified boolean)
router.get('/change', (req, res) => {
  client.query('SELECT * FROM AppUser').then((result) => {
    res.send(result);
  });
});

/*
Delete routes
*/
router.delete('/delete/:assetID', (req, res) => {
  client.query(`DELETE FROM Asset WHERE assetID=${req.params.assetID}`).then((result) => {
    res.send(result);
  });
});

router.delete('/delete/dataType/:dataTypeID', (req, res) => {
  client.query(`DELETE FROM DataType WHERE dataTypeID=${req.params.dataTypeID}`).then((result) => {
    res.send(result);
  });
});

/*
INSERT routes
*/

router.post('/:organization/insert/user', (req, res) => {
  console.log(req.body);
  client.query(`INSERT INTO AppUser (userID, organizationID, verified) VALUES ('${req.body.userId}',${req.body.orgId},FALSE)`)
    .then((result) => {
      console.log(result.rows[0]);
      res.send(result);
    });
});

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
router.post('/insert/datatype', (req, res) => {
  console.log(req.body);
  client.query(`INSERT INTO DataType (dataName, dataUnit) VALUES ('${req.body.name}','${req.body.unit}')`).then((result) => {
    res.send(result);
  });
});


// INSERT a datapoint for an asset
router.post('/insert/asset/:assetID/datapoint/datatype/:dataTypeID', (req, res) => {
  console.log(req.body);
  client.query(`INSERT INTO DataPoint (timeStamp, data,assetID,dataTypeID) VALUES ('${req.body.time}','${req.body.data}',${req.params.assetID},${req.params.dataTypeID})`).then((result) => {
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
// request users from Auth0 mangment API
router.get('/auth/users', (req, res) => {
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    const token = body.access_token;
    userRequest.headers.authorization = `Bearer ${token}`;
    request(userRequest, (err, respon, b) => {
      if (error) throw new Error(err);
      // console.log(b);
      res.send(b);
    });
  });
});

// SELECT all AppUsers
router.get('/appuser', (req, res) => {
  client.query('SELECT * FROM AppUser').then((result) => {
    res.send(result);
  });
});

// SELECT all assets owned by an orginization
router.get('/:orginization/assets', (req, res) => {
  console.log(`SELECT * FROM Asset WHERE orginizationID=(SELECT orginizationID FROM orginization WHERE name='${req.params.orginization}')`);
  client.query(`SELECT * FROM Asset WHERE orginizationID=(SELECT orginizationID FROM orginization WHERE name='${req.params.orginization}')`).then((result) => {
    res.send(result);
  });
});

// SELECT asset where the assetID matches
router.get('/asset/:id', (req, res) => {
  client.query(`SELECT * FROM Asset WHERE assetID=${req.params.id}`).then((result) => {
    res.send(result);
  });
});

router.get('/asset/:id/datapoints', (req, res) => {
  client.query(`SELECT * FROM DataPoint WHERE assetID=${req.params.id}`).then((result) => {
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
router.get('/dataType', (req, res) => {
  client.query('SELECT * FROM DataType').then((result) => {
    res.send(result);
  });
});

// SELECT all datapoints
router.get('/datapoints', (req, res) => {
  client.query('SELECT * FROM DataPoint').then((result) => {
    res.send(result);
  });
});

/* Update routes */
router.put('/:organization/appuser/:userID', (req, res) => {
  // const userID = req.params.userID.replace('%7C', '|');
  // console.log(userID);
  client.query(`UPDATE AppUser SET organizationID=${req.params.organization} WHERE userID='${req.params.userID}'`).then((result) => {
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
