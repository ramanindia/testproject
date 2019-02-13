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
	 User.userAuthenticated(requestData.username, requestData.password, function(err, user, reason) 
	 {
	  if (err) 
	  {
        console.log('err', err)
	  }
	  else
	  {
		  if(user)
		  {
			   console.log("Looged",user);
		  }
		 else 
		 {
			 console.log("reason",reason);
          //req.flash('error', 'Either username or password incorrect');
          //res.redirect('login');
        }
	  }
	 
	 });
	
	  req.flash('error', 'Either username or password incorrect');
	  
	//  console.log("request data",req);
	 res.render('layouts/login.html',
					{
						MESSAGE:LANGTEXT,currentYear: new Date().getFullYear(),csrfToken: req.csrfToken()
					});
}
