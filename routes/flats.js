const express = require('express');
const router = express.Router();
const Flat = require("../models/flat");


/* GET home page. */
router.get('/', (req, res, next) => {
  Flat.find({}, (err, data) => {
    if (err) {
      return next(err);
    }
    res.json(data);
  });
});

router.get('/:id ', (req, res, next) => {
  const flatid = req.params.id
  Flat.findById(flatid, (err, data) => {
    if (err) {
      return next(err);
    }
    res.json(data);
  });
});

module.exports = router;