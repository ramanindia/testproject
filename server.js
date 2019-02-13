'use strict';
 /**
 * include modules
 */

var express = require('express');
var nunjucks  = require('nunjucks');
var csrf = require('csurf');
var path  = require('path');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser')
 /**
 * load envirment file
 */
require('dotenv').load();
global.env = process.env;


/**
 * Multilanguage configuration
 */
const languageSlug = 'en';
let languageFile = require('./local/'+languageSlug+'/display_messages.js');
global.LANGTEXT = languageFile.WEB_MESSAGES;

/**
* setup route middlewares
*/
global.csrfProtection = csrf({ cookie: true })
global.parseForm = bodyParser.urlencoded({ extended: false })




const port = process.env.PORT || 3001;

var app = express();
	
    app.use(express.static(path.join(__dirname, 'public')));	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(cookieParser());
	
     app.use(session({
					  secret: '57065d0113918ca402a0f2ad57065d0113918ca402a0f2ad',
					  resave: false,
					  saveUninitialized: true
					  }));
	app.use(flash());
	

/**
 * Apply nunjucks and add custom filter and function. 
 * set folders with templates
 */
 nunjucks.configure(['app/views/'], { 
    autoescape: true, 
    express: app
});

/**
 * configue routing
 */
require('./config/routes.js')(app); 

/*app.use(function(req, res, next) {

//console.log(req);
  //res.locals.SITR_URL = '';
 //res.locals.SESSION_VALUE = req.session.user;
   //res.locals.error_flash = req.flash('error')[0];
   //res.locals.success_flash = req.flash('success')[0]
//  var current_url = req.url;
 // var url_actions = current_url.split("/");
 // res.locals.controller = url_actions[1];
 // res.locals.action = url_actions[2];
  //next();

});*/


app.use(function (err, req, res, next)
 {
	 /*console.log("req",err);
	  console.log("req",req);
	  console.log("res",res);*/
	  // res.locals.SESSION_VALUE = req.session.user;
   res.locals.error_flash = req.flash('error')[0];
   res.locals.success_flash = req.flash('success')[0]
	 
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
     // handle CSRF token errors here
     res.status(403)
     res.send('Invalid csrf token');
})


/**
 *create express server with a specific port
 */
var server = app.listen(port, function () 
{
    console.log('Node server is running at port no:- '+port);
});

