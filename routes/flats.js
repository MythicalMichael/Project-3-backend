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
/////////
router.get("/:id", (req, res, next) => {
  const flatid = req.params.id;
  Flat.findOne({ _id: `${flatid}` })
    .populate({
      path: "author",
      model: "User"
    })
    .exec((err, data) => {
      if (err) {
        next(err);
      } else {
        res.json(data);
      }
    });
});

router.post("/:id/flatmates", (req, res, next) => {
  const flatid = req.params.id;
  // findOneAndUpdate or just findOne
  Flat.findByIdAndUpdate(
    { _id: flatid },
    { $push: { flatmates: { user: req.user._id, message: req.body.message } } },
    (err, data) => {
      if (err) {
        return next(err);
      }
      console.log("hello from backend", data);
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
