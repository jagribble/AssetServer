const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const index = require('./routes/index');


const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://app79553870.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://assetar-stg.herokuapp.com/',
  issuer: 'https://app79553870.auth0.com/',
  algorithms: ['RS256'],
});

console.log(`Google API key = ${process.env.GOOGLE_API_KEY}`);
console.log('running app.js');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

if (process.env.AUTH === 'true') {
  app.use('/api', jwtCheck, index);

  app.use('/check', jwtCheck, (req, res, next) => {
    res.send('successful');
    next();
  });
} else {
  app.use('/api', index);
}

app.use('/', (req, res) => {
  res.render('index');
});
//
//
// app.get('/test', (req, res) => {
//   // initialise empty array for results of db query
//   res.send('hello');
// });
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


module.exports = app;
