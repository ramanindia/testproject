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
			Genernal.updateStatus(requestData,'banks','bank_id',req.session.user.id, function(err, results) 
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
	 let actualredirectURL ='/banks/index';
		 try
			{
			var b = Buffer.from(QueryRedirectURL, 'base64')
			 actualredirectURL = b.toString('utf8');
			}
			catch (err)
			{
				req.flash('error', 'Something missing wrong. Invalid request. please try again');
				res.redirect('/banks/index');
				 return false;
			}
		if(QueryRedirectURL !== 'undefined')
		{
					
			Genernal.checkRecords('from_from_destination_id', deleteID,' lr_entries',req.session.user.id, function(err, results) 
			{
				 if(err)
				 {			 
						req.flash('error', err);
						res.redirect(actualredirectURL); 
				 }				 
				 else
				 {
					// console.log("res==",actualredirectURL);
					 
					 
					 Genernal.deleteDeactiveRecord('bank_id',deleteID,'banks',req.session.user.id, function(err, delresults) 
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
 * define countryEdit function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.DriverEdit = function(req, res) 
{  					 
	 let recordID  = req.params.recordId;
	 let QueryRedirectURL = req.query.redirectURL;
	 let errorRedirectURL = '/banks/index';
	 let renderHtml = 'banks/edit-bank.html';
	 let actualredirectURL='/banks/index';
	 
    Genernal.findAll('select * from countries where status=1 and user_id="'+req.session.user.id+'"',function(err,dataResults)
	 {
		// console.log("countryRsults==",countryRsults);
		 if(Object.keys(dataResults).length == 0)
		 {
			req.flash('error', 'Please create country and active');
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
				req.flash('error', 'Something missing wrong. Invalid request. please try again');
				res.redirect(errorRedirectURL);
				 return false;
			}
			//let getDataQuery = 'select city_id,city_name,cities.district_id,cities.state_id,cities.country_id,cities.user_id,districts.district_name,states.state_name from cities INNER join districts on cities.district_id= districts.district_id INNER JOIN states on states.state_id=cities.state_id INNER join cities as CITY on ST.city_id=CITY.city_id where cities.city_id="'+recordID+'" and districts.user_id="'+req.session.user.id+'"';
			
			 let getDataQuery = 'select bank_id,bank_name,bank_code,account_no,branch,ifsc_code,address,area,pin_code,phone_no,mobile_no,email,ST.city_id,ST.district_id,ST.state_id,ST.country_id,district_name,city_name,country_name,state_name,ST.is_delete as STATEDELETE,ST.user_id as STATEUSERID,'+
	'ST.status as STATESTATUS,ST.created AS STATECREATED from banks as ST inner join states as CNTY on ST.state_id=CNTY.state_id INNER JOIN countries as COUNTRY on COUNTRY.country_id=CNTY.country_id INNER join districts as DIST on ST.district_id=DIST.district_id INNER join cities as CITY on ST.city_id=CITY.city_id where ST.bank_id="'+recordID+'" and ST.user_id="'+req.session.user.id+'"';
	
			
			//console.log(getDataQuery);
	 Genernal.findByQuery(getDataQuery,function(err, results) 
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
					 if(results)
					 {
						 //console.log(results);
						 
						 let requestData = req.body;		
						if (Object.keys(requestData).length !==0)
						{
							req.checkBody('bank_name', 'Bank Name is required.').notEmpty()
							req.checkBody('bank_code', 'Bank Code is required.').notEmpty()
							req.checkBody('account_no', 'Account no is required.').notEmpty()
							req.checkBody('ifsc_code', 'IFSC Code is required.').notEmpty()
							req.checkBody('country_id', 'Country is required.').notEmpty()
							req.checkBody('state_id', 'State is required.').notEmpty()
							req.checkBody('district_id', 'District is required.').notEmpty()
							req.checkBody('city_id', 'City is required.').notEmpty()
							req.checkBody('branch', 'Branch is required.').notEmpty()
							req.checkBody('address', 'Address is required.').notEmpty()
							req.checkBody('area', 'Area is required.').notEmpty()
							req.checkBody('pin_code', 'Pin code is required.').notEmpty()
							req.checkBody('phone_no', 'Phone number is required.').notEmpty()
							req.checkBody('mobile_no', 'Mobile number is required.').notEmpty()
							req.checkBody('email', 'Email is required.').notEmpty()
							req.checkBody('email', 'Enter valid email.').isEmail()
							
							let errors = req.validationErrors();
							if (errors)
							{
								res.render(renderHtml,
								 {
									formData :requestData,
									PAGETITLE:LANGTEXT.EDITBANKTITLE,csrfToken: req.csrfToken(),
									errordata : errors,
									countries:dataResults
								});
							}
							else
							{
								
							Genernal.checkUquieFieldWithUser('account_no',requestData.account_no,'banks',req.session.user.id,recordID,'bank_id',function(err, checkresults) 
							{
								 if(err)
								 {	
									 res.render(renderHtml,
									 {
										formData :requestData,
										PAGETITLE:LANGTEXT.EDITBANKTITLE,csrfToken: req.csrfToken(),
										errordata : [ { msg: 'This Account number is already taken' }],
										countries:dataResults
									});
								 }
								 else
								 {
									 if(checkresults)
									 {					 delete requestData._csrf;
														 delete requestData.record_id;
														 delete requestData.field_name;
														let conditions = {bank_id:recordID,user_id:req.session.user.id};
														Genernal.update(requestData,'banks',conditions,function(err,resultdata)
														{
															if(err)
															{
																res.render(renderHtml,
																 {
																	formData :requestData,
																	PAGETITLE:LANGTEXT.EDITBANKTITLE,csrfToken: req.csrfToken(),
																	errordata : [ { msg: 'Pease try again' }],
																	countries:dataResults
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
											PAGETITLE:LANGTEXT.EDITBANKTITLE,csrfToken: req.csrfToken(),
											errordata : [ { msg: 'Something went wrong. Please try again.' }],
											countries:dataResults
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
									PAGETITLE:LANGTEXT.EDITBANKTITLE,csrfToken: req.csrfToken(),
									countries:dataResults
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
	 
	let query = "select * from "+tableName+" as ST "+conditions+searchkeycondition+defaultorderBY+limit;
	
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

