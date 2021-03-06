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
			Genernal.updateStatus(requestData,'cargos','cargo_id',req.session.user.id, function(err, results) 
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
	 let actualredirectURL ='/cargos/index';
		 try
			{
			var b = Buffer.from(QueryRedirectURL, 'base64')
			 actualredirectURL = b.toString('utf8');
			}
			catch (err)
			{
				req.flash('error', 'Something missing wrong. Invalid request. please try again');
				res.redirect('/cargos/index');
				 return false;
			}
		if(QueryRedirectURL !== 'undefined')
		{
					
			 Genernal.checkRecords('cargo_id', deleteID,'lr_entries',req.session.user.id, function(err, results) 
			{
				 if(err)
				 {		
			           console.log(err);			 
						req.flash('error', err);
						res.redirect(actualredirectURL); 
				 }				 
				 else
				 {
					// console.log("res==",actualredirectURL);
					 
					 //console.log("results==",results);
					 
					 Genernal.deleteDeactiveRecord('cargo_id',deleteID,'cargos',req.session.user.id, function(err, delresults) 
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
 * define countryEdit function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.CargoEdit = function(req, res) 
{  			
	 let recordID  = req.params.recordId;
	 let QueryRedirectURL = req.query.redirectURL;
	 let errorRedirectURL = '/cargos/index';
	 let renderHtml = 'cargos/edit-cargo.html';
	 let actualredirectURL='/cargos/index';
	 
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
	 Genernal.findByFieldSingleRecord('cargo_id', recordID,'cargos',req.session.user.id,function(err, results) 
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
						 let requestData = req.body;		
						if (Object.keys(requestData).length !==0)
						{
							 req.checkBody('product_name', 'Product Name is required.').notEmpty()
								req.checkBody('product_name', 'Product Name length between 3 to 100 characters.').len(3,100);
		
							let errors = req.validationErrors();
							if (errors)
							{
								res.render(renderHtml,
								 {
									formData :requestData,
									PAGETITLE:LANGTEXT.EDITCAROTITLE,csrfToken: req.csrfToken(),
									errordata : errors
								});
							}
							else
							{
								
							Genernal.checkUquieFieldWithUser('product_name',requestData.product_name,'cargos',req.session.user.id,recordID,'cargo_id',function(err, countries) 
							{
								 if(err)
								 {	
									 res.render(renderHtml,
									 {
										formData :requestData,
										PAGETITLE:LANGTEXT.EDITCAROTITLE,csrfToken: req.csrfToken(),
										errordata : [ { msg: 'This name is already taken' }],
									});
								 }
								 else
								 {
									 if(countries)
									 {		

								Genernal.checkUquieFieldWithUser('product_code',requestData.product_code,'cargos',req.session.user.id,recordID,'cargo_id',function(err, resultcheckData) 
							{
								 if(err)
								 {	
									 res.render(renderHtml,
									 {
										formData :requestData,
										PAGETITLE:LANGTEXT.EDITCAROTITLE,csrfToken: req.csrfToken(),
										errordata : [ { msg: 'This code is already taken' }],
									});
								 }
								 else
								 {
									 if(resultcheckData)
									 {




														delete requestData._csrf;
														 delete requestData.record_id;
														 delete requestData.field_name;
														let conditions = {cargo_id:recordID,user_id:req.session.user.id};
														Genernal.update(requestData,'cargos',conditions,function(err,resultdata)
														{
															if(err)
															{
																res.render(renderHtml,
																 {
																	formData :requestData,
																	PAGETITLE:LANGTEXT.EDITCAROTITLE,csrfToken: req.csrfToken(),
																	errordata : [ { msg: 'Pease try again' }],
																});
														
															}else
															{
															   req.flash('success', LANGTEXT.USEREDITED);
																res.redirect(actualredirectURL);													 
															}
															
															
														});
														
										}
								 }
							});
										
									 }
									  else
									 {
										 res.render(renderHtml,
										 {
											formData :requestData,
											PAGETITLE:LANGTEXT.EDITCAROTITLE,csrfToken: req.csrfToken(),
											errordata : [ { msg: 'Something went wrong. Please try again.' }],
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
									formData :results,
									PAGETITLE:LANGTEXT.EDITCAROTITLE,csrfToken: req.csrfToken(),
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
}




 /**
 * define addCountry function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.addCargo = function(req, res) 
{  								
     let requestData = req.body;
	 let redirectURL = '/cargos/index';
	 let renderHtml = 'cargos/add-cargo.html';
	if (Object.keys(requestData).length !==0)
	{
		 req.checkBody('product_name', 'Product Name is required.').notEmpty();
		 req.checkBody('product_code', 'Product Code is required.').notEmpty();
		 req.checkBody('product_name', 'Product Name length between 3 to 100 characters.').len(3,100);
		
		let errors = req.validationErrors();
		if (errors)
		{
		res.render(renderHtml,
			 {
				formData :requestData,
				PAGETITLE:LANGTEXT.ADDCAROTITLE,csrfToken: req.csrfToken(),
				errordata : errors
			});
		}
		else
		{
			Genernal.checkUquieFieldWithUser('product_name', requestData.product_name	,'cargos',req.session.user.id,'','', function(err, checkresults) 
			{
				 if(err)
				 {	
					 res.render(renderHtml,
					 {
						formData :requestData,
						PAGETITLE:LANGTEXT.ADDCAROTITLE,csrfToken: req.csrfToken(),
						errordata : [ { msg: 'This name is already taken' }],
					});
				 }
				 else
				 {
					 if(checkresults)
					 {		
						
						Genernal.checkUquieFieldWithUser('product_code', requestData.product_code	,'cargos',req.session.user.id,'','', function(err, checkresults) 
			{
				     if(err)
				 {	
					 res.render(renderHtml,
					 {
						formData :requestData,
						PAGETITLE:LANGTEXT.ADDCAROTITLE,csrfToken: req.csrfToken(),
						errordata : [ { msg: 'This code is already taken' }],
					});
				 }
				 else
				 {
								 delete requestData._csrf;
								 requestData.cargo_id=UID();
								 requestData.user_id = req.session.user.id;
								 
						Genernal.save(requestData,'cargos',function(err,result)
							{
								if(err)
								{
									res.render(renderHtml,
									{
										formData :requestData,
										PAGETITLE:LANGTEXT.ADDCAROTITLE,csrfToken: req.csrfToken(),
										errordata : [ { msg: 'Pease try again' }],
									});
							
								}else
								{
								   req.flash('success', LANGTEXT.USERADDED);
									res.redirect(redirectURL);													 
								}
								
							});	
			}
			
			});							
					 }
					 else
					 {
						 res.render(renderHtml,
						 {
							formData :requestData,
							PAGETITLE:LANGTEXT.ADDCAROTITLE,csrfToken: req.csrfToken(),
							errordata : [ { msg: 'Something went wrong. Please try again.' }],
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
			PAGETITLE:LANGTEXT.ADDCAROTITLE,csrfToken: req.csrfToken()
		});
	}
}


 /**
 * define allCountries function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.allCargos = function(req, res) 
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
	 let renderHtml = 'cargos/cargos.html';
	 let limit;
	  let tableName='cargos';
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
			searchkeycondition = " and CONCAT_ws('', product_name,product_code) LIKE '%"+searchkey.replace(/\s\s+/g, ' ')+"%'";
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
	
		conditions ="where user_id = '"+ req.session.user.id+"'";
		
	  var pageTitle ='All Cargos/Products';
	 if(PageSlug=='active')
	 {
		 pageTitle = "Active Cargos/Products";
		 conditions =conditions+ ' and status=1';
	 }
	 else if(PageSlug=='deactive')
	 {
		 pageTitle = "Deactive Cargos/Products";
		 conditions =conditions+ ' and status=0';
	 }
	 
	let query = "select cargo_id,product_code,product_name,is_delete,user_id,status,created from "+tableName+" "+conditions+searchkeycondition+defaultorderBY+limit;
	let totalCountQuery = "select count(*) as totalRecord from "+tableName+" "+conditions+searchkeycondition;	
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

