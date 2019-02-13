'use strict';

var bcrypt = require('bcrypt');
var db = require('../../app/models/dbconnection'); 


exports.userAuthenticated = function(username,password,callback) 
{
	
	let userLoginQuery = 'select * from users where email= "'+username+'" or username = "'+username+'" and status=1';
	db.query(userLoginQuery,function(err,results)
	{
		if(err)
		{
			return callback(LOGIN_ERROR);
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
};

exports.registration = function(req) 
{
	let userData = req.body;
	console.log("userData======",userData);
	console.log("password=="+userData.password);
	
	
    const HashPassword = bcrypt.hash(userData.password, 10, function(err, hash) 
	{
		if(err)
		{
		    console.log("Hashing password error",err);
			return false;
		}	  
		console.log(hash);
		//return hash
    });
	
	console.log("HashPassword==========="+HashPassword);
};
