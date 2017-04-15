var mysql = require('mysql');
var md5 = require('md5');
var utils = {};
utils.connection = mysql.createPool({
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'b26fbc6986aebc',
    password: '20eff454',
    database: 'heroku_2d7fc86d75f050c'
});

utils.verify_user = function(username, password, cb) {
    utils.connection.getConnection(function(err, conn) {
        conn.query('SELECT * FROM users WHERE username=\"' + username + '\"', function(error, results, fields) {
        	conn.release();
            // console.dir(results);
            if (results.length > 0) {
                console.log("user exists!");
                if (results[0].hash === md5(password)) {
                    cb(true);
                } else {
                    cb(false);
                }
            } else {
                cb(false);
            }
        });
    });

}

utils.update_points = function(username, val, cb) {
	utils.connection.getConnection(function(err,conn){
    	conn.query('UPDATE users SET monthly_points = monthly_points + ' + val + ' WHERE username = \"' + username + '\";', function(){
    		conn.query('UPDATE users SET total_points = total_points + ' + val + ' WHERE username = \"' + username + '\";', function(){
    			conn.release();
    		});
    	});
	});
}

module.exports = utils;
