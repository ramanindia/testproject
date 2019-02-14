var flash = require('express-flash');
var session = require('express-session');
var   express = require('express');
var engine = require('ejs-mate');
var bodyParser = require("body-parser");
var nunjucks  = require('nunjucks');

    app = express();
 
//app.engine('ejs', engine);
  
  app.use(session({
  secret: '57065d0113918ca402a0f2ad57065d0113918ca402a0f2ad',
  resave: false,
  saveUninitialized: true
}));

 nunjucks.configure(['views'], { 
    autoescape: true, 
    express: app
});


app.use(flash());


//app.set('view engine', 'ejs');

//app.use(express.logger('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(function(req, res, next) {

 // res.locals.SITR_URL = '';
  //res.locals.SESSION_VALUE = req.session.user;
 //  res.locals.error_flash = req.flash('error')[0];
  // res.locals.success_flash = req.flash('success')[0]
 // var current_url = req.url;
 // var url_actions = current_url.split("/");
  //res.locals.controller = url_actions[1];
  //res.locals.action = url_actions[2];
  next();

});

  app.get('/', function (req, res) {
    req.flash('error', 'Welcome');
    res.render('index.html', {
      title: 'Home'
    })
  });
  app.get('/addFlash', function (req, res) {
    req.flash('success', 'Flash Message Added');
    //res.redirect('/');
	
	 res.render('index.html', {
      title: 'Home'
    });
  });
  
  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Flash app listening at http://%s:%s', host, port);
});