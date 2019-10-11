'use strict';

/**
 * define userLogin function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
 var dbConnection = require('../../app/models/dbconnection'); 
 var Genernal = require('../../app/models/Genernal'); 
 var Pagination = require('../../app/controllers/Component/pagination');
 

 /**
 * define changeStatus function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.changeStatus = function(req, res) 
{  								
    let requestData = req.body;
	if (Object.keys(requestData).length !==0)
	{
		let updateIds = requestData.records_id;
		 if(updateIds !== undefined)
		 {
			Genernal.updateStatus(requestData,'vehicles','	vehicle_id',req.session.user.id, function(err, results) 
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
		 }
		 else
		 {
			req.flash('error', 'Please select atleast one record');
			res.redirect(requestData.reirectURL); 
		 }
	}
	else
	{
		req.flash('error', 'Invalid request. Please try again');
		res.redirect(requestData.reirectURL); 
	}
}

 /**
 * define changeLicenceStatus function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
 
 exports.changeDriverStatus = function(req, res) 
{  								
     let requestData = req.body;
	  //console.log("requestData====",requestData);
	if (Object.keys(requestData).length !==0)
	{ 
		let updateIds = requestData.records_id;
		
		 if(updateIds !== undefined)
		 {
			Genernal.updateStatus(requestData,'vehicle_drivers','vehicle_driver_id',req.session.user.id, function(err, results) 
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
		 }
		 else
		 {
			req.flash('error', 'Please select atleast one record');
			res.redirect(requestData.reirectURL); 
		 }
	}
	else
	{
		req.flash('error', 'Invalid request. Please try again');
		res.redirect(requestData.reirectURL); 
	}
}
 /**
 * define changeLicenceStatus function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
 



 /**
 * define changeRtoStatus function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
 
 exports.changeRtoStatus = function(req, res) 
{  								
     let requestData = req.body;
	  //console.log("requestData====",requestData);
	if (Object.keys(requestData).length !==0)
	{ 
		let updateIds = requestData.records_id;
		
		if(updateIds !== undefined)
		{
			Genernal.updateStatus(requestData,'vehicle_rto_details','vehicle_rto_detail_id',req.session.user.id, function(err, results) 
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
		 }
		 else
		 {
			req.flash('error', 'Please select atleast one record');
			res.redirect(requestData.reirectURL); 
		 }
	}
	else
	{
		req.flash('error', 'Invalid request. Please try again');
		res.redirect(requestData.reirectURL); 
	}
}



 /**
 * define deleteLicenseRecord function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.deleteDriverRecord = function(req, res) 
{  								
	  let deleteID  = req.params.deleteRecordId;
	  
	 let QueryRedirectURL = req.query.redirectURL;
	 let actualredirectURL ='/vehicles/index';
		 try
			{
			var b = Buffer.from(QueryRedirectURL, 'base64')
			 actualredirectURL = b.toString('utf8');
			}
			catch (err)
			{
				req.flash('error', 'Something missing wrong. Invalid request. please try again');
				res.redirect('/vehicles/index');
				 return false;
			}
		if(QueryRedirectURL !== 'undefined')
		{
					
			/*Genernal.checkRecords('driver_id', deleteID,'vehicle_drivers',req.session.user.id, function(err, results) 
			{
				 if(err)
				 {			 
						req.flash('error', err);
						res.redirect(actualredirectURL); 
				 }				 
				 else
				 {*/
					// console.log("res==",actualredirectURL);
					 
					 Genernal.deleteDeactiveRecord('vehicle_driver_id',deleteID,'vehicle_drivers',req.session.user.id, function(err, delresults) 
						{
							 if(err)
							 {
								req.flash('error', err);
								res.redirect(actualredirectURL); 
							 }
							 else
							 {
								 if(delresults)
								 {
								   req.flash('success', delresults);
									res.redirect(actualredirectURL); 
								 }			 
							 }
						 });
				/* }
			});*/
			
		 }
		 else
		 {
			req.flash('error', 'Invalid request. Please try agian');
			//res.redirect(requestData.reirectURL); 
		 }
}
 /**
 * define deleteRtoRecord function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.deleteRtoRecord = function(req, res) 
{  								
	  let deleteID  = req.params.deleteRecordId;
	  
	 let QueryRedirectURL = req.query.redirectURL;
	 let actualredirectURL ='/vehicles/index';
		 try
			{
			var b = Buffer.from(QueryRedirectURL, 'base64')
			 actualredirectURL = b.toString('utf8');
			}
			catch (err)
			{
				req.flash('error', 'Something missing wrong. Invalid request. please try again');
				res.redirect('/vehicles/index');
				 return false;
			}
		if(QueryRedirectURL !== 'undefined')
		{
						 let getDataQuery = "select * from vehicle_rto_details ST where ST.vehicle_rto_detail_id='"+deleteID+"' and ST.user_id='"+req.session.user.id+"'";
	
	
	
			//console.log(getDataQuery);
	        Genernal.findByQuery(getDataQuery,function(err, checkdata) 
			{
				 if(err)
				 {			 
						req.flash('error', err);
						res.redirect(actualredirectURL); 
				 }				 
				 else
				 {
					// console.log("res==",actualredirectURL);
					 
					 Genernal.deleteDeactiveRecord('vehicle_rto_detail_id',deleteID,'vehicle_rto_details',req.session.user.id, function(err, delresults) 
						{
							 if(err)
							 {
								req.flash('error', err);
								res.redirect(actualredirectURL); 
							 }
							 else
							 {
								 if(delresults)
								 {
									 FUNCTIONS.deleteImage(env.RTOIMAGEPATH,checkdata[0].document_file);

								   req.flash('success', delresults);
									res.redirect(actualredirectURL); 
								 }			 
							 }
						 });
				 }
			});
			
		 }
		 else
		 {
			req.flash('error', 'Invalid request. Please try agian');
			//res.redirect(requestData.reirectURL); 
		 }
}

exports.deleteRecord = function(req, res) 
{  								
	  let deleteID  = req.params.deleteRecordId;
	  
	 let QueryRedirectURL = req.query.redirectURL;
	 let actualredirectURL ='/vehicles/index';
		 try
			{
			var b = Buffer.from(QueryRedirectURL, 'base64')
			 actualredirectURL = b.toString('utf8');
			}
			catch (err)
			{
				req.flash('error', 'Something missing wrong. Invalid request. please try again');
				res.redirect('/vehicles/index');
				 return false;
			}
		if(QueryRedirectURL !== 'undefined')
		{
					
			 Genernal.checkRecords('vehicle_id', deleteID,'lr_entries',req.session.user.id, function(err, results) 
			{
				 if(err)
				 {		
			           //console.log(err);			 
						req.flash('error', err);
						res.redirect(actualredirectURL); 
				 }				 
				 else
				 {
					// console.log("res==",actualredirectURL);
					 
					 //console.log("results==",results);
					 
					 Genernal.deleteDeactiveRecord('vehicle_id',deleteID,'vehicles',req.session.user.id, function(err, delresults) 
						{
							 if(err)
							 {
								 //console.log("results==",err);
								req.flash('error', err);
								res.redirect(actualredirectURL); 
							 }
							 else
							 {
								 if(results)
								 {
								   req.flash('success', delresults);
									res.redirect(actualredirectURL); 
								 }			 
							 }
						 });
				 }
			});
			
		 }
		 else
		 {
			req.flash('error', 'Invalid request. Please try agian');
			//res.redirect(requestData.reirectURL); 
		 }
}

 /**
 * define VechileRtoEdit function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.VechileRtoEdit = function(req, res) 
{  					
	 let recordID  = req.params.recordId;
	 let mainreccordID = req.params.driverId;
	 let QueryRedirectURL = req.query.redirectURL;
	 let errorRedirectURL =  '/vehicles/rto/'+mainreccordID+'?page_action=all';
	 
	 let licenceRedirectURL = '/vehicles/rto/'+mainreccordID+'?page_action=all';
	 
	 let renderHtml = 'vehicles/edit-rto.html';

	 let actualredirectURL='/vehicles/rto/'+mainreccordID+'?page_action=all';
	 
	 Genernal.findAll('select vehicle_id,vehicle_no from vehicles where user_id="'+req.session.user.id+'" and vehicle_id="'+mainreccordID+'"',function(err,results)
	 {		

		if(Object.keys(results).length ==0)
		{
			req.flash('error', LANGTEXT.INVALIDREQUEST);
			res.redirect(errorRedirectURL);
			return false;
		 }
		 
	 	 try
			{
			var b = Buffer.from(QueryRedirectURL, 'base64')
			 actualredirectURL = b.toString('utf8');
			}
			catch (err)
			{
				req.flash('error', LANGTEXT.PLZTRY );
				res.redirect(errorRedirectURL);
				 return false;
			}
			
			/* let getDataQuery = 'select	vehicle_driver_id,vehicle_id,user_id,driver_id,from_date,remarks,'+
			 'is_delete,status from vehicle_drivers as ST where ST.vehicle_driver_id="'+recordID+'" and ST.user_id="'
			 +req.session.user.id+'"';*/
			 
			 let getDataQuery = "select ST.vehicle_rto_detail_id,ST.vehicle_id,ST.document_type,ST.due_date,ST.document_file,ST.document_no,ST.is_delete,ST.status,AG.vehicle_no,"+
	"ST.created from vehicle_rto_details as ST INNER JOIN  vehicles as AG ON ST.vehicle_id=AG.vehicle_id"+
	" where ST.vehicle_rto_detail_id='"+recordID+"' and ST.user_id='"+req.session.user.id+"'";
	
	
	
			//console.log(getDataQuery);
	 Genernal.findByQuery(getDataQuery,function(err, editResults) 
		{
			if(err)
			{
				 req.flash('error', 'Something missing wrong. Invalid request. please try again');
				res.redirect(errorRedirectURL);		
			}
			else
			{
				if(typeof QueryRedirectURL !== 'undefined' || QueryRedirectURL !=='')
				{	
					 if(editResults)
					 {
						 let requestData = req.body;		
						if (Object.keys(requestData).length !==0)
						{
							req.checkBody('document_type', 'Document Type is required.').notEmpty()
							req.checkBody('due_date', 'Document Due date is required.').notEmpty()
							req.checkBody('document_no', 'Document no is required.').notEmpty()

							
							let errors = req.validationErrors();
							if (errors)
							{
								res.render(renderHtml,
								 {
									formData :requestData,
									 moment:moment,
									 MAINID:mainreccordID,
									vehicleData:results[0],
									PAGETITLE:LANGTEXT.EDITRTOTITLE,
									csrfToken: req.csrfToken(),
									errordata : errors,
									
								});
							}
							else
							{		
							Genernal.checkUquieMultipleFieldWithUser('document_type',requestData.document_type,requestData.check_field_name, requestData.check_record_id,'vehicle_rto_details',req.session.user.id,recordID,'vehicle_rto_detail_id',function(err, checkresults) 
							{
								 if(err)
								 {	
									 res.render(renderHtml,
									 {
										formData :requestData,
										 moment:moment,
										 MAINID:mainreccordID,
										vehicleData:results[0],
										PAGETITLE:LANGTEXT.EDITRTOTITLE,
										csrfToken: req.csrfToken(),
										errordata : [ { msg: 'RTO document type is '+LANGTEXT.ALLREADYEXITS }],
	
									});
								 }
								 else
								 {
									 if(checkresults)
									 {	
									console.log("req.files====",req.files);
									
									if(req.files)
										{
											FUNCTIONS.checkImageTypeSizeAandUpload(req.files.document_file,
											env.RTOIMAGEPATH,
											function(errors,fileName)
											{
												if(errors)
												 {
													//console.log("errors==",errors);
													res.render(renderHtml,
													{
														formData :requestData,
														moment:moment,
														MAINID:mainreccordID,
														vehicleData:results[0],
														PAGETITLE:LANGTEXT.EDITRTOTITLE,
														csrfToken: req.csrfToken(),
														errordata :[ { msg: errors }],
													});
												 }
												else
												{
												delete requestData._csrf;
												 delete requestData.record_id;
												 delete requestData.field_name;
												 delete requestData.check_field_name;
												 delete requestData.check_record_id;
												 delete requestData.controller_name;
												 	 
												requestData.document_file =fileName;
												requestData.due_date =FUNCTIONS.dateINYYYYMMDD(requestData.due_date);

												let conditions = {vehicle_rto_detail_id:recordID,user_id:req.session.user.id};
												Genernal.update(requestData,'vehicle_rto_details',conditions,function(err,resultdata)
												{
													if(err)
													{
														res.render(renderHtml,
														 {
															formData :requestData,
															 moment:moment,
															  MAINID:mainreccordID,
															 vehicleData:results[0],
															PAGETITLE:LANGTEXT.EDITRTOTITLE,
															csrfToken: req.csrfToken(),
															errordata : [ { msg: LANGTEXT.PLZTRY }],
															
														});
												
													}else
													{
														FUNCTIONS.deleteImage(env.RTOIMAGEPATH,editResults[0].document_file);
													   req.flash('success', LANGTEXT.USEREDITED);
													   res.redirect(actualredirectURL);													 
													}
													
													
												});
												
												}
												
												
											});

										}
										else 
										{
												 delete requestData._csrf;
												 delete requestData.record_id;
												 delete requestData.field_name;
												 delete requestData.check_field_name;
												 delete requestData.check_record_id;
												 delete requestData.controller_name;
												 
												 
												  requestData.due_date =FUNCTIONS.dateINYYYYMMDD(requestData.due_date);

												let conditions = {vehicle_rto_detail_id:recordID,user_id:req.session.user.id};
												Genernal.update(requestData,'vehicle_rto_details',conditions,function(err,resultdata)
												{
													if(err)
													{
														res.render(renderHtml,
														 {
															formData :requestData,
															 moment:moment,
															  MAINID:mainreccordID,
															 vehicleData:results[0],
															PAGETITLE:LANGTEXT.EDITRTOTITLE,
															csrfToken: req.csrfToken(),
															errordata : [ { msg: LANGTEXT.PLZTRY }],
															
														});
												
													}else
													{
													   req.flash('success', LANGTEXT.USEREDITED);
														res.redirect(actualredirectURL);													 
													}
													
													
												});
										}
									 }
									  else
									 {
										 res.render(renderHtml,
										 {
											formData :requestData,
											 moment:moment,
											  MAINID:mainreccordID,
											 vehicleData:results[0],
											PAGETITLE:LANGTEXT.EDITRTOTITLE,
											csrfToken: req.csrfToken(),
											errordata : [ { msg: LANGTEXT.PLZTRY }]
	
										}); 
									 }	
								 }
							});
								      
							}	
						}
						else
						{
							res.render(renderHtml,
								 {
									formData :editResults[0],
									 moment:moment,
									 MAINID:mainreccordID,
									 vehicleData:results[0],
									PAGETITLE:LANGTEXT.EDITRTOTITLE,
									csrfToken: req.csrfToken(),
								});
						}
							
					 }
					 else
					 {
						req.flash('error', 'Something missing wrong. Invalid request. please try again');
						res.redirect(errorRedirectURL); 
					 }
				 
						 
				}
				else
				{
				   req.flash('error', 'Something missing wrong. Invalid request. please try again');
				   res.redirect(errorRedirectURL);
				}
			
			}
		});
			
	 });
}


 /**
 * define VechileDriverEdit function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.VechileDriverEdit = function(req, res) 
{  					
	 let recordID  = req.params.recordId;
	 let mainreccordID = req.params.driverId;
	 let QueryRedirectURL = req.query.redirectURL;
	 let errorRedirectURL =  '/vehicles/driver/'+mainreccordID+'?page_action=all';
	 
	 let licenceRedirectURL = '/vehicles/driver/'+mainreccordID+'?page_action=all';
	 
	 let renderHtml = 'vehicles/edit-driver.html';

	 let actualredirectURL='/vehicles/driver/'+mainreccordID+'?page_action=all';
	 
	 Genernal.findAll('select vehicle_id,vehicle_no from vehicles where user_id="'+req.session.user.id+'" and vehicle_id="'+mainreccordID+'"',function(err,results)
	 {		
		if(Object.keys(results).length ==0)
		{
			req.flash('error', LANGTEXT.INVALIDREQUEST);
			res.redirect(errorRedirectURL);
			return false;
		 }
			Genernal.findAll('select driver_id,driver_name from drivers where status=1 and user_id="'+req.session.user.id+'"',function(err,driverResults)
			{
				
				if(Object.keys(driverResults).length ==0)
				{
					req.flash('error', LANGTEXT.INVALIDREQUEST);
					res.redirect(errorRedirectURL);
					return false;
				}
		 
		 
	 	 try
			{
			var b = Buffer.from(QueryRedirectURL, 'base64')
			 actualredirectURL = b.toString('utf8');
			}
			catch (err)
			{
				req.flash('error', LANGTEXT.PLZTRY );
				res.redirect(errorRedirectURL);
				 return false;
			}
			
			/* let getDataQuery = 'select	vehicle_driver_id,vehicle_id,user_id,driver_id,from_date,remarks,'+
			 'is_delete,status from vehicle_drivers as ST where ST.vehicle_driver_id="'+recordID+'" and ST.user_id="'
			 +req.session.user.id+'"';*/
			 
			 let getDataQuery = "select ST.vehicle_driver_id,ST.vehicle_id,ST.user_id,ST.driver_id,ST.from_date,ST.remarks,ST.is_delete,ST.status,AG.vehicle_no,"+
	"ST.created,DG.driver_name from vehicle_drivers as ST INNER JOIN  vehicles as AG ON ST.vehicle_id=AG.vehicle_id"+
	" INNER JOIN drivers as DG ON ST.driver_id=DG.driver_id where ST.vehicle_driver_id='"+recordID+"' and ST.user_id='"+req.session.user.id+"'";
	
	
	
			//console.log(getDataQuery);
	 Genernal.findByQuery(getDataQuery,function(err, editResults) 
		{
			if(err)
			{
				 req.flash('error', 'Something missing wrong. Invalid request. please try again');
				res.redirect(errorRedirectURL);		
			}
			else
			{
				if(typeof QueryRedirectURL !== 'undefined' || QueryRedirectURL !=='')
				{	
					 if(editResults)
					 {
						 //console.log("editResults==",editResults);
						 
						 
						 let requestData = req.body;		
						if (Object.keys(requestData).length !==0)
						{
							req.checkBody('driver_id', 'Driver name is required.').notEmpty()
							req.checkBody('from_date', 'From Date is required.').notEmpty()

							
							let errors = req.validationErrors();
							if (errors)
							{
								res.render(renderHtml,
								 {
									formData :requestData,
									 moment:moment,
									 MAINID:mainreccordID,
									 drivers:driverResults,
									PAGETITLE:LANGTEXT.EDITDRIVERTITLE,
									csrfToken: req.csrfToken(),
									errordata : errors,
									
								});
							}
							else
							{

							Genernal.checkUquieMultipleFieldWithUser('driver_id',requestData.driver_id,requestData.check_field_name, requestData.check_record_id,'vehicle_drivers',req.session.user.id,recordID,'vehicle_driver_id',function(err, checkresults) 
							{
								 if(err)
								 {	
									 res.render(renderHtml,
									 {
										formData :requestData,
										 moment:moment,
										 MAINID:mainreccordID,
										 drivers:driverResults,
										PAGETITLE:LANGTEXT.EDITDRIVERTITLE,
										csrfToken: req.csrfToken(),
										errordata : [ { msg: 'Driver name '+LANGTEXT.ALLREADYEXITS }],
	
									});
								 }
								 else
								 {
									 if(checkresults)
									 {					 delete requestData._csrf;
														 delete requestData.record_id;
														 delete requestData.field_name;
														 delete requestData.check_field_name;
														 delete requestData.check_record_id;
														 delete requestData.controller_name;
														 
														 
														  requestData.from_date =FUNCTIONS.dateINYYYYMMDD(requestData.from_date);

														let conditions = {vehicle_driver_id:recordID,user_id:req.session.user.id};
														Genernal.update(requestData,'vehicle_drivers',conditions,function(err,resultdata)
														{
															if(err)
															{
																res.render(renderHtml,
																 {
																	formData :requestData,
																	 moment:moment,
																	  MAINID:mainreccordID,
																	  drivers:driverResults,
																	PAGETITLE:LANGTEXT.EDITDRIVERTITLE,
																	csrfToken: req.csrfToken(),
																	errordata : [ { msg: LANGTEXT.PLZTRY }],
																	
																});
														
															}else
															{
															   req.flash('success', LANGTEXT.USEREDITED);
																res.redirect(actualredirectURL);													 
															}
															
															
														});
										
									 }
									  else
									 {
										 res.render(renderHtml,
										 {
											formData :requestData,
											 moment:moment,
											  MAINID:mainreccordID,
											  drivers:driverResults,
											PAGETITLE:LANGTEXT.EDITDRIVERTITLE,
											csrfToken: req.csrfToken(),
											errordata : [ { msg: LANGTEXT.PLZTRY }]
	
										}); 
									 }	
								 }
							});
								      
							}	
						}
						else
						{
							res.render(renderHtml,
								 {
									formData :editResults[0],
									 moment:moment,
									 MAINID:mainreccordID,
									 drivers:driverResults,
									PAGETITLE:LANGTEXT.EDITDRIVERTITLE,
									csrfToken: req.csrfToken(),
								});
						}
							
					 }
					 else
					 {
						req.flash('error', 'Something missing wrong. Invalid request. please try again');
						res.redirect(errorRedirectURL); 
					 }
				 
						 
				}
				else
				{
				   req.flash('error', 'Something missing wrong. Invalid request. please try again');
				   res.redirect(errorRedirectURL);
				}
			
			}
		});
			
		});
	 });
}

/**
 * define VehicleRto function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.VehicleRto = function(req, res) 
{  								
	 let recordID  = req.params.recordId;
	 let errorRedirectURL = '/vehicles/index'; 
	 let QueryRedirectURL = req.query.redirectURL;
	 let actualredirectURL = '';
	 let driverRedirectURL = '/vehicles/rto/'+recordID+'?page_action=all';
     let queryAction = req.query.page_action;
     let requestData = req.body;
	 
	 var renderHtml='';
	 if(queryAction==='new')
	 {
		
	  renderHtml = 'vehicles/add-rto.html';
	 }
	 else if(queryAction==='all')
	 {
	  renderHtml = 'vehicles/rto.html';
	 }
	 // console.log("renderHtml==",renderHtml);
	  
	 Genernal.findAll('select vehicle_id,vehicle_no from vehicles where user_id="'+req.session.user.id+'" and vehicle_id="'+recordID+'"',function(err,results)
	 {
		 if(Object.keys(results).length ==0)
		 {
			req.flash('error', LANGTEXT.PLZCREATEVEH);
			res.redirect(actualredirectURL);
			return false;
		 }
	 if(queryAction=='all')
	 {
	  /**
	 *define variable for pagination
	 *start code for pagination
	 */
	 let totalRecords;
	 let totalNoPages;
	 let start=0;
	 let currentPage=1;
	 let conditions;
	 let records_per_page = process.env.PERPAGE; 
	 let limit;
	  let tableName='vehicle_rto_details';
	  if (typeof req.query.page !== 'undefined') 
	    {
            currentPage = req.query.page;
        }
      if(currentPage >1)
	  {
     
       start = (currentPage - 1) * records_per_page;
      }
	  	limit = ' limit '+start+','+records_per_page;
	
	  /**
	 *end code for pagination
	 */
   
     let searchkeycondition='';
      /**
	 *check search key
	 */
	  if (typeof req.query.search !== 'undefined') 
		{
			let searchkey = req.query.search;
			searchkeycondition = " and CONCAT_ws('',due_date,ST.document_type,ST.document_no) LIKE '%"+searchkey.replace(/\s\s+/g, ' ')+"%'";
		}
	/**
    * check order by
	*/	
	//let defaultorderBY = ' order by updated desc ';
	let defaultorderBY;
	let orderBy ='created';
	let orderType= 'desc';
	
	if(typeof req.query.orderBy !== 'undefined' && typeof req.query.orderType !== 'undefined') 
	    {
             orderBy = req.query.orderBy;
			 orderType= req.query.orderType;
			defaultorderBY = ' order by ST.'+orderBy+' '+orderType;
        }
		else
		{
			defaultorderBY = ' order by ST.'+orderBy+' '+orderType;
		}
		    
	 let PageSlug  = req.params.PageSlug;	
		 conditions ="where ST.user_id = '"+ req.session.user.id+"' and ST.vehicle_id = '"+ recordID+"'";
		 
	  var pageTitle =LANGTEXT.ALLRTO;
	 if(PageSlug=='active')
	 {
		 pageTitle = LANGTEXT.ACTIVERTO;
		 conditions =conditions+ ' and ST.status=1';
	 }
	 else if(PageSlug=='deactive')
	 {
		 pageTitle = LANGTEXT.DEACTIVERTO;
		 conditions =conditions+ ' and ST.status=0';
	 }
	 
	let query = "select ST.vehicle_rto_detail_id,ST.vehicle_id,ST.status,ST.user_id,ST.due_date,ST.document_type,ST.document_no,ST.document_file,AG.vehicle_no,"+
	"ST.created from "+tableName+" as ST INNER JOIN  vehicles as AG ON ST.vehicle_id=AG.vehicle_id"+
	" "+conditions+searchkeycondition+defaultorderBY+limit;
	
     //console.log("query==",query);
	 
	let totalCountQuery = "select count(*) as totalRecord from "+tableName+" as ST INNER JOIN  vehicles as AG ON ST.vehicle_id=AG.vehicle_id "+
	conditions+searchkeycondition;
	
	 //console.log("totalCountQuery==",totalCountQuery);
	 

	let pageUri='/vehicles/rto/'+recordID;
	/**
	*start sorting functionality
	*/
	 let setSortingQueryString='';
	 let QuertyData= req.query;
	 delete QuertyData.page;
	 delete QuertyData.orderBy;
	 delete QuertyData.orderType;
	 if(JSON.stringify(QuertyData)!='{}')
	 {
		  for(var key in QuertyData) 
		  {    
			   setSortingQueryString = setSortingQueryString+ key+"="+QuertyData[key]+'&';
		   }
		 setSortingQueryString = '&'+setSortingQueryString.substring(0, setSortingQueryString.length-1);
	 }
	 
	 /**
	*end sorting functionality
	*/
	
	req.query.orderType=orderType;
	req.query.orderBy=orderBy;
	dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;	
		db.query(totalCountQuery,function(err,totalCountResults)
		{
			
			if(err)
			{
				req.flash('error', LANGTEXT.DATABASESYSERROR);
				res.render(renderHtml,
				{
					PAGETITLE:pageTitle,
				});
			}
			else
			{
				//console.log(totalCountResults);
				db.query(query,function(err,results)
				{  db.release();
					if(err)
					{
						
						//return callback(LANGTEXT.LOGIN_ERROR);
						 req.flash('error', LANGTEXT.DATABASESYSERROR);
						res.render(renderHtml,
						{
							PAGETITLE:pageTitle
						});
					}else
					{   
				           var bufferURL = Buffer.from(req.originalUrl);
						   
							
						   var redirectURL = bufferURL.toString('base64');
						   //console.log("req.query",req.query);
						  let totalRecords = totalCountResults[0].totalRecord;
						  totalNoPages = Math.ceil(totalRecords / records_per_page);
						   // pageUri = pageUri.replace('_','-');
						   const Paginate = new Pagination(totalRecords,currentPage,pageUri,records_per_page,req.query);
						//console.log("redirectURL===",redirectURL);
						res.render(renderHtml,
						{
							
							PAGETITLE:pageTitle,
							 pages : Paginate.links(),
							 results :results,
							 QueryStringData:req.query,
							 moment:moment,
							 setSortingQueryString:setSortingQueryString,
							 csrfToken: req.csrfToken(),
							 redirectOriginalUrl:req.originalUrl,
							 redirctURL:redirectURL,
							 PageSlug:PageSlug,
							RECORDID:recordID,
						});
					}
				});	
			}
		});	
	});
		 

	 }
	else  if(queryAction=='new') 
	{	
					
		try
		{
		  var b = Buffer.from(QueryRedirectURL, 'base64')
		 actualredirectURL = b.toString('utf8');
		}
		catch (err)
		{
			req.flash('error', LANGTEXT.PLZTRY );
			res.redirect(errorRedirectURL);
			 return false;
		}
		/*Genernal.findAll('select driver_id,driver_name from drivers where status=1 and user_id="'+req.session.user.id+'"',function(err,driverResults)
		{
			
		  if(Object.keys(driverResults).length ==0)
		 {
			req.flash('error', LANGTEXT.PLZCREATEVEH);
			res.redirect(driverRedirectURL);
			return false;
		 }
		 */
		if (Object.keys(requestData).length !==0)
		{
		  
		 
			req.checkBody('document_type', 'Document Type is required.').notEmpty()
			req.checkBody('due_date', 'Document Due date is required.').notEmpty()
			req.checkBody('document_no', 'Document no is required.').notEmpty()
			//req.checkBody('document_file', 'rto document is required.').notEmpty()
			let errors = req.validationErrors();
			if (errors)
			{
			res.render(renderHtml,
				 {
					formData :requestData,
					moment:moment,
					VEHICLEID:recordID,
					vehicleData:results[0],
					PAGETITLE:LANGTEXT.ADDRTOTITLE,
					csrfToken: req.csrfToken(),
					errordata : errors
				});
			}
			else
			{    
				
				var recordLICID = '';
				var fieldID = '';
				Genernal.checkUquieMultipleFieldWithUser('document_type', requestData.document_type,requestData.check_field_name, requestData.check_record_id,'vehicle_rto_details',req.session.user.id,recordLICID,fieldID, 
				function(err, checkresults) 
				{
					 if(err)
					 {	
						 res.render(renderHtml,
						 {
							formData :requestData,
							moment:moment,
							VEHICLEID:recordID,
							vehicleData:results[0],
							PAGETITLE:LANGTEXT.ADDRTOTITLE,
							csrfToken: req.csrfToken(),
							errordata : [ { msg: 'RTO Doc type is '+LANGTEXT.ALLREADYEXITS }],
						});
					 }
					 else
					 {
						 if(checkresults)
						 {	

					  if(req.files)
					  {
					FUNCTIONS.checkImageTypeSizeAandUpload(req.files.document_file,env.RTOIMAGEPATH,
					function(errors,fileName)
					{
						 if(errors)
						 {
							//console.log("errors==",errors);
							res.render(renderHtml,
							{
								formData :requestData,
								moment:moment,
								VEHICLEID:recordID,
								vehicleData:results[0],
								PAGETITLE:LANGTEXT.ADDRTOTITLE,
								csrfToken: req.csrfToken(),
								errordata :[ { msg: errors }],
							});
							
						 }
						else 
						{
									//console.log("result===",result);						
									 delete requestData._csrf;
									  delete requestData.check_field_name;
									 delete requestData.check_record_id;
									  delete requestData.controller_name;
									 
									 requestData.vehicle_rto_detail_id=UID();
									 requestData.vehicle_id=recordID;
									 requestData.user_id = req.session.user.id;
									 requestData.due_date =FUNCTIONS.dateINYYYYMMDD(requestData.due_date);
									 requestData.document_file =fileName;
							    Genernal.save(requestData,'vehicle_rto_details',function(err,result)
								{								
									if(err)
									{
										res.render(renderHtml,
										{
											formData :requestData,
											moment:moment,
											VEHICLEID:recordID,
											vehicleData:results[0],
											PAGETITLE:LANGTEXT.ADDRTOTITLE,
											csrfToken: req.csrfToken(),
											errordata : [ { msg: LANGTEXT.PLZTRY }],
										});								
									}else
									{									
									   req.flash('success', LANGTEXT.USERADDED);
										res.redirect(driverRedirectURL);													 
									}									
								});	
						}
					});		
					  } else 
					  {
						 res.render(renderHtml,
							 {
								formData :requestData,
								moment:moment,
								VEHICLEID:recordID,
								vehicleData:results[0],
								PAGETITLE:LANGTEXT.ADDRTOTITLE,
								csrfToken: req.csrfToken(),
								errordata : [ { msg:"Upload RTO document in valid format(jpg/jpeg/png/pdf)."}],
							});   
					  }						  
						 }
						 else
						 {
							 res.render(renderHtml,
							 {
								formData :requestData,
								moment:moment,
								VEHICLEID:recordID,
								vehicleData:results[0],
								PAGETITLE:LANGTEXT.ADDRTOTITLE,
								csrfToken: req.csrfToken(),
								errordata : [ { msg:LANGTEXT.SOMETHINGWENTWRONG}],
							}); 
						 }					 							 
					 }
				 });

						/*}*/
					/*});*/
		
				}
		}	
		else
		{
			
			res.render(renderHtml,
			{
				PAGETITLE:LANGTEXT.ADDRTOTITLE,
				moment:moment,
				VEHICLEID:recordID,
				vehicleData:results[0],
				csrfToken: req.csrfToken()
			});
		}
		 /*});*/
	 }
	 else 
        {
		   req.flash('error',LANGTEXT.INVALIDREQUEST);
		   res.redirect(driverRedirectURL);	
		}
	  });
   /* });*/
}


/**
 * define Driver function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.VehicleDriver = function(req, res) 
{  								
	 let recordID  = req.params.recordId;
	 let errorRedirectURL = '/vehicles/index'; 
	 let QueryRedirectURL = req.query.redirectURL;
	 let actualredirectURL = '';
	 let driverRedirectURL = '/vehicles/driver/'+recordID+'?page_action=all';
     let queryAction = req.query.page_action;
     let requestData = req.body;
	 
	/* Genernal.checkRecords('vehicle_id', recordID,'vehicles',req.session.user.id, function(err, checkdriverID) 
	{
					
		if(checkdriverID)
		{
				req.flash('error', LANGTEXT.INVALIDREQUEST);
				res.redirect(errorRedirectURL);
				return false;
		}*/
											
	 //console.log("queryAction==",queryAction)
	 var renderHtml='';
	 if(queryAction==='new')
	 {
		
	  renderHtml = 'vehicles/add-driver.html';
	 }
	 else if(queryAction==='all')
	 {
	  renderHtml = 'vehicles/driver.html';
	 }
	 // console.log("renderHtml==",renderHtml);
	  
	 Genernal.findAll('select vehicle_id,vehicle_no from vehicles where user_id="'+req.session.user.id+'" and vehicle_id="'+recordID+'"',function(err,results)
	 {
		 if(Object.keys(results).length ==0)
		 {
			req.flash('error', LANGTEXT.PLZCREATELICENCE);
			res.redirect(actualredirectURL);
			return false;
		 }
	 if(queryAction=='all')
	 {
	  /**
	 *define variable for pagination
	 *start code for pagination
	 */
	 let totalRecords;
	 let totalNoPages;
	 let start=0;
	 let currentPage=1;
	 let conditions;
	 let records_per_page = process.env.PERPAGE; 
	 let limit;
	  let tableName='vehicle_drivers';
	  if (typeof req.query.page !== 'undefined') 
	    {
            currentPage = req.query.page;
        }
      if(currentPage >1)
	  {
     
       start = (currentPage - 1) * records_per_page;
      }
	  	limit = ' limit '+start+','+records_per_page;
	
	  /**
	 *end code for pagination
	 */
   
     let searchkeycondition='';
      /**
	 *check search key
	 */
	  if (typeof req.query.search !== 'undefined') 
		{
			let searchkey = req.query.search;
			searchkeycondition = " and CONCAT_ws('',from_date,ST.remarks,ST.driver_id,DG.driver_name) LIKE '%"+searchkey.replace(/\s\s+/g, ' ')+"%'";
		}
	/**
    * check order by
	*/	
	//let defaultorderBY = ' order by updated desc ';
	let defaultorderBY;
	let orderBy ='created';
	let orderType= 'desc';
	
	if(typeof req.query.orderBy !== 'undefined' && typeof req.query.orderType !== 'undefined') 
	    {
             orderBy = req.query.orderBy;
			 orderType= req.query.orderType;
			defaultorderBY = ' order by ST.'+orderBy+' '+orderType;
        }
		else
		{
			defaultorderBY = ' order by ST.'+orderBy+' '+orderType;
		}
		    
	 let PageSlug  = req.params.PageSlug;	
		 conditions ="where ST.user_id = '"+ req.session.user.id+"' and ST.vehicle_id = '"+ recordID+"'";
		 
	  var pageTitle =LANGTEXT.ALLVEHICLEDRIVER;
	 if(PageSlug=='active')
	 {
		 pageTitle = LANGTEXT.ACTIVEDRIVER;
		 conditions =conditions+ ' and ST.status=1';
	 }
	 else if(PageSlug=='deactive')
	 {
		 pageTitle = LANGTEXT.DEACTIVEDRIVER;
		 conditions =conditions+ ' and ST.status=0';
	 }
	 
	 //console.log("searchkeycondition===",searchkeycondition);
	 
	// console.log("conditions===",conditions);
	 
	let query = "select ST.vehicle_driver_id,ST.vehicle_id,ST.user_id,ST.driver_id,ST.from_date,ST.remarks,ST.is_delete,ST.status,AG.vehicle_no,"+
	"ST.created,DG.driver_name from "+tableName+" as ST INNER JOIN  vehicles as AG ON ST.vehicle_id=AG.vehicle_id"+
	" INNER JOIN drivers as DG ON ST.driver_id=DG.driver_id "+conditions+searchkeycondition+defaultorderBY+limit;
	
     //console.log("query==",query);
	 
	let totalCountQuery = "select count(*) as totalRecord from "+tableName+" as ST INNER JOIN  vehicles as AG ON ST.vehicle_id=AG.vehicle_id"+
	" INNER JOIN drivers as DG ON ST.driver_id=DG.driver_id "+conditions+searchkeycondition;
	
	 //console.log("totalCountQuery==",totalCountQuery);
	 

	let pageUri='/vehicles/driver/'+recordID;
	/**
	*start sorting functionality
	*/
	 let setSortingQueryString='';
	 let QuertyData= req.query;
	 delete QuertyData.page;
	 delete QuertyData.orderBy;
	 delete QuertyData.orderType;
	 if(JSON.stringify(QuertyData)!='{}')
	 {
		  for(var key in QuertyData) 
		  {    
			   setSortingQueryString = setSortingQueryString+ key+"="+QuertyData[key]+'&';
		   }
		 setSortingQueryString = '&'+setSortingQueryString.substring(0, setSortingQueryString.length-1);
	 }
	 
	 /**
	*end sorting functionality
	*/
	
	req.query.orderType=orderType;
	req.query.orderBy=orderBy;
	dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;	
		db.query(totalCountQuery,function(err,totalCountResults)
		{
			
			if(err)
			{
				req.flash('error', LANGTEXT.DATABASESYSERROR);
				res.render(renderHtml,
				{
					PAGETITLE:pageTitle,
				});
			}
			else
			{
				//console.log(totalCountResults);
				db.query(query,function(err,results)
				{  db.release();
					if(err)
					{
						
						//return callback(LANGTEXT.LOGIN_ERROR);
						 req.flash('error', LANGTEXT.DATABASESYSERROR);
						res.render(renderHtml,
						{
							PAGETITLE:pageTitle
						});
					}else
					{   
				           var bufferURL = Buffer.from(req.originalUrl);
						   
						  //  console.log("bufferURL====",bufferURL);
							
						   var redirectURL = bufferURL.toString('base64');
						   //console.log("req.query",req.query);
						  let totalRecords = totalCountResults[0].totalRecord;
						  totalNoPages = Math.ceil(totalRecords / records_per_page);
						   // pageUri = pageUri.replace('_','-');
						   const Paginate = new Pagination(totalRecords,currentPage,pageUri,records_per_page,req.query);
						//console.log("redirectURL===",redirectURL);
						res.render(renderHtml,
						{
							
							PAGETITLE:pageTitle,
							 pages : Paginate.links(),
							 results :results,
							 QueryStringData:req.query,
							 moment:moment,
							 setSortingQueryString:setSortingQueryString,
							 csrfToken: req.csrfToken(),
							 redirectOriginalUrl:req.originalUrl,
							 redirctURL:redirectURL,
							 PageSlug:PageSlug,
							RECORDID:recordID,
						});
					}
				});	
			}
		});	
	});
		 

	 }
	 else  if(queryAction=='new') 
	 {
		 	 
		try
		{
		  var b = Buffer.from(QueryRedirectURL, 'base64')
		 actualredirectURL = b.toString('utf8');
		}
		catch (err)
		{
			req.flash('error', LANGTEXT.PLZTRY );
			res.redirect(errorRedirectURL);
			 return false;
		}
	
	
		Genernal.findAll('select driver_id,driver_name from drivers where status=1 and user_id="'+req.session.user.id+'"',function(err,driverResults)
		{
			
		  if(Object.keys(driverResults).length ==0)
		 {
			req.flash('error', LANGTEXT.PLZCREATEDRIVER);
			res.redirect(driverRedirectURL);
			return false;
		 }
		 
		 
		if (Object.keys(requestData).length !==0)
		{
			req.checkBody('driver_id', 'Driver name is required.').notEmpty()
			req.checkBody('from_date', 'From Date is required.').notEmpty()

			let errors = req.validationErrors();
			if (errors)
			{
			res.render(renderHtml,
				 {
					formData :requestData,
					moment:moment,
					VEHICLEID:recordID,
					drivers:driverResults,
					vehicleData:results[0],
					PAGETITLE:LANGTEXT.ADDDRIVERTITLE,
					csrfToken: req.csrfToken(),
					errordata : errors
				});
			}
			else
			{    var recordLICID = '';
		         var fieldID = '';
				Genernal.checkUquieMultipleFieldWithUser('driver_id', requestData.driver_id,requestData.check_field_name, requestData.check_record_id,'vehicle_drivers',req.session.user.id,recordLICID,fieldID, function(err, checkresults) 
				{
					 if(err)
					 {	
						 res.render(renderHtml,
						 {
							formData :requestData,
							moment:moment,
							VEHICLEID:recordID,
							drivers:driverResults,
							vehicleData:results[0],
							PAGETITLE:LANGTEXT.ADDDRIVERTITLE,
							csrfToken: req.csrfToken(),
							errordata : [ { msg: 'Driver name '+LANGTEXT.ALLREADYEXITS }],
						});
					 }
					 else
					 {
						 if(checkresults)
						 {		
						
									 delete requestData._csrf;
									  delete requestData.check_field_name;
									 delete requestData.check_record_id;
									  delete requestData.controller_name;
									 
									 requestData.vehicle_driver_id=UID();
									 requestData.vehicle_id=recordID;
									 requestData.user_id = req.session.user.id;
									 requestData.from_date =FUNCTIONS.dateINYYYYMMDD(requestData.from_date);
							    Genernal.save(requestData,'vehicle_drivers',function(err,result)
								{								
									if(err)
									{
										res.render(renderHtml,
										{
											formData :requestData,
											moment:moment,
											VEHICLEID:recordID,
											drivers:driverResults,
											vehicleData:results[0],
											PAGETITLE:LANGTEXT.ADDDRIVERTITLE,csrfToken: req.csrfToken(),
											errordata : [ { msg: LANGTEXT.PLZTRY }],
										});								
									}else
									{
										console.log("licenceRedirectURL===",driverRedirectURL);										
									   req.flash('success', LANGTEXT.USERADDED);
										res.redirect(driverRedirectURL);													 
									}									
								});							 								
						 }
						 else
						 {
							 res.render(renderHtml,
							 {
								formData :requestData,
								moment:moment,
								VEHICLEID:recordID,
								drivers:driverResults,
								PAGETITLE:LANGTEXT.ADDDRIVERTITLE,
								vehicleData:results[0],
								csrfToken: req.csrfToken(),
								errordata : [ { msg:LANGTEXT.SOMETHINGWENTWRONG}],
							}); 
						 }					 							 
					 }
				 });
			}
		}	
		else
		{
			res.render(renderHtml,
			{
				PAGETITLE:LANGTEXT.ADDDRIVERTITLE,
				moment:moment,
				VEHICLEID:recordID,
				drivers:driverResults,
				vehicleData:results[0],
				csrfToken: req.csrfToken()
			});
		}
		 });
	 }
	 else 
        {
		   req.flash('error',LANGTEXT.INVALIDREQUEST);
		   res.redirect(driverRedirectURL);	
		}
	  });
   /* });*/
}

 /**
 * define VehicleEdit function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.VehicleEdit = function(req, res) 
{  			
	 let recordID  = req.params.recordId;
	 let QueryRedirectURL = req.query.redirectURL;
	 let errorRedirectURL = '/vehicles/index';
	 let renderHtml = 'vehicles/edit-vehicle.html';
	 let actualredirectURL='/vehicles/index';
	 
	 let query ='select vehicle_group_id,vehicle_group from vehicle_groups where status=1 and user_id="'+req.session.user.id+'"';
	  Genernal.findAll(query,function(err,groupResults)
	 {
		
		 if(Object.keys(groupResults).length ==0)
		 {
			req.flash('error', LANGTEXT.PLZCREATEVEHICLEGROUP);
			res.redirect(redirectURL);
			return false;
		 }
		  let typequery ='select vehicle_type_id,vehicle_type from vehicle_types where status=1 and user_id="'+req.session.user.id+'"';
	
		Genernal.findAll(typequery,function(err,typeResults)
		{
		
		 if(Object.keys(typeResults).length ==0)
		 {
			req.flash('error', LANGTEXT.PLZCREATEVEHICLETYPE);
			res.redirect(redirectURL);
			return false;
		 }
		 
	 	 try
			{
			var b = Buffer.from(QueryRedirectURL, 'base64')
			 actualredirectURL = b.toString('utf8');
			}
			catch (err)
			{
				req.flash('error', LANGTEXT.INVALIDREQUEST);
				res.redirect(errorRedirectURL);
				 return false;
			}
			 let getDataQuery = 'select	ST.vehicle_id,ST.user_id,ST.vehicle_no,ST.owner_type,ST.account_id,ST.vehicle_type_id,'+
			 ' ST.vehicle_group_id,ST.capacity, ST.capacity,ST.RTO,ST.engine_no,ST.chassis_no,ST.load_capacity,ST.make,'+
			 ' ST.model,ST.insurance_company,ST.policy_no,ST.renew_date,ST.amount,ST.remarks,ST.finance_company_name,ST.finance_amount,'+
			 ' ST.finance_date_from,ST.finance_date_to,ST.installment_amount,ST.average,ST.installment_date,ST.status,ACC.account_name from vehicles as ST INNER JOIN accounts as ACC ON ST.account_id=ACC.account_id  where ST.vehicle_id="'+recordID+'" and ST.user_id="'+req.session.user.id+'"';
	
			//console.log(getDataQuery);
	       Genernal.findByQuery(getDataQuery,function(err, results) 
		{
			//console.log(results);
			if(err)
			{
				 req.flash('error', LANGTEXT.INVALIDREQUEST);
				res.redirect(errorRedirectURL);		
			}
			else
			{
				if(typeof QueryRedirectURL !== 'undefined' || QueryRedirectURL !=='')
				{	
					 if(results)
					 {
						 let requestData = req.body;		
						if (Object.keys(requestData).length !==0)
						{
							 req.checkBody('vehicle_no', 'Vehicle No is required.').notEmpty()
							req.checkBody('owner_type', 'Vehicle owner type is required.').notEmpty()
							
							req.checkBody('account_id', 'Vehicle Owner/Account Name.').notEmpty()
							req.checkBody('vehicle_group_id', 'Vehicle Group is required.').notEmpty()
							req.checkBody('capacity', 'Capacity in ton is required.').notEmpty()
							req.checkBody('average', 'Vehicle average is required.').notEmpty()
							req.checkBody('vehicle_type_id', 'Vehicle type is required.').notEmpty()
							req.checkBody('RTO', 'RTO is required.').notEmpty()
							
							req.checkBody('engine_no', 'Engine no is required.').notEmpty()
							req.checkBody('chassis_no', 'Chassi no is required.').notEmpty()
							req.checkBody('load_capacity', 'Load capacity is required.').notEmpty()
							req.checkBody('make', 'Make is required.').notEmpty()
							req.checkBody('model', 'Model is required.').notEmpty()
		
							let errors = req.validationErrors();
							if (errors)
							{
								res.render(renderHtml,
								 {
									formData :requestData,
									groups:groupResults,
									types:typeResults,	
									moment:moment,									
									PAGETITLE:LANGTEXT.EDITVEHICLETITLE,csrfToken: req.csrfToken(),
									errordata : errors
								});
							}
							else
							{
								
							Genernal.checkUquieFieldWithUser('vehicle_no',requestData.vehicle_no,'vehicles',req.session.user.id,recordID,'vehicle_id',function(err, countries) 
							{
								 if(err)
								 {	
									 res.render(renderHtml,
									 {
										formData :requestData,
										groups:groupResults,
										types:typeResults,
										 moment:moment,
										PAGETITLE:LANGTEXT.EDITVEHICLETITLE,csrfToken: req.csrfToken(),
										errordata : [ { msg: 'Vehicle no '+LANGTEXT.ALLREADYEXITS }],
									});
								 }
								 else
								 {
									 if(countries)
									 {		

														delete requestData._csrf;
														delete requestData.record_id;
														delete requestData.field_name;
														
														//console.log("requestData==",requestData);
														
														requestData.renew_date =FUNCTIONS.dateINYYYYMMDD(requestData.renew_date);
														requestData.finance_date_from =FUNCTIONS.dateINYYYYMMDD(requestData.finance_date_from);
														requestData.finance_date_to =FUNCTIONS.dateINYYYYMMDD(requestData.finance_date_to);
														requestData.installment_date =FUNCTIONS.dateINYYYYMMDD(requestData.installment_date);
														
														//console.log("requestData==",requestData);
														let conditions = {vehicle_id:recordID,user_id:req.session.user.id};
														Genernal.update(requestData,'vehicles',conditions,function(err,resultdata)
														{
															if(err)
															{
																res.render(renderHtml,
																 {
																	formData :requestData,
																	groups:groupResults,
																	types:typeResults,
																	 moment:moment,
																	PAGETITLE:LANGTEXT.EDITVEHICLETITLE,csrfToken: req.csrfToken(),
																	errordata : [ { msg: LANGTEXT.PLZTRY }],
																});
														
															}else
															{
															   req.flash('success', LANGTEXT.USEREDITED);
																res.redirect(actualredirectURL);													 
															}
															
															
														});
														
										
									 }
									  else
									 {
										 res.render(renderHtml,
										 {
											formData :requestData,
											groups:groupResults,
											types:typeResults,
											 moment:moment,
											PAGETITLE:LANGTEXT.EDITVEHICLETITLE,csrfToken: req.csrfToken(),
											errordata : [ { msg: LANGTEXT.PLZTRY }],
										}); 
									 }	
								 }
							});
								      
							}	
						}
						else
						{
						  	res.render(renderHtml,
								 {
									formData :results[0],
									groups:groupResults,
									types:typeResults,
									 moment:moment,
									PAGETITLE:LANGTEXT.EDITVEHICLETITLE,csrfToken: req.csrfToken(),
								});
						}
							
					 }
					 else
					 {
						req.flash('error', LANGTEXT.INVALIDREQUEST);
						res.redirect(errorRedirectURL); 
					 }
				 
						 
				}
				else
				{
				   req.flash('error', LANGTEXT.INVALIDREQUEST);
				   res.redirect(errorRedirectURL);
				}
			
			}
		});
		});
		});
}




 /**
 * define addCountry function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.addVehicle = function(req, res) 
{  							
     let requestData = req.body;
	 let redirectURL = '/vehicles/index';
	 let renderHtml = 'vehicles/add-vehicle.html';
	 let query ='select vehicle_group_id,vehicle_group from vehicle_groups where status=1 and user_id="'+req.session.user.id+'"';
	  Genernal.findAll(query,function(err,groupResults)
	 {
		
		 if(Object.keys(groupResults).length ==0)
		 {
			req.flash('error', LANGTEXT.PLZCREATEVEHICLEGROUP);
			res.redirect(redirectURL);
			return false;
		 }
		  let typequery ='select vehicle_type_id,vehicle_type from vehicle_types where status=1 and user_id="'+req.session.user.id+'"';
	
		Genernal.findAll(typequery,function(err,typeResults)
		{
		
		 if(Object.keys(typeResults).length ==0)
		 {
			req.flash('error', LANGTEXT.PLZCREATEVEHICLETYPE);
			res.redirect(redirectURL);
			return false;
		 }
		 
	if (Object.keys(requestData).length !==0)
	{
		req.checkBody('vehicle_no', 'Vehicle No is required.').notEmpty()
		req.checkBody('owner_type', 'Vehicle owner type is required.').notEmpty()
		
		req.checkBody('account_id', 'Vehicle Owner/Account Name.').notEmpty()
		req.checkBody('vehicle_group_id', 'Vehicle Group is required.').notEmpty()
		req.checkBody('capacity', 'Capacity in ton is required.').notEmpty()
		req.checkBody('average', 'Vehicle average is required.').notEmpty()
		req.checkBody('vehicle_type_id', 'Vehicle type is required.').notEmpty()
		req.checkBody('RTO', 'RTO is required.').notEmpty()
		
		req.checkBody('engine_no', 'Engine no is required.').notEmpty()
		req.checkBody('chassis_no', 'Chassi no is required.').notEmpty()
		req.checkBody('load_capacity', 'Load capacity is required.').notEmpty()
		req.checkBody('make', 'Make is required.').notEmpty()
		req.checkBody('model', 'Model is required.').notEmpty()
		 
		let errors = req.validationErrors();
		if (errors)
		{
		res.render(renderHtml,
			 {
				formData :requestData,
				PAGETITLE:LANGTEXT.ADDVEHICLE,csrfToken: req.csrfToken(),
				errordata : errors,
				groups:groupResults,
				types:typeResults
			});
		}
		else
		{
			Genernal.checkUquieFieldWithUser('vehicle_no', requestData.vehicle_no,'vehicles',req.session.user.id,'','', function(err, checkresults) 
			{
				 if(err)
				 {	
					 res.render(renderHtml,
					 {
						formData :requestData,
						groups:groupResults,
						types:typeResults,
						PAGETITLE:LANGTEXT.ADDVEHICLE,csrfToken: req.csrfToken(),
						errordata : [ { msg: 'vehicle no '+LANGTEXT.ALLREADYEXITS }],
					});
				 }
				 else
				 {
					 if(checkresults)
					 {	
								delete requestData._csrf;
								 requestData.vehicle_id=UID();
								 requestData.user_id = req.session.user.id;
								 requestData.renew_date =FUNCTIONS.dateINYYYYMMDD(requestData.renew_date);
								 requestData.finance_date_from =FUNCTIONS.dateINYYYYMMDD(requestData.finance_date_from);
								 requestData.finance_date_to =FUNCTIONS.dateINYYYYMMDD(requestData.finance_date_to);
								 requestData.installment_date =FUNCTIONS.dateINYYYYMMDD(requestData.installment_date);
								 FUNCTIONS.dateINYYYYMMDD('25-05-20019');
								 
						Genernal.save(requestData,'vehicles',function(err,result)
							{
								if(err)
								{
									res.render(renderHtml,
									{
										formData :requestData,
										groups:groupResults,
										types:typeResults,
										PAGETITLE:LANGTEXT.ADDVEHICLE,csrfToken: req.csrfToken(),
										errordata : [ { msg: LANGTEXT.PLZTRY }],
									});
							
								}else
								{
								   req.flash('success', LANGTEXT.USERADDED);
									res.redirect(redirectURL);													 
								}
								
							});					 
						}
					 else
					 {
						 res.render(renderHtml,
						 {
							formData :requestData,
							groups:groupResults,
							types:typeResults,
							PAGETITLE:LANGTEXT.ADDVEHICLE,csrfToken: req.csrfToken(),
							errordata : [ { msg:LANGTEXT.SOMETHINGWENTWRONG}],
						}); 
					 }					 
						 
				 }
			 });
		}
	}
	
	else
	{
		res.render(renderHtml,
		{
			groups:groupResults,
			types:typeResults,
			PAGETITLE:LANGTEXT.ADDVEHICLETITLE,
			csrfToken: req.csrfToken()
		});
	}
		});
	 });
}


 /**
 * define allCountries function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.allVehicles= function(req, res) 
{  
     
	 /**
	 *define variable for pagination
	 *start code for pagination
	 */
	 let totalRecords;
	 let totalNoPages;
	 let start=0;
	 let currentPage=1;
	 let conditions;
	 let records_per_page = process.env.PERPAGE; 
	 let renderHtml = 'vehicles/vechicles.html';
	 let limit;
	  let tableName='vehicles';
	  if (typeof req.query.page !== 'undefined') 
	    {
            currentPage = req.query.page;
        }
      if(currentPage >1)
	  {
     
       start = (currentPage - 1) * records_per_page;
      }
	  	limit = ' limit '+start+','+records_per_page;
	
	  /**
	 *end code for pagination
	 */
   
     let searchkeycondition='';
      /**
	 *check search key
	 */
	  if (typeof req.query.search !== 'undefined') 
		{
			let searchkey = req.query.search;
			searchkeycondition = " and CONCAT_ws('', vehicle_no,capacity,average,RTO,engine_no,chassis_no,load_capacity,make"+
			",model,insurance_company,policy_no,renew_date,finance_company_name,finance_amount,finance_date_from,finance_date_to"+
			",installment_amount,installment_date) LIKE '%"+searchkey.replace(/\s\s+/g, ' ')+"%'";
		}
		
		
	/**
    * check order by
	*/	
	//let defaultorderBY = ' order by updated desc ';
	let defaultorderBY;
	let orderBy ='created';
	let orderType= 'desc';
	
	if(typeof req.query.orderBy !== 'undefined' && typeof req.query.orderType !== 'undefined') 
	    {
             orderBy = req.query.orderBy;
			 orderType= req.query.orderType;
			defaultorderBY = ' order by '+orderBy+' '+orderType;
        }
		else
		{
			defaultorderBY = ' order by '+orderBy+' '+orderType;
		}
		
    
	 let PageSlug  = req.params.CountrySlug;
	
		conditions ="where ST.user_id = '"+ req.session.user.id+"'";
		
	  var pageTitle =LANGTEXT.ALLVEHICLE;
	 if(PageSlug=='active')
	 {
		 pageTitle = LANGTEXT.ACTIVEVEHICLE;
		 conditions =conditions+ ' and status=1';
	 }
	 else if(PageSlug=='deactive')
	 {
		 pageTitle = LANGTEXT.DEACTIVEVEHICLE;
		 conditions =conditions+ ' and status=0';
	 }
	 
	let query = "select ST.vehicle_id,ST.user_id,ST.vehicle_no,ST.owner_type,VT.vehicle_type,VG.vehicle_group,ST.account_id,ACC.account_name,ST.vehicle_type_id,ST.vehicle_group_id,ST.RTO,ST.chassis_no,"+
	"ST.engine_no,ST.model,ST.is_delete,ST.status,ST.created from "+tableName+" as ST INNER JOIN accounts as ACC ON ST.account_id=ACC.account_id "+
	"INNER JOIN vehicle_groups as VG ON ST.vehicle_group_id=VG.vehicle_group_id "+
	"INNER JOIN vehicle_types as VT ON ST.vehicle_type_id=VT.vehicle_type_id "+conditions+searchkeycondition+defaultorderBY+limit;
	
	//console.log(query);
	
	
	let totalCountQuery = "select count(*) as totalRecord from "+tableName+" as ST "+conditions+searchkeycondition;	
	let pageUri='/'+tableName+'/'+PageSlug;
	/**
	*start sorting functionality
	*/
	 let setSortingQueryString='';
	 let QuertyData= req.query;
	 delete QuertyData.page;
	 delete QuertyData.orderBy;
	 delete QuertyData.orderType;
	 if(JSON.stringify(QuertyData)!='{}')
	 {
		  for(var key in QuertyData) 
		  {    
			   setSortingQueryString = setSortingQueryString+ key+"="+QuertyData[key]+'&';
		   }
		 setSortingQueryString = '&'+setSortingQueryString.substring(0, setSortingQueryString.length-1);
	 }
	 
	 /**
	*end sorting functionality
	*/
	
	req.query.orderType=orderType;
	req.query.orderBy=orderBy;
	dbConnection.getConnection(function(err, db)
	{
		if (err) throw err;	
		db.query(totalCountQuery,function(err,totalCountResults)
		{
			
			
			if(err)
			{
				req.flash('error', LANGTEXT.DATABASESYSERROR);
				res.render(renderHtml,
				{
					PAGETITLE:pageTitle,
				});
			}
			else
			{
				//console.log(totalCountResults);
				db.query(query,function(err,results)
				{  db.release();
				
					if(err)
					{
						//return callback(LANGTEXT.LOGIN_ERROR);
						 req.flash('error', LANGTEXT.DATABASESYSERROR);
						res.render(renderHtml,
						{
							PAGETITLE:pageTitle
						});
					}else
					{   
				           var bufferURL = Buffer.from(req.originalUrl);
						   var redirectURL = bufferURL.toString('base64');
						   
						   /*console.log("req.query",req.query);
						   console.log("currentPage",currentPage);
						   console.log("pageUri",pageUri);*/
						   
						     pageUri = pageUri.replace('_','-');
						  let totalRecords = totalCountResults[0].totalRecord;
						  totalNoPages = Math.ceil(totalRecords / records_per_page);
						  
						   const Paginate = new Pagination(totalRecords,currentPage,pageUri,records_per_page,req.query);
						
						//console.log("results=====",results);
						
					   res.render(renderHtml,
						{
							PAGETITLE:pageTitle,
							 pages : Paginate.links(),
							 results :results,
							 QueryStringData:req.query,
							 moment:moment,
							 setSortingQueryString:setSortingQueryString,
							 csrfToken: req.csrfToken(),
							 redirectOriginalUrl:req.originalUrl,
							 redirctURL:redirectURL,
							 PageSlug:PageSlug
						});
					}
				});	
			}
		});	
	});
}

