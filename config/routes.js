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
     app.all('/login',user.notloggedIn,parseForm,csrfProtection,user.userLogin);
	 app.get('/',user.loggedIn,user.userDashboard);
	 app.get('/logout',user.loggedIn,parseForm,csrfProtection,user.logout);
}
