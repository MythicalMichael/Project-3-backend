const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcrypt");

const response = require("../helpers/response");
const User = require("../models/user");
const Flat = require("../models/flat");
// /* GET home page. */
// router.get("/", (req, res, next) => {
//   User.find({}, (err, data) => {
//     if (err) {
//       return next(err);
//     }
//     res.json(data);
//   });
// });

router.get("/:id", (req, res, next) => {
  const userid = req.params.id;
  User.findOne({ _id: `${userid}` }, (err, data) => {
    if (err) {
      return next(err);
      console.log(userid);
    }
    res.json(data);
  });
});

module.exports = router;
