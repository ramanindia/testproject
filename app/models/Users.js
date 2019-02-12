'use strict';

var bcrypt = require('bcrypt');
var db = require('../../app/models/dbconnection'); 


exports.authentication = function(username,password) 
{
	//let userData = req.body;
	let userLoginQuery = 'select * from users where email= "'+username+'" or username = "'+username+'"';
	
	console.log(userLoginQuery);
	let returnData = [];
	
	db.query(userLoginQuery,function(err,results)
	{
		if(err)
		{
			returnData.push({
				error:true,
				message:LANGTEXT.LOGIN_ERROR
			});
			
			//return returnData;
			
			/*res.json({
            status:false,
            message:LANGTEXT.LOGIN_ERROR
            });*/
			
		}else
		{
			if(results)
			{
				//console.log(results[0]);				
				//console.log(results[0].username);				
				//console.log(results[0].password);
				
				bcrypt.compare(password, results[0].password).then(function(res) 
				{
					if(res)
					{
						console.log("matched");
						returnData.push({
							error:false,
							message:LANGTEXT.LOGIN_SUCCESS_MESSAGE
						});
							
						    return returnData;
					}
					else
					{
						
						console.log("not matched");
							returnData.push({
				error:true,
				message:LANGTEXT.PASSWORD_INCORRECT
			});
			//return returnData;
				
					}
				});
			}
			else
			{
				console.log("invalid Username");
				
				returnData.push({
				error:true,
				message:LANGTEXT.NOT_FOUND
			});
			//return returnData;
			
			}
			/*bcrypt.compare('somePassword', hash, function(err, res) 
			{
			  if(res) {
			   // Passwords match
			  } else {
			   // Passwords don't match
			  } 
			});*/
		}
		console.log(returnData);
		
	});
		//return ['d','d','dd','ddddyyy'];
		
  
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
