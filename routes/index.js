'use strict';

var express = require('express');
var router = express.Router();
var RSVP = require('rsvp')

router.get('/', function(req, res) {
  res.render("index");
});


module.exports = router;
