'use strict';

let bcrypt = require('bcrypt');
let db = require('../../app/models/dbconnection'); 
let striptags = require('striptags');

exports.checkUquieField = function(field,valaue,table,callback) 
{	
	let sqlQuery = 'select count(*) as totalReords from '+table+' where '+field+'= "'+valaue+'"';
	db.query(sqlQuery,function(err,results)
	{
		if(err)
		{
			return callback(err);
        }else
		{
			if(results[0].totalReords > 0)
			{
				return callback(LANGTEXT.ALLREADYEXITS);
			}
			else
			{
				return callback(null, results);				
			}			
		}		
	});
};

exports.save = function(requestData,table,callback) 
{	
	//let sqlQuery = 'select count(*) as totalReords from '+table+' where '+field+'= "'+valaue+'"';
	let insertQuery = 'insert into '+table+' set ';
	let setVar='';
  for(var key in requestData) 
  {    
       setVar = setVar+ key+"='"+requestData[key]+"',"
   }
  // console.log(striptags(setVar));
   setVar = setVar.substring(0, setVar.length-1);
   // console.log(setVar);
	let finalQuery = insertQuery+striptags(setVar);

	db.query(finalQuery,function(err,results)
	{
		if(err)
		{
			return callback(err);
        }else
		{
			if(results)
			{
				console.log(results);
		
			    return callback(null, results);		
			}else
			{
				return callback('please try agian');
			}
		}		
	});
};
