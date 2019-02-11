'use strict';

var bcrypt = require('bcrypt');
var db = require('../app/models/dbconnection'); 

exports.authentication = function(req) 
{
    const HashPassword = bcrypt.hash(req.body.password, saltRounds, function(err, hash) 
	{
		if(err)
		{
		    console.log("Hashing password error",err);
			return false;
		}	  
		return hash;
    });
	
	console.log("HashPassword==========="+HashPassword);
}
;