'use strict';

/**
 * define userLogin function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
 var db = require('../../app/models/dbconnection'); 
 var User = require('../../app/models/Users'); 
 var Generanal = require('../../app/models/Generanal'); 
 var bcrypt = require('bcrypt');
 
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
 * define checkUsername function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.checkUsernameExits = function(req, res) 
{  
     let QureyData = req.query;
	Generanal.checkUquieField(QureyData.fieldId, QureyData.fieldValue,'users', function(err, user) 
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
	Generanal.checkUquieField(QureyData.fieldId, QureyData.fieldValue,'users', function(err, user) 
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
			Generanal.checkUquieField('email', requestData.email,'users', function(err, user) 
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
					    Generanal.checkUquieField('username', requestData.username,'users', function(err, user) 
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
										Generanal.save(requestData,'users',function(err,result)
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
	//console.log(req);
     //console.log(req.query);
	
	 let post_per_page = process.env.PERPAGE; 
	 let userStatusSlug  = req.params.UsersSlug;
	 
	 let conditions ="parent_id = '"+ req.session.user.id+"'";
	 
	 if(userStatusSlug=='index')
	 {
		 //conditions = 'role_id !=2';
	 }
	  
	let query = "select * from users "+conditions;
	
	console.log(query);
	
	db.query(query,function(err,results)
	{
		if(err)
		{
			//return callback(LANGTEXT.LOGIN_ERROR);
			 req.flash('error', LANGTEXT.DATABASESYSERROR);
			res.render('users/users.html',
			{
				PAGETITLE:LANGTEXT.ALLUSERS
			});
        }else
		{
			//console.log(results);
			res.render('users/users.html',
			{
				PAGETITLE:LANGTEXT.ALLUSERS
			});
		}
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

