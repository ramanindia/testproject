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
			       res.redirect('dashboard');
			  }
			 else 
			 {
				
				 req.flash('error', reason);
			}
		  }
		      res.render('layouts/login.html',
			{
				formData:requestData,MESSAGE:LANGTEXT,currentYear: new Date().getFullYear(),csrfToken: req.csrfToken()
			});
		});
	}
	else
	{
		 
		res.render('layouts/login.html',
		{
			MESSAGE:LANGTEXT,currentYear: new Date().getFullYear(),csrfToken: req.csrfToken()
		});
	}

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
			MESSAGE:LANGTEXT
		});
	

}
