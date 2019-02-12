'use strict';

/**
 * define userLogin function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
 var user = require('../../app/models/Users'); 
 
exports.userLogin = function(req, res) 
{   
     let requestData = req.body;
	 
	 let userAuthData = user.authentication(requestData.username,requestData.password);
	 
	 console.log(userAuthData);
	  
	
	 res.render('layouts/login.html',
					{
						MESSAGE:LANGTEXT,currentYear: new Date().getFullYear(),csrfToken: req.csrfToken()
					});
}
