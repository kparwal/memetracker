var express = require('express');
var router = express.Router();
var utils = require('../db-utils.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.username) {
		utils.connection.query('SELECT username, monthly_points, total_points FROM users WHERE username != \"' + (req.body.username || req.session.username) + '\"', function (error, results, fields) {
			// console.dir(results);
			res.render('points', { title: 'Give Points', point_list: results});
		}); 
	} else {
		res.redirect('../');
	}
});

router.post('/', function(req, res, next){
	if (req.session.username) {
		if (is_number(req.body.value)) {
			utils.update_points(req.body.recv, parseInt(req.body.value));
		}
	}
	res.redirect('../');
});

function is_number(num){
    return !isNaN(num)
}

module.exports = router;
