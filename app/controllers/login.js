'use strict';

/**
 * define userLogin function
  * @param {object} req - all request object.
   * @param {object} res - all response object.
 */
 
exports.userLogin = function(req, res) 
{   
   ///console.log(LANGTEXT.SID_REQUIRED);

	//res.render('layouts/login.html'); 
	
	 res.render('layouts/login.html',
					{
						MESSAGE:LANGTEXT,csrfToken: req.csrfToken()
					});
}
