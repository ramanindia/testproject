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
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
    global.UID = require('uuid/v4');
   global.FUNCTIONS = require('./app/functions');
 /**
 * load envirment file
 */
require('dotenv').load();

global.env = process.env;

//global.HOST_URL = env.HOST_NAME;

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
	app.use(flash());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(expressValidator());
	app.use(cookieParser());
	
     app.use(session({ cookie: { maxAge: 60000 }, 
					  secret: '57065d0113918ca402a0f2ad57065d0113918ca402a0f2ad',
					  resave: false,
					  saveUninitialized: true
					  }));

	app.set('views', path.join(__dirname, 'views'));

/**
 * Apply nunjucks and add custom filter and function. 
 * set folders with templates
 */
 nunjucks.configure(['app/views/'], { 
    autoescape: true, 
    express: app
}).addGlobal('HOST_URL', process.env.HOST_NAME);


app.use(function (err, req, res, next)
 {    
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
     res.status(403)
     res.send('Invalid csrf token');
});


app.use(function(req, res, next) 
{      
	// console.log(req.session.user);
	// res.locals.message = 'Hello World';	
	res.locals.LANGMESSAGE = languageFile.WEB_MESSAGES;;
	var current_url = req.url;
	// console.log("current_url===",current_url);
     var url_actions = current_url.split("/");
	  // console.log("url_actions===",url_actions);
    res.locals.controller = url_actions[1];
    res.locals.action = url_actions[2];

	if(req.session.user)
	{
		res.locals.SESSIONDATA = req.session.user;
	}else
	{
		res.locals.SESSIONDATA =''
	}
    next();
});
/**
 * configue routing
 */
require('./config/routes.js')(app); 
  app.use(express.static(path.join(__dirname, 'public')));	
  /**
  *catch 404 and forward to error handler
  */
app.use(function (req, res, next) 
{	
    //console.log(req.session.user);
    res.status(404).render('errors/404.html', {PAGETITLE: "Sorry, page not found"});
});
 /**
  *catch 500 and forward to error handler
  */
app.use(function (req, res, next) {
    res.status(500).render('errors/404.html', {PAGETITLE: "Sorry, page not found"});
});


/**
 *create express server with a specific port
 */
var server = app.listen(port, function () 
{
    console.log('Node server is running at port no:- '+port);
});



