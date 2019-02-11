'use strict';

var bcrypt = require('bcrypt');
var db = require('../../app/models/dbconnection'); 

exports.authentication = function(req) 
{
	let userData = req.body;
	let userLoginQuery = 'select * from users where email= "'+userData.username+'" or username = "'+userData.username+'"';
	
	console.log(userLoginQuery);
	
	db.query(userLoginQuery,function(err,results)
	{
		if(err)
		{
			/*res.json({
            status:false,
            message:LANGTEXT.LOGIN_ERROR
            });*/
			
		}else
		{
			console.log(results[0]);
			console.log(results.username);
			/*bcrypt.compare('somePassword', hash, function(err, res) 
			{
			  if(res) {
			   // Passwords match
			  } else {
			   // Passwords don't match
			  } 
			});*/
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
		return hash
    });
	
	console.log("HashPassword==========="+HashPassword);
};
