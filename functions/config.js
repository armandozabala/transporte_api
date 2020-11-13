var mysql = require('mysql');

var connection = mysql.createConnection({
	   host     : 'armandozabala.com',
	   user     : 'eolsfnef_armzba',
	   password : 'ArmZba1986',
    database : 'eolsfnef_fltc_db',
    multipleStatements: true
});


module.exports = connection;