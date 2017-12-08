const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");

const response = require("./helpers/response");
const configurePassport = require("./helpers/passport");
const User = require("./models/user");
const Flat = require("./models/flat");

const index = require("./routes/index");
const flats = require("./routes/flats");
const users = require("./routes/user");
const auth = require("./routes/auth");

const app = express();

// -- DB

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/Project3-DB", {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// -- SESSION

app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    }),
    secret: "Project3-DB",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

const passport = configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// -- MIDDLEWARES

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

//create a cors middleware
app.use(function(req, res, next) {
  //set headers to allow cross origin request.
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// -- ROUTES

app.use("/", index);
app.use("/flat", flats);
app.use("/user", users);
app.use("/auth", auth);

// -- ERRORS

app.use((req, res) => {
  res.status(404);
  res.json({ error: "Page not found" });
});

// error handler
app.use((err, req, res, next) => {
  console.log("ERROR", req.method, req.path, err);

  if (!res.headersSent) {
    res.status(500);
    res.json({ error: "unexpected" });
  }
});

module.exports = app;
