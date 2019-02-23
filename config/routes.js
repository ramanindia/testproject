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
     app.all('/users/login',user.notloggedIn,parseForm,csrfProtection,user.userLogin);
	 app.get('/',user.loggedIn,user.userDashboard);
	 app.get('/users/logout',user.loggedIn,parseForm,csrfProtection,user.logout);
	 app.all('/users/add-user',user.loggedIn,parseForm,csrfProtection,user.addUser);
	 app.get('/users',user.loggedIn,parseForm,csrfProtection,user.allUsers);
	 app.get('/users/checkUniqueUsername',user.loggedIn,user.checkUsernameExits);
	 app.get('/users/checkUniqueEmail',user.loggedIn,user.checkEmailExits);
}
