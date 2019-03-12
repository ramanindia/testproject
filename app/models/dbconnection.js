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

/*connection.connect(function(err) 
{
  if (err) 
  {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});*/

/*connection.getConnection(function(err, connection)
 {
    if (err) 
  {
    console.error('error connecting: ' ,err);
    return;
  }
  console.log('connected as id ' ,connection.threadId);

});*/

module.exports = connection;