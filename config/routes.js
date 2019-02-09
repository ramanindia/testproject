'use strict';

/**
 * call controllers
 */
 
 var db = require('../app/models/dbconnection'); 
 var login = require('../app/controllers/login');


/**
 * set url 
 */
module.exports = function (app)
 {
     app.get('/login', login.userLogin);
}