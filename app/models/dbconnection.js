'use strict';
/**
 * add module for database connection
 */
var mysql = require('mysql');
let dataBaseConfig = require('../../config/database');


let port = process.env.PORT || 3001;

if (port === 3001) 
{
    var connection = mysql.createPool({
<<<<<<< HEAD
		connectionLimit : dataBaseConfig.MAXCONNECTIONLIMIT,
=======
>>>>>>> 34ed9113e08ebb2d8b83e14e966f8f2e7ffc5ca4
        host: dataBaseConfig.HOSTNAME,
        user: dataBaseConfig.DBUSERNAME,
        password: dataBaseConfig.DBPASSWORD,
        database: dataBaseConfig.DBNAME,
		connectionLimit : dataBaseConfig.MAXCONNECTIONLIMIT,
        insecureAuth: true
    });
} else 
{
    var connection = mysql.createPool({
<<<<<<< HEAD
		connectionLimit : dataBaseConfig.MAXCONNECTIONLIMIT,
=======
>>>>>>> 34ed9113e08ebb2d8b83e14e966f8f2e7ffc5ca4
       host: dataBaseConfig.HOSTNAME,
        user: dataBaseConfig.DBUSERNAME,
        password: dataBaseConfig.DBPASSWORD,
        database: dataBaseConfig.DBNAME,
		connectionLimit : dataBaseConfig.MAXCONNECTIONLIMIT,
        insecureAuth: true
    });
}
/**
 * create connection and return connetion string
 */
<<<<<<< HEAD
=======
 
>>>>>>> 34ed9113e08ebb2d8b83e14e966f8f2e7ffc5ca4
/*connection.connect(function(err) 
{
  if (err) 
  {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});*/
<<<<<<< HEAD
=======

connection.getConnection(function(err, connection)
 {
    if (err) 
  {
    console.error('error connecting: ' ,err);
    return;
  }
  console.log('connected as id ' ,connection.threadId);

});


>>>>>>> 34ed9113e08ebb2d8b83e14e966f8f2e7ffc5ca4
module.exports = connection;