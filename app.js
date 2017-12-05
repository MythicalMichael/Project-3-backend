var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require("./models/user");
const Flat = require("./models/flat");

mongoose.connect('mongodb://localhost/Project3-DB', {useMongoClient: true});

var index = require('./routes/index');
var flats = require('./routes/flats');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', index);
app.use('/flat', flats);

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
