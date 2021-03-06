const express = require('express');
const apiController = require('../src/controllers/apicontroller');
const usersModel = require('../src/models/usersModel');
const pressureModel = require('../src/models/pressureModel');
const passport = require('passport');
const bpMocks = require('../src/mocks/bponageandgendermocks');

const apiRouter = new express.Router();

apiRouter.post('/calculate', apiController.getNormalPressure);

apiRouter.post('/register', (req, res) => {
	usersModel.register(new usersModel({ 
		username: req.body.username,
		city: req.body.city
	}), req.body.password, function(err, user){
		if (err) {
			return res.send({ message: err });
		}
	})
});

apiRouter.post('/login', passport.authenticate('local'), function(req, res) {
	usersModel.findOne({ 'username': req.body.username }, (error, user) => {
		res.send({
			token: user._id
		});
	});
});

apiRouter.get('/logout', function(req, res){
	req.logout();
	res.send();
});

//add value
apiRouter.put('/addvalue', function(req, res, next) {
	let data = new pressureModel({
		token: req.body.token,
		value: req.body.value,
		age: req.body.age,
		gender: req.body.gender,
		date: req.body.date,
		height: req.body.height,
		weight: req.body.weight,
		physicalActivity: req.body.physicalActivity,
		alcohol: req.body.alcohol,
		smoke: req.body.smoke
	});

	data.save();
	res.send();
});

//get user values
apiRouter.get('/gethistory/:token', function(req, res, next) {
	let token = req.params.token;

	pressureModel.find({'token': token}, (error, items) => {
		if (items) {
			let array = [];

			items.forEach(function(item) {
				let bpOnGender = bpMocks[item.gender];
				let normalValue;
				let obj;
		
				for (key in bpOnGender) {
					if (item.age > key) {
						normalValue = bpOnGender[key];
					}
				}

				obj = {
					token: item.token,
					value: item.value,
					age: item.age,
					gender: item.gender,
					date: item.date,
					height: item.height,
					weight: item.weight,
					physicalActivity: item.physicalActivity,
					alcohol: item.alcohol,
					smoke: item.smoke,
					normalValue: normalValue,
				};
				obj.rejectionReasons = apiController.analyzeRejectionReasons(obj);

				array.push(obj);
			});

			res.send(array);
		} else {
			next();
		};
	});
});

module.exports = apiRouter;