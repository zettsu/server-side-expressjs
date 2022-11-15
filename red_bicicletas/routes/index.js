var express = require('express');
var router = express.Router();
let Bikes = require("../models/bikes");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , bikes: Bikes.allBikes});
});

module.exports = router;
