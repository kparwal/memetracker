var mysql = require('mysql');
var md5 = require('md5');
var utils = {};
utils.connection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-03.cleardb.net/heroku_4dd48e9e5b85ccb?reconnect=true',
  user     : 'b26fbc6986aebc',
  password : '20eff454',
  database : 'heroku_2d7fc86d75f050c'
});

utils.verify_user = function(username, password, cb) {
	utils.connection.query('SELECT * FROM users WHERE username=\"' + username + '\"', function (error, results, fields){
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
}

utils.update_points = function(username, val, cb) {
	utils.connection.query('UPDATE users SET monthly_points = monthly_points + ' + val + ' WHERE username = \"' + username + '\";');
	utils.connection.query('UPDATE users SET total_points = total_points + ' + val + ' WHERE username = \"' + username + '\";');
}

module.exports = utils;