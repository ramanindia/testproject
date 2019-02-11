'use strict';
 /**
 * include modules
 */
var cookieParser = require('cookie-parser')
var express = require('express');
var nunjucks  = require('nunjucks');
var csrf = require('csurf');
var path  = require('path');
var bodyParser = require('body-parser');

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

app.use(function (err, req, res, next)
 {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
 
     // handle CSRF token errors here
     res.status(403)
     res.send('Invalid csrf token')
})


/**
 *create express server with a specific port
 */
var server = app.listen(port, function () 
{
    console.log('Node server is running at port no:- '+port);
});

