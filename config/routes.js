'use strict';

/**
 * call controllers
 */
 
 var login = require('../app/controllers/login');
/**
 * set url 
 */
module.exports = function (app)
 {
     app.all('/login', parseForm,csrfProtection,login.userLogin);
}
