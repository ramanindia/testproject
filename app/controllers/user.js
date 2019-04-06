'use strict';

/**
 * define userLogin function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
 var dbConnection = require('../../app/models/dbconnection'); 
 var User = require('../../app/models/Users'); 
 var Genernal = require('../../app/models/Genernal'); 
 var Pagination = require('../../app/controllers/Component/pagination');
 var bcrypt = require('bcrypt');
 var Promise = require('promise');
 
exports.userLogin = function(req, res) 
{  
     let requestData = req.body;
	if (Object.keys(requestData).length !==0)
	{
	 User.userAuthenticated(requestData.username, requestData.password, function(err, user, reason) 
	 {
		  if (err) 
		  {			
			req.flash('error', LANGTEXT.LOGIN_ERROR);
		  }
		  else
		  {
			  if(user)
			  {  
				   req.flash('success', LANGTEXT.LOGIN_SUCCESS_MESSAGE);
				  FUNCTIONS.update_session(user, req, function() 
					  {
						res.redirect('/');
					  });				  
			  }
			 else 
			 {
				 req.flash('error', reason);
				 res.render('layouts/login.html',
				{
					PAGETITLE:LANGTEXT.LOGINPAGETITLE,formData:requestData,currentYear: new Date().getFullYear(),csrfToken: req.csrfToken()
				});
			}
		  }
		});
	}
	else
	{
		res.render('layouts/login.html',
		{
			PAGETITLE:LANGTEXT.LOGINPAGETITLE,currentYear: new Date().getFullYear(),csrfToken: req.csrfToken()
		});
	}
}

exports.logout = function(req, res, next)
{       
		 res.render('layouts/login.html',
				{
					PAGETITLE:LANGTEXT.LOGINPAGETITLE,messages:{success:LANGTEXT.LOGOUT_SUCCESS_MESSAGE},currentYear: new Date().getFullYear(),csrfToken: req.csrfToken()
				});
				req.session.destroy();
}
 /**
 * define dashboard function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.userDashboard = function(req, res) 
{  
   
		 
		res.render('users/dashboard.html',
		{
			PAGETITLE:LANGTEXT.DASHBOARDTITLE
		});
	
}
/**
 * define CheckUniqueName function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.CheckUniqueName = function(req, res) 
{  
	//console.log("req.params===",req.params);
     let QureyData = req.query;
	 
	 //console.log("QureyData==",QureyData);
	// console.log(QureyData);
	 
	 let recordId='';
	 let recordField='';
	 
	 if(typeof req.query.record_id !== 'undefined' || typeof req.query.field_name !=='undefined')
	 {
		 recordId = QureyData.record_id;
		 recordField = QureyData.field_name;
	 }
	 //console.log("recordId==",recordId);
	// console.log("recordField==",recordField);
	 
	 let controllerName = QureyData.controller_name;
	Genernal.checkUquieFieldWithUser(QureyData.fieldId, QureyData.fieldValue,controllerName,req.session.user.id,recordId,recordField,function(err, user) 
	{
		 if(err)
		 {
			res.send([QureyData.fieldId,false]);
		 }
		 else
		 {
			 if(user)
			 {
			 res.send([QureyData.fieldId,true]);
			 }			 
		 }
	 });
	
}
 /**
 * define checkUsername function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.checkUsernameExits = function(req, res) 
{  
     let QureyData = req.query;
	 
	Genernal.checkUquieField(QureyData.fieldId, QureyData.fieldValue,'users', function(err, user) 
	{
		 if(err)
		 {
			res.send([QureyData.fieldId,false]);
		 }
		 else
		 {
			 if(user)
			 {
			 res.send([QureyData.fieldId,true]);
			 }			 
		 }
	 });
	
}

 /**
 * define dashboard function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.checkEmailExits = function(req, res) 
{  
   let QureyData = req.query;
	Genernal.checkUquieField(QureyData.fieldId, QureyData.fieldValue,'users', function(err, user) 
	{
		 if(err)
		 {
			res.send([QureyData.fieldId,false]);
		 }
		 else
		 {
			 if(user)
			 {
			 res.send([QureyData.fieldId,true]);
			 }			 
		 }
	 });
}

 /**
 * define dashboard function
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
			Genernal.updateStatus(requestData,'users','id',req.session.user.id, function(err, results) 
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
 * define EditUser function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.userEdit = function(req, res) 
{  			
	 let UserID  = req.params.userId;
	 let QueryRedirectURL = req.query.redirectURL;
	 Genernal.findByFieldSingleRecord('id',UserID,'users',req.session.user.id, function(err, user) 
		{
			if(err)
			{
				 req.flash('error', '12Something missing wrong. Invalid request. please try again');
				res.redirect('/users/index');		
			}
			else
			{
				var actualredirectURL='users/index';
				if(typeof QueryRedirectURL !== 'undefined' || QueryRedirectURL !=='')
				{	
					try
					{
						var b = Buffer.from(QueryRedirectURL, 'base64')
						 actualredirectURL = b.toString();
					}
					catch (err)
					{
						req.flash('error', '123Something missing wrong. Invalid request. please try again');
						res.redirect('/users/index');
						 return false;
						// return, callback or whatever else you want to happen
					}    
				}
				else
				{
				   req.flash('error', '21213Something missing wrong. Invalid request. please try again');
				   res.redirect('/users/index');
				   return false;
				  
				}
				//console.log("redirectURL464645===========",actualredirectURL);
				//console.log("user===",user);
				if(user)
				{
						let requestData = req.body;		
						if (Object.keys(requestData).length !==0)
						{
							if(requestData.password  !='' || requestData.cpassword  !='')
							{
								req.checkBody('password', 'Password length between 5 to 15 characters.').len(5,15);
								req.checkBody('cpassword', 'Confirm password is required.').notEmpty();
								req.checkBody('cpassword', 'Password and confirm password is not match.').equals(req.body.password);
							}
							let errors = req.validationErrors();
							if (errors)
							{
								res.render('users/edit-user.html',
							    {
									formData :requestData,
									PAGETITLE:LANGTEXT.EDITUSERTITLE,
									csrfToken: req.csrfToken(),
									errordata : errors
								});
							}
							else
							{
								delete requestData.cpassword;
								delete requestData._csrf;
								const HashPassword = bcrypt.hash(requestData.password, 10, function(err, hash) 
								{
									if(err)
									{
										 res.render('users/edit-user.html',
										 {
											formData :requestData,
											PAGETITLE:LANGTEXT.EDITUSERTITLE,
											csrfToken: req.csrfToken(),
											errordata : [ { msg: 'Pease try again' }],
										});
									}
									else
									{
										if(requestData.password  !='' && requestData.cpassword  !='')
											{
												requestData.password=hash;
											}
											else
											{
												delete requestData.password;
											}
											
										let conditions = {id:UserID,parent_id:req.session.user.id};
										Genernal.update(requestData,'users',conditions,function(err,result)
										{
											if(err)
											{
												res.render('users/edit-user.html',
												 {
													formData :requestData,
													PAGETITLE:LANGTEXT.EDITUSERTITLE,csrfToken: req.csrfToken(),
													errordata : [ { msg: 'Pease try again' }],
												});
										
											}else
											{
											   req.flash('success', LANGTEXT.USEREDITED);
												res.redirect(actualredirectURL);													 
											}
											
										});
									}
									
								});
													
							}
						} 
						else 
						{
							res.render('users/edit-user.html',
							{
								PAGETITLE:LANGTEXT.EDITUSERTITLE,
								csrfToken: req.csrfToken(),
								formData :user,
							});
						}
				}
				else
				{
				   req.flash('error', '12313Something missing wrong. Invalid request. please try again');
				   res.redirect(actualredirectURL);
				}
			}
			
		});
}

 /**
 * define addUser function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.addUser = function(req, res) 
{  								
     let requestData = req.body;
	if (Object.keys(requestData).length !==0)
	{
		 req.checkBody('email', 'Email is required.').notEmpty()
		req.checkBody('username', 'Username is required.').notEmpty()
		req.checkBody('email', 'Please enter a valid email address.').isEmail();
		req.checkBody('password', 'Password length between 5 to 15 characters.').len(5,15);
		req.checkBody('cpassword', 'Confirm password is required.').notEmpty();
		req.checkBody('cpassword', 'Password and confirm password is not match.').equals(req.body.password);
		
		let errors = req.validationErrors();
		if (errors)
		{
		res.render('users/add-user.html',
			 {
				formData :requestData,
				PAGETITLE:LANGTEXT.ADDUSERTITLE,csrfToken: req.csrfToken(),
				errordata : errors
			});
		}
		else
		{
			Genernal.checkUquieField('email', requestData.email,'users', function(err, user) 
			{
				 if(err)
				 {	
					 res.render('users/add-user.html',
					 {
						formData :requestData,
						PAGETITLE:LANGTEXT.ADDUSERTITLE,csrfToken: req.csrfToken(),
						errordata : [ { msg: 'This email-id is already taken' }],
					});
				 }
				 else
				 {
					 if(user)
					 {
					    Genernal.checkUquieField('username', requestData.username,'users', function(err, user) 
						{
							 if(err)
							 {	
								 res.render('users/add-user.html',
								 {
									formData :requestData,
									PAGETITLE:LANGTEXT.ADDUSERTITLE,csrfToken: req.csrfToken(),
									errordata : [ { msg: 'This username is already taken' }],
								});
							 }
							 else
							 {
								 delete requestData.cpassword;
								 delete requestData._csrf;
								 requestData.id=UID();
								 requestData.parent_id=req.session.user.id;
								
								const HashPassword = bcrypt.hash(requestData.password, 10, function(err, hash) 
								{
									if(err)
									{
										 res.render('users/add-user.html',
										 {
											formData :requestData,
											PAGETITLE:LANGTEXT.ADDUSERTITLE,csrfToken: req.csrfToken(),
											errordata : [ { msg: 'Pease try again' }],
										});
									}
									else
									{
										requestData.password=hash;
										if(req.session.user.role_id ==2)
										{
											requestData.role_id = 3;
										}
										Genernal.save(requestData,'users',function(err,result)
										{
											if(err)
											{
												res.render('users/add-user.html',
												 {
													formData :requestData,
													PAGETITLE:LANGTEXT.ADDUSERTITLE,csrfToken: req.csrfToken(),
													errordata : [ { msg: 'Pease try again' }],
												});
										
											}else
											{
											   req.flash('success', LANGTEXT.USERADDED);
												res.redirect('/users/index');													 
											}
											
										});
									}
									
								});
								
								
							 }
						 });
					 }			 
				 }
			 });
		}
	}
	else
	{
		res.render('users/add-user.html',
		{
			PAGETITLE:LANGTEXT.ADDUSERTITLE,csrfToken: req.csrfToken()
		});
	}
}


 /**
 * define dashboard function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.allUsers = function(req, res) 
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
			searchkeycondition = " and CONCAT_ws('', first_name, last_name, email,username) LIKE '%"+searchkey.replace(/\s\s+/g, ' ')+"%'";
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
		
    
	 let userStatusSlug  = req.params.UsersSlug;
	 if( req.session.user.role_id == 1)
	 {
		conditions ="where parent_id = '"+ req.session.user.id+"' and role_id=2";
	 }
	 else if( req.session.user.role_id == 2)
	 {
		conditions ="where parent_id = '"+ req.session.user.id+"' and role_id=3";
	 }
	  var pageTitle ='All Users';
	 if(userStatusSlug=='active')
	 {
		 pageTitle = "Active Users";
		 conditions =conditions+ ' and status=1';
	 }
	 else if(userStatusSlug=='deactive')
	 {
		 pageTitle = "Deactive Users";
		 conditions =conditions+ ' and status=0';
	 }
	  else if(userStatusSlug=='deleted')
	 {
		  pageTitle = "Deleted Users";
		 conditions =conditions+ ' and is_delete=1';
	 }
	let query = "select id,first_name,is_delete,last_name,username,email,status,created from users "+conditions+searchkeycondition+defaultorderBY+limit;
	
	
	let totalCountQuery = "select count(*) as totalRecord from users "+conditions+searchkeycondition;
	
	let pageUri='/users/'+userStatusSlug;
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
				res.render('users/users.html',
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
						res.render('users/users.html',
						{
							PAGETITLE:pageTitle
						});
					}else
					{   
				           var bufferURL = new Buffer(req.originalUrl);
						   var redirectURL = bufferURL.toString('base64');
						   
						   //console.log("req.query",req.query);
						  let totalRecords = totalCountResults[0].totalRecord;
						  totalNoPages = Math.ceil(totalRecords / records_per_page);
						   const Paginate = new Pagination(totalRecords,currentPage,pageUri,records_per_page,req.query);
						res.render('users/users.html',
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
							 userStatusSlug:userStatusSlug
						});
					}
				});	
			}
		});	
	});
}

 /**
 * define loggedIn function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.loggedIn = function(req, res, next)
{
	if (req.session.user) 
	{  // req.session.passport._id
		/* var user = req.session.user;
			 req.session.regenerate(function() 
			 {
			   req.session.user = user;
			   next();
			   });*/
			   next();
	} else {
		
		req.flash('error', LANGTEXT.NOT_AUTHORIZED);
		res.redirect('/users/login');
	}

}
 /**
 * define notloggedIn function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.notloggedIn = function(req, res, next)
{
	if (req.session.user) 
	{ 
		var user = req.session.user;
		req.session.user = user;
		res.redirect("/");

	} else 
	{
		  next();
	}
}

