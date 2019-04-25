let express = require('express');
let mongoose = require('mongoose');
let session = require('express-session');
let passport = require('passport');
let bodyParser = require('body-parser');
let LocalStrategy = require('passport-local').Strategy;
let usersModel = require('./src/models/usersModel');
let FacebookStrategy = require('passport-facebook').Strategy;

const app = express();

//db connect
mongoose.connect('mongodb://localhost/frontcamp', { useNewUrlParser: true });

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

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

//routing
app.post('/calculate', (req, res) => {
	res.send(req.body);
});

app.listen(3001);