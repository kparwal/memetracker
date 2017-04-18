var express = require('express');
var router = express.Router();
var utils = require('../db-utils.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("SESSION OBJECT");
    // console.dir(req.session);
    if (req) {
        utils.connection.getConnection(function(err, conn) {
            conn.query('SELECT username, monthly_points, total_points FROM users', function(error, results, fields) {
                console.dir(results);
                conn.release();
                res.render('leaderboard', { title: 'Leaderboard', point_list: results });
            });
        });
    } else {
        res.render('index', { title: 'Meme Tracker', message: "", user: "" });
    }
});

router.post('/', function(req, res, next) {
    utils.verify_user(req.body.username, req.body.password, function(valid) {
        if (valid) {
            utils.connection.getConnection(function(err, conn) {
                conn.query('SELECT username, monthly_points, total_points FROM users', function(error, results, fields) {
                	conn.release();
                    // console.dir(results);
                    // req.session.username = req.body.username;
                    res.render('leaderboard', { title: 'Leaderboard', point_list: results });
                });
            });
        } else {
            res.render('index', { title: 'Meme Tracker', message: { error: true }, user: "" });
        }
    })
});

module.exports = router;
