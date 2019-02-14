'use strict';

/**
 * call controllers
 */
 
 var user = require('../app/controllers/user');
/**
 * set url 
 */
module.exports = function (app)
 {
     app.all('/login', parseForm,csrfProtection,user.userLogin);
	  app.get('/dashboard',user.userDashboard);
}
