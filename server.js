'use strict';
 /**
 * include modules
 */
var express = require('express');
var nunjucks  = require('nunjucks');
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


const port = process.env.PORT || 3001;

var app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname, 'public')));

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

//create express server with a specific port
var server = app.listen(port, function () 
{
    console.log('Node server is running at port no:- '+port);
});

