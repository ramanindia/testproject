'use strict';

/**
 * define userLogin function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
 //var dbConnection = require('../../app/models/dbconnection'); 
 var Genernal = require('../../app/models/Generanal'); 

 /**
 * define getData function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.getData = function(req, res) 
{  								
     let requestData = req.body;
	 let returnData={};
	 if (Object.keys(requestData).length !==0)
	{
		requestData.userID = req.session.user.id;
		requestData.Recordstatus=1;
		Genernal.findAllByRecordID(requestData, function(err, results) 
		{
				 if(err)
				 {
					returnData.error = true
					returnData.message = 'Something went wrong.Please try again.';
					returnData.data = [];
				 }
				 else
				 {
					if(Object.keys(results).length !=0)
					 {
					  returnData.error = false
					   returnData.data = results;
						
					 }else
					 {
						 	returnData.error = false
							returnData.message ='No records found';
							returnData.data = [];
					 }						 
				 }
			         res.send(returnData);
			 });
	}
	else
	{
		returnData.error = true
		returnData.message = 'Something went wrong.Please try again.';
		returnData.data = [];
		res.send(returnData);
	}
	

	/*if (Object.keys(requestData).length !==0)
	{
		  console.log("requestData===",requestData);
		//let updateIds = requestData.records_id;
		
		 /*if(updateIds !== undefined)
		 {
			Genernal.updateStatus(requestData,'states','state_id',req.session.user.id, function(err, results) 
			{
				 if(err)
				 {
					req.flash('error', 'Something went wrong.Please try again.');
					res.redirect(requestData.reirectURL); 
				 }
				 else
				 {
					 if(results)
					 {
					   req.flash('success', 'successfully changed status');
						res.redirect(requestData.reirectURL); 
					 }			 
				 }
			 });
		 }*/
		
	/*}
	else
	{
		console.log("inivalid request");
		//req.flash('error', 'Invalid request. Please try again');
		//res.redirect(reirectURL); 
	}*/
}

