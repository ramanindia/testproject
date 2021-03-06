'use strict';

let bcrypt = require('bcrypt');
let dbConnection = require('../../app/models/dbconnection'); 
let striptags = require('striptags');

exports.deleteDeactiveRecord = function(field,value,table,userID,callback) 
{	

   dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;		
			let sqlQuery = 'select count(*) as totalReords from '+table+' where '+field+'= "'+value+'" and status= 1 and user_id =  "'+userID+'"';
			
			
			db.query(sqlQuery,function(err,results)
			{	
				if(err)
				{
					return callback(err);
				}else
				{
					if(results[0].totalReords > 0)
					{
						return callback(LANGTEXT.ACTIVERECORDS);
					}
					else
					{
						let sqlQuery = 'delete from '+table+' where '+field+'= "'+value+'" and status= 0 and user_id =  "'+userID+'"';
						db.query(sqlQuery,function(err,delresults)
						{	db.release();
							if(err)
							{
								return callback(err);
							}else
							{
								//console.log("results==",results);
								
								if(delresults)
								{
									return callback(null,LANGTEXT.DELETEDMESSAGE);
								}
								else
								{
									return callback(LANGTEXT.ACTIVERECORDS);	
								}			
							}		
						});			
					}			
				}		
			});
	});
};


exports.checkUquieField = function(field,value,table,callback) 
{	

   dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;		
			let sqlQuery = 'select count(*) as totalReords from '+table+' where '+field+'= "'+value.toLowerCase()+'"';
			db.query(sqlQuery,function(err,results)
			{	db.release();
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
	});
};

exports.checkRecords= function(field,value,table,userID,callback) 
{	

   dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;		
			let sqlQuery = 'select count(*) as totalReords from '+table+' where '+field+'= "'+value.toLowerCase()+'" and user_id =  "'+userID+'"';
			console.log("sqlQuery12==",sqlQuery);
			//return false;
			
			db.query(sqlQuery,function(err,results)
			{	db.release();
				if(err)
				{
					return callback(err);
				}else
				{
					//console.log("results==",results);
					if(results[0].totalReords > 0)
					{
						return callback(LANGTEXT.ALLREADYUSED);
					}
					else
					{
						return callback(null, results);				
					}			
				}		
			});
	});
};

exports.checkUquieFieldWithUser = function(field,value,table,userID,recordId,recordField,callback) 
{	

   dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;	
		let conditions='';
		
			if(recordId && recordField )
			{
				conditions = 'and '+recordField+' != "'+recordId+'"';
			}
			  value=  value.replace('"','');
			  value=  value.replace("'","");
              value=  value.replace(",","");
   
			let sqlQuery = 'select count(*) as totalReords from '+table+' where '+field+'= "'+value.toLowerCase()+'" and user_id =  "'+userID+'"'+conditions;
			
			//console.log("sqlQuery123==",sqlQuery);
			
			db.query(sqlQuery,function(err,results)
			{	db.release();
				if(err)
				{
					//console.log("err===",err);
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
	});
};

exports.checkUquieMultipleFieldWithUser = function(field,value,field1,value1,table,userID,recordId,recordField,callback) 
{	

   dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;	
		let conditions='';
		
			if(recordId && recordField )
			{
				conditions = 'and '+recordField+' != "'+recordId+'"';
			}
			  value=  value.replace('"','');
			  value=  value.replace("'","");
              value=  value.replace(",","");
   
			let sqlQuery = 'select count(*) as totalReords from '+table+' where '+field1+'= "'+value1.toLowerCase()+'" and  '+field+'= "'+value.toLowerCase()+'" and user_id =  "'+userID+'"'+conditions;
			
			//console.log("sqlQuery123==",sqlQuery);
			
			db.query(sqlQuery,function(err,results)
			{	db.release();
				if(err)
				{
					//console.log("err===",err);
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
	});
};

exports.checkUquieMultipleFieldWithUser = function(field,value,field1,value1,table,userID,recordId,recordField,callback) 
{	
	
   dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;	
		let conditions='';
		
			if(recordId && recordField )
			{
				conditions = 'and '+recordField+' != "'+recordId+'"';
			}
			  value=  value.replace('"','');
			  value=  value.replace("'","");
              value=  value.replace(",","");
   
			let sqlQuery = 'select count(*) as totalReords from '+table+' where '+field+'= "'+value.toLowerCase()+'"and '+field1+'= "'+value1.toLowerCase()+'" and user_id =  "'+userID+'"'+conditions;
			
			//console.log("sqlQuery123==",sqlQuery);
			
			db.query(sqlQuery,function(err,results)
			{	db.release();
				if(err)
				{
					//console.log("err===",err);
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
	});
};

exports.findByFieldSingleRecord = function(field,value,table,userID,callback) 
{	

   dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;	

			let userField ='user_id';
			 if(table=='users')
			 {
				 userField ='parent_id';
			 }
			
			let sqlQuery = 'select * from '+table+' where '+field+'= "'+value+'" and '+userField+' = "'+userID+'" limit 0,1';
			//console.log("sqlQuery===",sqlQuery);			
			db.query(sqlQuery,function(err,results)
			{	db.release();
				if(err)
				{
					return callback(err);
				}else
				{
					if(results)
					{
						return callback(null, results[0]);		
					}
					else
					{ 
				      return callback('Please try agin.');
								
					}			
				}		
			});
	});
};

exports.findAllByRecordID = function(requestData,callback) 
{	

   dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;	

			let userField ='user_id';
			var wherekey = requestData.recordField;
			var wherekeyValue = requestData.recordID;
			
			 if(requestData.recordataSlug=='users')
			 {
				 userField ='parent_id';
			 }
			 
			 //console.log(requestData);
			 
			if(requestData.recordField=='owner_type')
			{
				if(requestData.recordID==0)
				{
					 wherekey = 'account_type';
					 wherekeyValue = '8';
				}
				else if(requestData.recordID==1)
				{
					var wherekey = 'account_type'
				     wherekeyValue = '7';
					
				}
				
			}
			let sqlQuery = 'select '+requestData.field1+','+requestData.field2+' from '+requestData.recordataSlug+' where '+wherekey+'= "'+wherekeyValue+'" and '+userField+' = "'+requestData.userID+'" and status='+requestData.Recordstatus+'';
			
			  //console.log(sqlQuery);
			  
			db.query(sqlQuery,function(err,results)
			{	db.release();
				if(err)
				{
					return callback(err);
				}else
				{
					if(results)
					{
						return callback(null, results);		
					}
					else
					{ 
				      return callback('Please try agin. No data found');
								
					}			
				}		
			});
	});
};

exports.findAll = function(query,callback) 
{	
 //console.log("query===",query);
  
   dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;		
			db.query(query,function(err,results)
			{	db.release();
				if(err)
				{
					return callback(err);
				}else
				{
					//console.log("results--",results);
					if(results)
					{
						return callback(null, results);		
					}
					else
					{ 
				      return callback('Please try agin.');
								
					}			
				}		
			});
	});
};
exports.findByQuery = function(query,callback) 
{	

   dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;		
			db.query(query,function(err,results)
			{	db.release();
				if(err)
				{
					return callback(err);
				}else
				{
					if(results)
					{
						return callback(null, results);		
					}
					else
					{ 
				      return callback('Please try agin.');
								
					}			
				}		
			});
	});
};
exports.updateStatus = function(requestData,table,field,userID,callback) 
{	
   //console.log("requestData===",requestData);
   
   dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;		
		
		   let statusChangeIds = requestData.records_id;
			
			//id stringfy
			let afterJSONSTRINGIFYIDs = JSON.stringify(statusChangeIds); 
				afterJSONSTRINGIFYIDs = afterJSONSTRINGIFYIDs.replace('[','(');
				afterJSONSTRINGIFYIDs = afterJSONSTRINGIFYIDs.replace(']',')');
				
			//check status
		   let  changeStatus;
		   if(requestData.change_active=='active')
		   {
			   changeStatus = 'status=1,is_delete=0'
		   }else if(requestData.change_deactive=='deactive')
		   {
			   changeStatus = 'status=0'
		   }
		   else if(requestData.change_delete=='delete')
		   {
			   changeStatus = 'is_delete=1,status=0'
		   }
		   //check array in ids
		   let conditions;
		    if (Array.isArray(statusChangeIds)) 
			 {
				  conditions = ' '+field+' IN '+afterJSONSTRINGIFYIDs+'';
			 }
			 else
			 { 
				conditions = ' '+field+' = '+afterJSONSTRINGIFYIDs+'';
			 }
			 let userCondition = 'user_id =  "'+userID+'"';
			 if(table=='users')
			 {
				 userCondition = 'parent_id =  "'+userID+'"';
			 }
			let sqlQuery = 'update '+table+' set '+changeStatus+' where '+conditions+' and '+userCondition;
			
			//console.log("sqlQuery7979878===="+sqlQuery);
			
			db.query(sqlQuery,function(err,results)
			{	db.release();
				if(err)
				{
					return callback(err);
				}else
				{					
					if(results)
					{
						return callback(null,results);
					}
					else
					{
						return callback('Something wrong. Please try again');				
					}		
				}		
			});
	});
};


exports.save = function(requestData,table,callback) 
{	
console.log("requestData==",requestData);


	let insertQuery = 'insert into '+table+' set ';
	let setVar='';
  for(var key in requestData) 
  {    
		requestData[key]=  requestData[key].replace('"','');
		requestData[key]=  requestData[key].replace("'","");
		requestData[key]=  requestData[key].replace(",","");
		
       setVar = setVar+ key+"='"+requestData[key]+"',"
	   
   }
 
   setVar = setVar.substring(0, setVar.length-1);
 
   
   dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;	
		let finalQuery = insertQuery+striptags(setVar);
		
		console.log(finalQuery);
		db.query(finalQuery,function(err,results)
		{	db.release();
			if(err)
			{
				return callback(err);
			}else
			{
				if(results)
				{
					//console.log(results);
			
					return callback(null, results);		
				}else
				{
					return callback('please try agian');
				}
			}		
		});
	});
};

exports.update = function(requestData,table,conditions,callback) 
{	
//console.log(requestData);
	let updateQuery = 'update '+table+' set ';
	
	//start set update varibale
	let setVar='';
  for(var key in requestData) 
  {    
       setVar = setVar+ key+"='"+requestData[key]+"',"
   }
   setVar = setVar.substring(0, setVar.length-1);

   //end  set update varibale
   	//start set condition varibale
	let setcondition='';
  for(var key in conditions) 
  {    
       setcondition = setcondition+ key+"='"+conditions[key]+"' and "
   }
   setcondition = setcondition.substring(0, setcondition.length-4);
  //end  set condition varibale
   
   
   dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;	
		let finalQuery = updateQuery+striptags(setVar)+' where '+setcondition;
		
		//console.log("update===",finalQuery);
		
		db.query(finalQuery,function(err,results)
		{	db.release();
			if(err)
			{
				return callback(err);
			}else
			{
				if(results)
				{
					return callback(null, results);		
				}else
				{
					return callback('please try agian');
				}
			}		
		});
	});
};

