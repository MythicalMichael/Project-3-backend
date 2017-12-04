var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);

app.use((req, res) => {
  res.status(404);
  res.json({error: 'Page not found'});
});

// error handler
app.use((err, req, res, next) => {
  console.log('ERROR', req.method, req.path, err);

  if (!res.headersSent) {
    res.status(500);
    res.json({error: 'unexpected'})
    ;
  }
});

module.exports = app;
