'use strict';

var bcrypt = require('bcrypt');
var dbConnection = require('../../app/models/dbconnection'); 

exports.userAuthenticated = function(username,password,callback) 
{
	
	let userLoginQuery = 'select * from users where email= "'+username+'" or username = "'+username+'" and status=1 and role_id !=3';
	dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;		
		db.query(userLoginQuery,function(err,results)
		{  
		   db.release();
			if(err)
			{
				return callback(LANGTEXT.LOGIN_ERROR);
			}else
			{
				if(results.length > 0)
				{
					bcrypt.compare(password, results[0].password).then(function(res) 
					{
						if(res)
						{
							return callback(null, results[0]);
						}
						else
						{						
							return callback(null, null, LANGTEXT.PASSWORD_INCORRECT);
						}
					});
				}
				else
				{
					
					return callback(null, null, LANGTEXT.NOT_FOUND);
				}			
			}		
		});
	});
	
};
