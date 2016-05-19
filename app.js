var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));


app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


// passport initialization
app.use(session( { 
	secret: process.env.SESSION_SECRET || 'some_default_secret_for_project',
	resave: true,
	saveUninitialized: true
} ));
app.use(passport.initialize());
app.use(passport.session());





require('./config/passport.js')(passport);



// routes ======================================================================
app.use(function logHttpRequest(req, res, next) {
	var msg = req.method + " " + req.url;
	if (JSON.stringify(req.body) != "{}") {
		msg = msg + "  params: " + JSON.stringify(req.body);
	}
	console.log(msg);
    next();
})
require('./routes')(app, passport);


// Exports application for testing
module.exports = app;