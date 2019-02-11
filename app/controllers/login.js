'use strict';

/**
 * define userLogin function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
 var user = require('../../app/models/Users'); 
 
exports.userLogin = function(req, res) 
{   
     console.log(req.body);
	 
	 user.authentication(req);
	  
	
	 res.render('layouts/login.html',
					{
						MESSAGE:LANGTEXT,currentYear: new Date().getFullYear(),csrfToken: req.csrfToken()
					});
}
