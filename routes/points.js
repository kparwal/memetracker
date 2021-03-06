var express = require('express');
var router = express.Router();
var utils = require('../db-utils.js');
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.username) {
        utils.connection.getConnection(function(err, conn) {
            // console.log('escaped');
            // console.log(mysql.escape((req.body.username || req.session.username)));
            utils.connection.query('SELECT username, monthly_points, total_points FROM users WHERE username != ' + mysql.escape((req.body.username || req.session.username)) + '', function(error, results, fields) {
                // console.dir(results);
                conn.release();
                res.render('points', { title: 'Give Points', point_list: results });
            });
        });
    } else {
        res.redirect('../');
    }
});

router.post('/', function(req, res, next) {
    if (req.session.username) {
        if (is_number(req.body.value)) {
        	if (parseInt(req.body.value) <= 10 &&  parseInt(req.body.value) >= -10){
            	utils.update_points(req.body.recv, parseInt(req.body.value));
        	}
        }
    }
    res.redirect('../');
});

function is_number(num) {
    return !isNaN(num)
}

module.exports = router;
