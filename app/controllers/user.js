'use strict';

/**
 * define userLogin function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
 var User = require('../../app/models/Users'); 
 
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
 * define dashboard function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.addUser = function(req, res) 
{  
   
		res.render('users/add-user.html',
		{
			PAGETITLE:LANGTEXT.ADDUSERTITLE
		});
	
}


 /**
 * define dashboard function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
exports.allUsers = function(req, res) 
{  
   
		 
		res.render('users/users.html',
		{
			PAGETITLE:LANGTEXT.ALLUSERS
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
	{ // req.session.passport._id
		 var user = req.session.user;
			 req.session.regenerate(function() 
			 {
			   req.session.user = user;
			   next();
			   });
	} else {
		
		req.flash('error', LANGTEXT.NOT_AUTHORIZED);
		res.redirect('/login');
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

