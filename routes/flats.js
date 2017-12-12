const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcrypt");
const response = require("../helpers/response");
const Flat = require("../models/flat");
const upload = require("../configs/multer");

const User = require("../models/user");

/* GET home page. */
router.get("/", (req, res, next) => {
  Flat.find({}, (err, data) => {
    if (err) {
      return next(err);
    }
    res.json(data);
  });
});
///////// help with populate
router.get("/:id", (req, res, next) => {
  const flatid = req.params.id;
  Flat.findOne({ _id: `${flatid}` })
    .populate({ path: "author", model: "User" })
    .populate("flatmates.user")
    .exec((err, data) => {
      if (err) {
        next(err);
      } else {
        console.log(data);
        res.json(data);
      }
    });
});
//  .populate({
//       path: "user"
//     })

router.post("/:id/flatmates", (req, res, next) => {
  const flatid = req.params.id;
  // findOneAndUpdate or just findOne
  Flat.findByIdAndUpdate(
    { _id: flatid },
    { $push: { flatmates: { user: req.user._id, message: req.body.message } } },
    { new: true },
    (err, data) => {
      if (err) {
        return next(err);
      }
      res.json(data);
    }
  );
});

router.put("/:flatid/flatmates/:userid/accept", (req, res, next) => {
  const flatid = req.params.flatid;
  const userid = req.params.userid;
  Flat.findByIdAndUpdate(
    { _id: flatid },
    { $set: { flatmates: { user: userid, status: "accepted" } } },
    { new: true },
    (err, data) => {
      if (err) {
        return next(err);
      }
      res.json(data);
    }
  );
});

router.put("/:flatid/flatmates/:userid/reject", (req, res, next) => {
  const flatID = req.params.flatid;
  const userID = req.params.userid;
  Flat.findByIdAndUpdate(
    { _id: flatID },
    { $set: { flatmates: { user: userID, status: "rejected" } } },
    { new: true },
    (err, data) => {
      if (err) {
        return next(err);
      }
      res.json(data);
    }
  );
});

router.post("/add", (req, res, next) => {
  const newFlat = new Flat({
    flatname: req.body.flatname,
    rooms: req.body.rooms,
    price: req.body.price,
    mainPicture: req.body.filename,
    author: req.user
  });

  newFlat.save(err => {
    if (err) {
      res.json(err);
      return;
    }
    res.json({ message: "Flat added", id: newFlat._id });
  });
});

router.post("/upload", upload.single("file"), (req, res, next) => {
  res.json({ filename: `/uploads/${req.file.filename}` });
});

module.exports = router;
