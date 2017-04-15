var express = require('express');
var router = express.Router();
var utils = require('../db-utils.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	req.session = null;
	res.redirect('../');
});

module.exports = router;
