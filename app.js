const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");

const User = require("./models/user");
const Flat = require("./models/flat");

const index = require("./routes/index");
const flats = require("./routes/flats");
const users = require("./routes/user");

const app = express();

// -- DB

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/Project3-DB", {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// -- MIDDLEWARES

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

// const corsOptions = {
//   origin: ["http://localhost:4200"],
//   credentials: true
// };
// app.use(cors(corsOptions));

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

// -- ROUTES

app.use("/", index);
app.use("/flat", flats);
app.use("/user", users);

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
