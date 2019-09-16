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
			Genernal.updateStatus(requestData,'accounts','account_id',req.session.user.id, function(err, results) 
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
	 let actualredirectURL ='/accounts/index';
		 try
			{
			var b = Buffer.from(QueryRedirectURL, 'base64')
			 actualredirectURL = b.toString('utf8');
			}
			catch (err)
			{
				req.flash('error', 'Something missing wrong. Invalid request. please try again');
				res.redirect('/accounts/index');
				 return false;
			}
		if(QueryRedirectURL !== 'undefined')
		{
					
			Genernal.checkRecords('account_id', deleteID,' vehicles',req.session.user.id, function(err, results) 
			{
				 if(err)
				 {			 
						req.flash('error', err);
						res.redirect(actualredirectURL); 
				 }				 
				 else
				 {
					// console.log("res==",actualredirectURL);
					 
					 
					 Genernal.deleteDeactiveRecord('account_id',deleteID,'accounts',req.session.user.id, function(err, delresults) 
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
exports.AccountEdit = function(req, res) 
{  					 
	 let recordID  = req.params.recordId;
	 let QueryRedirectURL = req.query.redirectURL;
	 let errorRedirectURL = '/accounts/index';
	 let renderHtml = 'accounts/edit-account.html';
	 let actualredirectURL='/accounts/index';
	 Genernal.findAll('select account_group_id,group_name from account_groups where status=1 and is_delete= 0 and user_id="'+req.session.user.id+'"',function(err,results)
	 {
		 //console.log("results===",Object.keys(results).length);
		 if(Object.keys(results).length ==0)
		 {
			req.flash('error',LANGTEXT.PLZCREATEACCGROUP );
			res.redirect(redirectURL);
			return false;
		 }
		 
		 Genernal.findAll('select country_id,country_name from countries where status=1 and is_delete=0 and user_id="'+req.session.user.id+'"',function(err,resultsdata)
	    {
   /* Genernal.findAll('select * from countries where status=1 and user_id="'+req.session.user.id+'"',function(err,dataResults)
	 {*/
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
			 let getDataQuery = 'select account_id,pan_no,account_name,gst_registration_type,code,AG.group_name,AG.account_group_id,account_type,gst_type,gst_no,'+
			 'gst_no,adhar_no,tan_no,remarks,creditdays,credit_limit,balance_method,type,'+
			 'amount,bill_no,bill_date,bill_type,balance_type,address1,address2,address3,area,pin_code,phone_no,mobile_no,email,ST.city_id,ST.district_id,ST.state_id,ST.country_id,district_name,city_name,country_name,state_name,ST.is_delete as STATEDELETE,ST.user_id as STATEUSERID,'+
	'ST.status as STATESTATUS,ST.created AS STATECREATED from accounts as ST INNER JOIN account_groups as AG ON ST.account_group_id=AG.account_group_id inner join states as CNTY on ST.state_id=CNTY.state_id INNER JOIN countries as COUNTRY on COUNTRY.country_id=CNTY.country_id INNER join districts as DIST on ST.district_id=DIST.district_id INNER join cities as CITY on ST.city_id=CITY.city_id where ST.account_id="'+recordID+'" and ST.user_id="'+req.session.user.id+'"';
	
			
			//console.log('getDataQuery===',getDataQuery);
			
	 Genernal.findByQuery(getDataQuery,function(err, results) 
		{
			if(err)
			{
				 req.flash('error', LANGTEXT.PLZTRY );
				res.redirect(errorRedirectURL);		
			}
			else
			{
				if(typeof QueryRedirectURL !== 'undefined' || QueryRedirectURL !=='')
				{	
					 if(results)
					 {
						// console.log("Results====",results);
						 
						 let requestData = req.body;		
						if (Object.keys(requestData).length !==0)
						{
							req.checkBody('account_name', 'Account name is required.').notEmpty()
							req.checkBody('code', 'Account code is required.').notEmpty()
							req.checkBody('account_group_id', 'Account group is required.').notEmpty()
							req.checkBody('account_type', 'Account type is required.').notEmpty()
							req.checkBody('gst_registration_type', 'GST registration type is required.').notEmpty()
							req.checkBody('gst_type', 'GST type is required.').notEmpty()
							req.checkBody('address1', 'Address is required.').notEmpty()
							req.checkBody('country_id', 'Country is required.').notEmpty()
							req.checkBody('state_id', 'State is required.').notEmpty()
							req.checkBody('district_id', 'District is required.').notEmpty()
							req.checkBody('city_id', 'City is required.').notEmpty()
							req.checkBody('pin_code', 'Pin code is required.').notEmpty()
							req.checkBody('phone_no', 'Phone no is required.').notEmpty()
							req.checkBody('mobile_no', 'Mobile no is required.').notEmpty()
							req.checkBody('creditdays', 'Credit days is required.').notEmpty()
							req.checkBody('creditdays', 'Enter credit days in number.').isNumeric()
							req.checkBody('credit_limit', 'Credit limit is required.').notEmpty()
							req.checkBody('type', 'Balance type is required.').notEmpty()
							req.checkBody('email', 'Email is required.').notEmpty()
							req.checkBody('email', 'Enter valid email.').isEmail()
							
							let errors = req.validationErrors();
							if (errors)
							{
								res.render(renderHtml,
								 {
									formData :requestData,
									PAGETITLE:LANGTEXT.EDITACCOUNTTITLE,csrfToken: req.csrfToken(),
									errordata : errors,
									data1:results,
									data2:resultsdata,
									 moment:moment,
								});
							}
							else
							{
								
							Genernal.checkUquieFieldWithUser('account_name',requestData.account_name,'accounts',req.session.user.id,recordID,'account_id',function(err, checkresults) 
							{
								 if(err)
								 {	
									 res.render(renderHtml,
									 {
										formData :requestData,
										PAGETITLE:LANGTEXT.EDITACCOUNTTITLE,csrfToken: req.csrfToken(),
										errordata : [ { msg: 'Account name '+LANGTEXT.ALLREADYEXITS }],
										data1:results,
										data2:resultsdata,
										 moment:moment,
									});
								 }
								 else
								 {
									 if(checkresults)
									 {					 delete requestData._csrf;
														 delete requestData.record_id;
														 delete requestData.field_name;
														let conditions = {account_id:recordID,user_id:req.session.user.id};
														Genernal.update(requestData,'accounts',conditions,function(err,resultdata)
														{
															if(err)
															{
																res.render(renderHtml,
																 {
																	formData :requestData,
																	PAGETITLE:LANGTEXT.EDITACCOUNTTITLE,csrfToken: req.csrfToken(),
																	errordata : [ { msg:  LANGTEXT.PLZTRY }],
																	data1:results,
																	data2:resultsdata,
																	 moment:moment,
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
											PAGETITLE:LANGTEXT.EDITACCOUNTTITLE,csrfToken: req.csrfToken(),
											errordata : [ { msg: LANGTEXT.PLZTRY }],
											data1:results,
											data2:resultsdata,
											 moment:moment,
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
									PAGETITLE:LANGTEXT.EDITACCOUNTTITLE,csrfToken: req.csrfToken(),
									data1:results,
									data2:resultsdata,
									 moment:moment,
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
 * define addCountry function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.AddAccount = function(req, res) 
{  								
     let requestData = req.body;
	 let redirectURL = '/accounts/index';
	 let renderHtml = 'accounts/add-account.html';
	 
	 Genernal.findAll('select account_group_id,group_name from account_groups where status=1 and is_delete= 0 and user_id="'+req.session.user.id+'"',function(err,results)
	 {
		 //console.log("results===",Object.keys(results).length);
		 if(Object.keys(results).length ==0)
		 {
			req.flash('error',LANGTEXT.PLZCREATEACCGROUP );
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
		req.checkBody('account_name', 'Account name is required.').notEmpty()
		req.checkBody('code', 'Account code is required.').notEmpty()
		req.checkBody('account_group_id', 'Account group is required.').notEmpty()
		req.checkBody('account_type', 'Account type is required.').notEmpty()
		req.checkBody('gst_registration_type', 'GST registration type is required.').notEmpty()
		req.checkBody('gst_type', 'GST type is required.').notEmpty()
		req.checkBody('address1', 'Address is required.').notEmpty()
		req.checkBody('country_id', 'Country is required.').notEmpty()
		req.checkBody('state_id', 'State is required.').notEmpty()
		req.checkBody('district_id', 'District is required.').notEmpty()
		req.checkBody('city_id', 'City is required.').notEmpty()
		req.checkBody('pin_code', 'Pin code is required.').notEmpty()
		req.checkBody('phone_no', 'Phone no is required.').notEmpty()
		req.checkBody('mobile_no', 'Mobile no is required.').notEmpty()
		req.checkBody('creditdays', 'Credit days is required.').notEmpty()
		req.checkBody('creditdays', 'Enter credit days in number.').isNumeric()
		req.checkBody('credit_limit', 'Credit limit is required.').notEmpty()
		req.checkBody('type', 'Balance type is required.').notEmpty()
		req.checkBody('email', 'Email is required.').notEmpty()
		req.checkBody('email', 'Enter valid email.').isEmail()
		
		let errors = req.validationErrors();
		if (errors)
		{
		res.render(renderHtml,
			 {
				formData :requestData,
				PAGETITLE:LANGTEXT.ADDACCOUNTTITLE,csrfToken: req.csrfToken(),
				errordata : errors,
				data1:results,
				data2:resultsdata,
			});
		}
		else
		{
			Genernal.checkUquieFieldWithUser('account_name', requestData.account_name,'accounts',req.session.user.id,'','', function(err, checkresults) 
			{
				 if(err)
				 {	
					 res.render(renderHtml,
					 {
						formData :requestData,
						PAGETITLE:LANGTEXT.ADDACCOUNTTITLE,csrfToken: req.csrfToken(),
						errordata : [ { msg: 'Account name '+LANGTEXT.ALLREADYEXITS }],
						data1:results,
						data2:resultsdata,
					});
				 }
				 else
				 {
					 if(checkresults)
					 {		
						
								 delete requestData._csrf;
								 requestData.account_id=UID();
								 requestData.user_id = req.session.user.id;
								 
						Genernal.save(requestData,'accounts',function(err,result)
							{
								if(err)
								{
									res.render(renderHtml,
									{
										formData :requestData,
										PAGETITLE:LANGTEXT.ADDACCOUNTTITLE,csrfToken: req.csrfToken(),
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
							PAGETITLE:LANGTEXT.ADDACCOUNTTITLE,csrfToken: req.csrfToken(),
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
			PAGETITLE:LANGTEXT.ADDACCOUNTTITLE,data1:results,data2:resultsdata,csrfToken: req.csrfToken()
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
exports.allAccounts = function(req, res) 
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
	 let renderHtml = 'accounts/accounts.html';
	 let limit;
	  let tableName='accounts';
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
			searchkeycondition = " and CONCAT_ws('',account_name,code,pin_code,address1,area,phone_no,phone_no,pan_no,adhar_no,tan_no,email) LIKE '%"+searchkey.replace(/\s\s+/g, ' ')+"%'";
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
		
	  var pageTitle =LANGTEXT.ALLACCOUNT;
	 if(PageSlug=='active')
	 {
		 pageTitle =  LANGTEXT.ACTIVEBANK;
		 conditions =conditions+ ' and ST.status=1';
	 }
	 else if(PageSlug=='deactive')
	 {
		 pageTitle = LANGTEXT.DEACTIVEBANK;
		 conditions =conditions+ ' and ST.status=0';
	 }
	 
	let query = "select ST.account_id,ST.user_id,ST.account_name,ST.code,ST.account_group_id,ST.account_group_id,ST.address1,ST.area,"+
	"ST.pin_code,ST.phone_no,ST.mobile_no,ST.email,ST.is_delete,ST.status,ST.created,ST.account_type,AG.group_name from "+tableName+" as ST INNER JOIN account_groups as AG ON ST.account_group_id=AG.account_group_id "+conditions+searchkeycondition+defaultorderBY+limit;
	
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

