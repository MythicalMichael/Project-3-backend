const express = require("express");
const router = express.Router();
const Flat = require("../models/flat");
const upload = require("../configs/multer");
/* GET home page. */
router.get("/", (req, res, next) => {
  Flat.find({}, (err, data) => {
    if (err) {
      return next(err);
    }
    res.json(data);
  });
});

router.get("/:id", (req, res, next) => {
  const flatid = req.params.id;
  Flat.findOne({ _id: `${flatid}` }, (err, data) => {
    if (err) {
      return next(err);
      console.log(flatid);
    }
    res.json(data);
  });
});
//Add a flat0
// router.post("/add", (req, res, next) => {
//   const flatname = req.body.flatname;
//   const rooms = req.body.rooms;
//   const price = req.body.price;

//   const newFlat = new Flat({
//     flatname,
//     rooms,
//     price
//   });

//   newFlat.save((err => {res.json('/');})
// });

router.post("/add", (req, res, next) => {
  console.log("body", req.body);
  console.log("file", req.file);

  const newFlat = new Flat({
    flatname: req.body.flatname,
    rooms: req.body.rooms,
    price: req.body.price,
    mainPicture: req.body.filename
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
