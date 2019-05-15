const express = require('express');
const apiController = require('../src/controllers/apicontroller');
const usersModel = require('../src/models/usersModel');
const passport = require('passport');

const apiRouter = new express.Router();

apiRouter.post('/calculate', apiController.getNormalPressure);

apiRouter.post('/register', (req, res) => {
	usersModel.register(new usersModel({ username: req.body.username }), req.body.password, function(err, user){
		if (err) {
			return res.render('error', { message: err });
		}

		passport.authenticate('local')(req, res, function(){
			let date = new Date();

			res.send({
				token: date.getTime()
			});
		})
	})
});

apiRouter.post('/login', passport.authenticate('local'), function(req, res) {
	let date = new Date();

	res.send({
		token: date.getTime()
	});
});

apiRouter.get('/logout', function(req, res){
	req.logout();
	res.send();
});

module.exports = apiRouter;