var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.status(201).send({ message: "control college" });
});



module.exports = router;