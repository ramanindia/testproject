'use strict';

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
			Genernal.updateStatus(requestData,'drivers','driver_id',req.session.user.id, function(err, results) 
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


exports.changeLicenceStatus = function(req, res) 
{  								
     let requestData = req.body;
	  console.log("requestData====",requestData);
	if (Object.keys(requestData).length !==0)
	{ 
		let updateIds = requestData.records_id;
		
		 if(updateIds !== undefined)
		 {
			Genernal.updateStatus(requestData,'driver_licenses','driver_license_id',req.session.user.id, function(err, results) 
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
 * define changeStatus function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.deleteRecord = function(req, res) 
{  								
	  let deleteID  = req.params.deleteRecordId;
	  
	 let QueryRedirectURL = req.query.redirectURL;
	 let actualredirectURL ='/drivers/index';
		 try
			{
			var b = Buffer.from(QueryRedirectURL, 'base64')
			 actualredirectURL = b.toString('utf8');
			}
			catch (err)
			{
				req.flash('error', 'Something missing wrong. Invalid request. please try again');
				res.redirect('/drivers/index');
				 return false;
			}
		if(QueryRedirectURL !== 'undefined')
		{
					
			Genernal.checkRecords('driver_id', deleteID,'vehicle_drivers',req.session.user.id, function(err, results) 
			{
				 if(err)
				 {			 
						req.flash('error', err);
						res.redirect(actualredirectURL); 
				 }				 
				 else
				 {
					// console.log("res==",actualredirectURL);
					 
					 
					 Genernal.deleteDeactiveRecord('driver_id',deleteID,'drivers',req.session.user.id, function(err, delresults) 
						{
							 if(err)
							 {
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
 * define changeStatus function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.deleteLicenseRecord = function(req, res) 
{  								
	  let deleteID  = req.params.deleteRecordId;
	  
	 let QueryRedirectURL = req.query.redirectURL;
	 let actualredirectURL ='/drivers/index';
		 try
			{
			var b = Buffer.from(QueryRedirectURL, 'base64')
			 actualredirectURL = b.toString('utf8');
			}
			catch (err)
			{
				req.flash('error', 'Something missing wrong. Invalid request. please try again');
				res.redirect('/drivers/index');
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
					 
					 Genernal.deleteDeactiveRecord('driver_license_id',deleteID,'driver_licenses',req.session.user.id, function(err, delresults) 
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
 * define countryEdit function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.DriverEdit = function(req, res) 
{  					
	 let recordID  = req.params.recordId;
	 let QueryRedirectURL = req.query.redirectURL;
	 let errorRedirectURL = '/drivers/index';
	 let renderHtml = 'drivers/edit-driver.html';
	 let actualredirectURL='/drivers/index';
	 Genernal.findAll('select account_id,account_name from accounts where status=1 and user_id="'+req.session.user.id+'"',function(err,results)
	 {
		
		 if(Object.keys(results).length ==0)
		 {
			req.flash('error', LANGTEXT.PLZCREATEACC);
			res.redirect(errorRedirectURL);
			return false;
		 }
    Genernal.findAll('select * from countries where status=1 and user_id="'+req.session.user.id+'"',function(err,resultsdata)
	 {
		// console.log("countryRsults==",countryRsults);
		 if(Object.keys(resultsdata).length == 0)
		 {
			req.flash('error',LANGTEXT.PLZCREATEFIRSTCOUNTRY );
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
			
			 let getDataQuery = 'select driver_id,driver_name,ST.account_id,local_address,permanent_address,ST.mobile_no,mobile_no2,AG.account_name,AG.account_id,'+
			 'aadhar_card_no,police_station,permanent_police_station,ST.remarks,basic_salery,per_day_salary,'+
			 'ST.city_id,ST.district_id,ST.state_id,ST.country_id,permanent_city_id,permanent_district_id,permanent_state_id,permanent_country_id,DIST.district_name as district_name,DISTRICTP.district_name as pdistrict_name,CITY.city_name as city_name,CITYP.city_name as pcity_name,COUNTRY.country_name as country_name,COUNTRYP.country_name as pcountry_name,CNTY.state_name as state_name,STATEP.state_name as pstate_name,ST.is_delete as STATEDELETE,ST.user_id as STATEUSERID,'+
	'ST.status as STATESTATUS,ST.created AS STATECREATED from drivers as ST INNER JOIN accounts as AG ON ST.account_id=AG.account_id inner join states as CNTY on ST.state_id=CNTY.state_id INNER JOIN countries as COUNTRY on COUNTRY.country_id=CNTY.country_id INNER JOIN countries as COUNTRYP on COUNTRYP.country_id=ST.permanent_country_id '+
	' INNER JOIN states as STATEP on STATEP.state_id=ST.permanent_state_id INNER JOIN districts as DISTRICTP on DISTRICTP.district_id=ST.permanent_district_id  INNER JOIN cities as CITYP on CITYP.city_id=ST.permanent_city_id INNER join districts as DIST on ST.district_id=DIST.district_id INNER join cities as CITY on ST.city_id=CITY.city_id where ST.driver_id="'+recordID+'" and ST.user_id="'+req.session.user.id+'"';
	
	
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
						 //console.log(results);
						 
						 let requestData = req.body;		
						if (Object.keys(requestData).length !==0)
						{
							req.checkBody('driver_name', 'Driver name is required.').notEmpty()
							req.checkBody('account_id', 'Account name is required.').notEmpty()
							req.checkBody('country_id', 'Local Country is required.').notEmpty()
							req.checkBody('state_id', 'Local State is required.').notEmpty()
							req.checkBody('district_id', 'Local District is required.').notEmpty()
							req.checkBody('city_id', 'Local City is required.').notEmpty()
							req.checkBody('local_address', 'local address is required.').notEmpty()
							req.checkBody('police_station', 'local Police station is required.').notEmpty()
							req.checkBody('permanent_country_id', 'Permanent Country is required.').notEmpty()
							req.checkBody('permanent_state_id', 'Permanent State is required.').notEmpty()
							req.checkBody('permanent_district_id', 'Permanent District is required.').notEmpty()
							req.checkBody('permanent_city_id', 'Permanent City is required.').notEmpty()
							req.checkBody('permanent_address', 'Permanent address is required.').notEmpty()
							req.checkBody('permanent_police_station', 'Permanent Police station is required.').notEmpty()
							req.checkBody('aadhar_card_no', 'Aadhar card no is required.').notEmpty()
							req.checkBody('per_day_salary', 'per day salary is required.').notEmpty()
							req.checkBody('basic_salery', 'Basic salary is required.').notEmpty()
							
							let errors = req.validationErrors();
							if (errors)
							{
								res.render(renderHtml,
								 {
									formData :requestData,
									PAGETITLE:LANGTEXT.EDITDRIVERTITLE,csrfToken: req.csrfToken(),
									errordata : errors,
									data1:results,
									data2:resultsdata,
								});
							}
							else
							{
								
							Genernal.checkUquieFieldWithUser('driver_name',requestData.driver_name,'drivers',req.session.user.id,recordID,'driver_id',function(err, checkresults) 
							{
								 if(err)
								 {	
									 res.render(renderHtml,
									 {
										formData :requestData,
										PAGETITLE:LANGTEXT.EDITDRIVERTITLE,csrfToken: req.csrfToken(),
										errordata : [ { msg: 'Driver name '+LANGTEXT.ALLREADYEXITS }],
										data1:results,
										data2:resultsdata,
									});
								 }
								 else
								 {
									 if(checkresults)
									 {					 delete requestData._csrf;
														 delete requestData.record_id;
														 delete requestData.field_name;
														let conditions = {driver_id:recordID,user_id:req.session.user.id};
														Genernal.update(requestData,'drivers',conditions,function(err,resultdata)
														{
															if(err)
															{
																res.render(renderHtml,
																 {
																	formData :requestData,
																	PAGETITLE:LANGTEXT.EDITDRIVERTITLE,csrfToken: req.csrfToken(),
																	errordata : [ { msg: LANGTEXT.PLZTRY }],
																	data1:results,
																	data2:resultsdata,
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
											PAGETITLE:LANGTEXT.EDITDRIVERTITLE,csrfToken: req.csrfToken(),
											errordata : [ { msg: LANGTEXT.PLZTRY }],
											data1:results,
											data2:resultsdata,
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
									PAGETITLE:LANGTEXT.EDITDRIVERTITLE,csrfToken: req.csrfToken(),
									data1:results,
									data2:resultsdata,
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
 * define countryEdit function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.DriverLicenseEdit = function(req, res) 
{  					
	 let recordID  = req.params.recordId;
	 let driverID = req.params.driverId;
	 let QueryRedirectURL = req.query.redirectURL;
	 let errorRedirectURL =  '/drivers/licence/'+recordID+'?page_action=all';
	 
	 let licenceRedirectURL = '/drivers/licence/'+recordID+'?page_action=all';
	 
	 let renderHtml = 'drivers/edit-licence.html';

	 let actualredirectURL='/drivers/licence/'+recordID+'?page_action=all';
	 
	 Genernal.findAll('select driver_id,driver_name from drivers where status=1 and driver_id="'+driverID+'"',function(err,results)
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
			
			 let getDataQuery = 'select	driver_license_id,user_id,driver_id,license_name,license_no,license_issue_date,license_expire_date,status  from driver_licenses as ST where ST.driver_license_id="'+recordID+'" and ST.user_id="'+req.session.user.id+'"';
	
	
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
							req.checkBody('license_name', 'License name is required.').notEmpty()
							req.checkBody('license_no', 'License no is required.').notEmpty()
			
							req.checkBody('license_issue_date', 'License issue date is required.').notEmpty()
							req.checkBody('license_expire_date', 'License expire date is required.').notEmpty()
							
							let errors = req.validationErrors();
							if (errors)
							{
								res.render(renderHtml,
								 {
									formData :requestData,
									 moment:moment,
									 DRIVERID:driverID,
									PAGETITLE:LANGTEXT.EDITLICENCETITLE,csrfToken: req.csrfToken(),
									errordata : errors,
									
								});
							}
							else
							{
								
							Genernal.checkUquieFieldWithUser('license_name',requestData.license_name,'driver_licenses',req.session.user.id,recordID,'driver_license_id',function(err, checkresults) 
							{
								 if(err)
								 {	
									 res.render(renderHtml,
									 {
										formData :requestData,
										 moment:moment,
										  DRIVERID:driverID,
										PAGETITLE:LANGTEXT.EDITLICENCETITLE,csrfToken: req.csrfToken(),
										errordata : [ { msg: 'Licenses name '+LANGTEXT.ALLREADYEXITS }],
	
									});
								 }
								 else
								 {
									 if(checkresults)
									 {					 delete requestData._csrf;
														 delete requestData.record_id;
														 delete requestData.field_name;
														let conditions = {driver_license_id:recordID,user_id:req.session.user.id};
														Genernal.update(requestData,'driver_licenses',conditions,function(err,resultdata)
														{
															if(err)
															{
																res.render(renderHtml,
																 {
																	formData :requestData,
																	 moment:moment,
																	  DRIVERID:driverID,
																	PAGETITLE:LANGTEXT.EDITLICENCETITLE,csrfToken: req.csrfToken(),
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
											  DRIVERID:driverID,
											PAGETITLE:LANGTEXT.EDITLICENCETITLE,csrfToken: req.csrfToken(),
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
									  DRIVERID:driverID,
									PAGETITLE:LANGTEXT.EDITLICENCETITLE,csrfToken: req.csrfToken(),
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
 * define addCountry function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.Licence = function(req, res) 
{  								
 
	 let recordID  = req.params.recordId;
	  let driverRedirecturl = '/drivers/index';
	 Genernal.checkRecords('driver_id', recordID,'drivers',req.session.user.id, function(err, checkdriverID) 
	{
					
					if(checkdriverID)
					{
					      
							req.flash('error', LANGTEXT.INVALIDREQUEST);
							res.redirect(driverRedirecturl);
							return false;
					}
											
					
						 
	 let QueryRedirectURL = req.query.redirectURL;

	 let queryAction = req.query.page_action;
	
     let requestData = req.body;
	 let licenceRedirectURL = '/drivers/licence/'+recordID+'?page_action=all';
	 
	 //console.log("queryAction==",queryAction)
	 var renderHtml='';
	 if(queryAction==='new')
	 {
		
	  renderHtml = 'drivers/add-licence.html';
	 }
	 else if(queryAction==='all')
	 {
	  renderHtml = 'drivers/licence.html';
	 }
	 // console.log("renderHtml==",renderHtml);
	  
	 Genernal.findAll('select driver_id,driver_name from drivers where status=1 and user_id="'+req.session.user.id+'"',function(err,results)
	 {
		
		 if(Object.keys(results).length ==0)
		 {
			req.flash('error', LANGTEXT.PLZCREATELICENCE);
			res.redirect(QueryRedirectURL);
			return false;
		 }
	 if(queryAction=='all')
	 {
		 
		//console.log("listing is here"); 
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
	  let tableName='driver_licenses';
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
			searchkeycondition = " and CONCAT_ws('',license_name,license_no,license_issue_date,license_expire_date) LIKE '%"+searchkey.replace(/\s\s+/g, ' ')+"%'";
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
	
		conditions ="where ST.user_id = '"+ req.session.user.id+"' and ST.driver_id = '"+ recordID+"'";
		
	  var pageTitle =LANGTEXT.ALLLICENCE;
	 if(PageSlug=='active')
	 {
		 pageTitle = LANGTEXT.ACTIVELICENCE;
		 conditions =conditions+ ' and ST.status=1';
	 }
	 else if(PageSlug=='deactive')
	 {
		 pageTitle = LANGTEXT.DEACTIVELICENCE;
		 conditions =conditions+ ' and ST.status=0';
	 }
	 
	 //console.log("searchkeycondition===",searchkeycondition);
	 
	// console.log("conditions===",conditions);
	 
	let query = "select ST.driver_license_id,ST.license_no,ST.user_id,ST.driver_id,ST.license_name,ST.license_name,ST.license_issue_date,ST.license_expire_date,AG.driver_name,"+
	"ST.is_delete,ST.status,ST.created from "+tableName+" as ST INNER JOIN drivers as AG ON ST.driver_id=AG.driver_id "+conditions+searchkeycondition+defaultorderBY+limit;
	
	//console.log("query==",query);
	
	
	let totalCountQuery = "select count(*) as totalRecord from "+tableName+" as ST "+conditions+searchkeycondition;	
	//console.log("totalCountQuery==",totalCountQuery);
	let pageUri='/drivers/licence/'+recordID;
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
							 driverID:recordID,
						});
					}
				});	
			}
		});	
	});
		 

	 }
	 else  if(queryAction=='new' || queryAction=='edit') 
	 {
		if (Object.keys(requestData).length !==0)
		{
			req.checkBody('license_name', 'License name is required.').notEmpty()
			req.checkBody('license_no', 'License no is required.').notEmpty()
			
			req.checkBody('license_issue_date', 'License issue date is required.').notEmpty()
			req.checkBody('license_expire_date', 'License expire date is required.').notEmpty()

			let errors = req.validationErrors();
			if (errors)
			{
			res.render(renderHtml,
				 {
					formData :requestData,
					PAGETITLE:LANGTEXT.ADDLICENCETITLE,csrfToken: req.csrfToken(),
					errordata : errors
				});
			}
			else
			{    var recordLICID = '';
		         var fieldID = '';
				 if(queryAction=='edit')
				 {
					  var recordLICID =recordID;
					 var fieldID ='driver_license_id';
				 }
				Genernal.checkUquieFieldWithUser('license_name', requestData.license_name,'driver_licenses',req.session.user.id,recordLICID,fieldID, function(err, checkresults) 
				{
					 if(err)
					 {	
						 res.render(renderHtml,
						 {
							formData :requestData,
							PAGETITLE:LANGTEXT.ADDLICENCETITLE,csrfToken: req.csrfToken(),
							errordata : [ { msg: 'License name '+LANGTEXT.ALLREADYEXITS }],
						});
					 }
					 else
					 {
						 if(checkresults)
						 {		
						if(queryAction=='edit')
						 {
							 
						 }
						 else 
						 {
									 delete requestData._csrf;
									 requestData.driver_license_id=UID();
									 requestData.driver_id=recordID;
									 requestData.user_id = req.session.user.id;
									 
							Genernal.save(requestData,'driver_licenses',function(err,result)
								{
									if(err)
									{
										res.render(renderHtml,
										{
											formData :requestData,
											PAGETITLE:LANGTEXT.ADDLICENCETITLE,csrfToken: req.csrfToken(),
											errordata : [ { msg: LANGTEXT.PLZTRY }],
										});
								
									}else
									{
										//console.log("licenceRedirectURL===",licenceRedirectURL);
										
									   req.flash('success', LANGTEXT.USERADDED);
										res.redirect(licenceRedirectURL);													 
									}
									
								});	
						    }								
						 }
						 else
						 {
							 res.render(renderHtml,
							 {
								formData :requestData,
								PAGETITLE:LANGTEXT.ADDLICENCETITLE,csrfToken: req.csrfToken(),
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
				PAGETITLE:LANGTEXT.ADDLICENCETITLE,DRIVERID:recordID,csrfToken: req.csrfToken()
			});
		}
	 }
	 else 
      {
		   req.flash('error',LANGTEXT.INVALIDREQUEST);
		   res.redirect(licenceRedirectURL);	
		 }

	  });
    });
}




 /**
 * define addCountry function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.AddDriver = function(req, res) 
{  								
     let requestData = req.body;
	 let redirectURL = '/drivers/index';
	 let renderHtml = 'drivers/add-driver.html';
	 Genernal.findAll('select account_id,account_name from accounts where status=1 and user_id="'+req.session.user.id+'"',function(err,results)
	 {
		
		 if(Object.keys(results).length ==0)
		 {
			req.flash('error', LANGTEXT.PLZCREATEACC);
			res.redirect(redirectURL);
			return false;
		 }
		 
	 Genernal.findAll('select country_id,country_name from countries where status=1 and is_delete=0 and user_id="'+req.session.user.id+'"',function(err,resultsdata)
	    {
			 //console.log("results===",Object.keys(results).length);
			 if(Object.keys(results).length ==0)
			 {
				req.flash('error',LANGTEXT.PLZCREATEFIRSTCOUNTRY );
				res.redirect(redirectURL);
				return false;
			 }
	 
	if (Object.keys(requestData).length !==0)
	{
		req.checkBody('driver_name', 'Driver name is required.').notEmpty()
		req.checkBody('account_id', 'Account name is required.').notEmpty()
		
		req.checkBody('country_id', 'Local Country is required.').notEmpty()
		req.checkBody('state_id', 'Local State is required.').notEmpty()
		req.checkBody('district_id', 'Local District is required.').notEmpty()
		req.checkBody('city_id', 'Local City is required.').notEmpty()
		req.checkBody('local_address', 'local address is required.').notEmpty()
		req.checkBody('police_station', 'local Police station is required.').notEmpty()
		
		req.checkBody('permanent_country_id', 'Permanent Country is required.').notEmpty()
		req.checkBody('permanent_state_id', 'Permanent State is required.').notEmpty()
		req.checkBody('permanent_district_id', 'Permanent District is required.').notEmpty()
		req.checkBody('permanent_city_id', 'Permanent City is required.').notEmpty()
		req.checkBody('permanent_address', 'Permanent address is required.').notEmpty()
		req.checkBody('permanent_police_station', 'Permanent Police station is required.').notEmpty()
		req.checkBody('aadhar_card_no', 'Aadhar card no is required.').notEmpty()
		req.checkBody('per_day_salary', 'per day salary is required.').notEmpty()
		req.checkBody('basic_salery', 'Basic salary is required.').notEmpty()

		let errors = req.validationErrors();
		if (errors)
		{
		res.render(renderHtml,
			 {
				formData :requestData,
				PAGETITLE:LANGTEXT.ADDDRIVERTITLE,csrfToken: req.csrfToken(),
				errordata : errors,
				data1:results,
				data2:resultsdata,
			});
		}
		else
		{
			Genernal.checkUquieFieldWithUser('driver_name', requestData.driver_name,'drivers',req.session.user.id,'','', function(err, checkresults) 
			{
				 if(err)
				 {	
					 res.render(renderHtml,
					 {
						formData :requestData,
						PAGETITLE:LANGTEXT.ADDDRIVERTITLE,csrfToken: req.csrfToken(),
						errordata : [ { msg: 'Driver name '+LANGTEXT.ALLREADYEXITS }],
						data1:results,
						data2:resultsdata,
					});
				 }
				 else
				 {
					 if(checkresults)
					 {		
						
								 delete requestData._csrf;
								 requestData.driver_id=UID();
								 requestData.user_id = req.session.user.id;
								 
						Genernal.save(requestData,'drivers',function(err,result)
							{
								if(err)
								{
									res.render(renderHtml,
									{
										formData :requestData,
										PAGETITLE:LANGTEXT.ADDDRIVERTITLE,csrfToken: req.csrfToken(),
										errordata : [ { msg: LANGTEXT.PLZTRY }],
										data1:results,
										data2:resultsdata,
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
							PAGETITLE:LANGTEXT.ADDDRIVERTITLE,csrfToken: req.csrfToken(),
							errordata : [ { msg:LANGTEXT.SOMETHINGWENTWRONG}],
							data1:results,
							data2:resultsdata,
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
			PAGETITLE:LANGTEXT.ADDDRIVERTITLE,data1:results,data2:resultsdata,	csrfToken: req.csrfToken()
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
exports.allDrivers = function(req, res) 
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
	 let renderHtml = 'drivers/drivers.html';
	 let limit;
	  let tableName='drivers';
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
			searchkeycondition = " and CONCAT_ws('',driver_name,local_address,permanent_address,mobile_no,mobile_no2,aadhar_card_no,police_station,permanent_police_station,basic_salery,per_day_salary) LIKE '%"+searchkey.replace(/\s\s+/g, ' ')+"%'";
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
	
		conditions ="where ST.user_id = '"+ req.session.user.id+"'";
		
	  var pageTitle =LANGTEXT.ALLDRIVER;
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
	 
	let query = "select ST.driver_id,ST.driver_id,ST.driver_name,ST.account_id,ST.local_address,ST.permanent_address,ST.mobile_no,ST.aadhar_card_no,"+
	"ST.police_station,ST.permanent_police_station,ST.permanent_police_station,ST.basic_salery,ST.per_day_salary,ST.is_delete,ST.status,ST.created,AG.account_name from "+tableName+" as ST INNER JOIN accounts as AG ON ST.account_id=AG.account_id "+conditions+searchkeycondition+defaultorderBY+limit;
	
	//console.log("query==",query);
	let totalCountQuery = "select count(*) as totalRecord from "+tableName+" as ST "+conditions+searchkeycondition;	
	//console.log("totalCountQuery==",totalCountQuery);
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
						   
						   //console.log("req.query",req.query);
						  let totalRecords = totalCountResults[0].totalRecord;
						  totalNoPages = Math.ceil(totalRecords / records_per_page);
						    pageUri = pageUri.replace('_','-');
						   const Paginate = new Pagination(totalRecords,currentPage,pageUri,records_per_page,req.query);
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

