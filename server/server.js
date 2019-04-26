const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const usersModel = require('./src/models/usersModel');
const FacebookStrategy = require('passport-facebook').Strategy;
const cors = require('cors');
const apiRouter = require('./routes/apirouter');

const app = express();

//db connect
mongoose.connect('mongodb://localhost/frontcamp', { useNewUrlParser: true });

//bodyParser
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//session
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(usersModel.authenticate()));
passport.serializeUser(usersModel.serializeUser());
passport.deserializeUser(usersModel.deserializeUser());
passport.use('facebook', new FacebookStrategy({
	clientID: '1328350517305538',
	clientSecret: 'a8f47c1fc93b2c79bc2bb54f5121817c',
	callbackURL: "http://localhost:8000/users/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
	User.findOrCreate({ facebookId: profile.id }, function (err, user) {
		return cb(err, user);
	});
}
));

//cors
app.use(cors())
app.all('/', function(req, res, next) {
	res.header('Access-Control-Allow-Headers: Content-Type');
	res.header('Access-Control-Allow-Methods: POST');
	next();
});

//routing
app.use('/calculate', apiRouter);

app.listen(3001);