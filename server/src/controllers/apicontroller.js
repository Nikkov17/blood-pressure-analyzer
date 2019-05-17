const bpMocks = require('../mocks/bponageandgendermocks');
const usersModel = require('../src/models/usersModel');
const nodemailer = require("nodemailer");

module.exports = {
	getNormalPressure: (req, res) => {
		let data = {
			age: req.body.age,
			gender: req.body.gender,
			systolicBloodPressure: req.body.systolicBloodPressure,
			diastolicBloodPressure: req.body.diastolicBloodPressure
		};
		let bpOnGender = bpMocks[data.gender];
		let normalValue;

		for (key in bpOnGender) {
			if (data.age > key) {
				normalValue = bpOnGender[key];
			}
		}
		data.normalValue = normalValue;

		res.send(data);
	},

	// obj structure:
	// token
	// value
	// age
	// gender
	// date
	// height
	// weight
	// physicalActivity
	// alcohol
	// smoke
	// normalValue
	analyzeRejectionReasons: (obj) => {
		let reasonsArray = [];
		if (obj.height && obj.weight) {
			let weight = obj.weight / (obj.height  / 100 * obj.height / 100);
			if (weight < 18,5) {
				reasonsArray.push({'weight': 'Underweight'});
			} else if (weight > 25 && weight < 30) {
				reasonsArray.push({'weight': 'Overweight'});
			} else if (weight > 30) {
				reasonsArray.push({'weight': 'Extremely overweight'});
			}
		}

		if (obj.physicalActivity) {
			if (obj.physicalActivity === 'notactive') {
				reasonsArray.push({'physicalActivity': 'Try to increase your physical activity'});
			}
		}

		if (obj.alcohol) {
			if (obj.alcohol === 'normal') {
				reasonsArray.push({'alcohol': 'Reduction in the amount of alcohol consumed can contribute to better health'});
			} else if (obj.alcohol === 'active') {
				reasonsArray.push({'alcohol': 'You need to reduce the amount of alcohol consumed.'});
			}
		}

		if (obj.smoke) {
			if (obj.smoke === true) {
				reasonsArray.push({'smoke': 'smoking can cause pressure deterioration'});
			}
		}

		return reasonsArray;
	},

	sendNotifications() {
		usersModel.find((error, users) => {
			users.forEach(user => {
				if(user.username.match( /@/ig ) && user.city) {
					let testAccount = await nodemailer.createTestAccount();

					let xhr = new XMLHttpRequest();
					xhr.open('GET', 'http://api.apixu.com/v1/current.json?key=d9fe708ea76e4ad6977111820191705&q=' + user.city);
					xhr.onreadystatechange = (resp) => {
						let pressureValue = resp.condition.pressure_mb / 133.466;
						let text;

						if (pressureValue > 770 || pressureValue < 740) {
							text = 'Be careful, there is increased pressure, with high atmospheric pressure, weather-sensitive people should behave more passively, avoid physical exertion, measure blood pressure more often and consult a doctor if necessary. Additional medications should not be taken, however, with an increase in blood pressure, you can resort to short-acting drugs.';
						} else if (pressureValue < 740) {
							text = 'Be careful, there is a reduced atmospheric pressure, with low atmospheric pressure, weather-sensitive people should behave more passively, avoid physical exertion, measure blood pressure more often and, if necessary, consult a doctor. Additional medications should not be taken, however, with an increase in blood pressure, you can resort to short-acting drugs.';
						}

						if (text) {
							let transporter = nodemailer.createTransport({
								host: "smtp.ethereal.email",
								port: 587,
								secure: false,
								auth: {
									user: testAccount.user,
									pass: testAccount.pass
								}
							});
							await transporter.sendMail({
								from: 'mimohojij@mail-finder.net',
								to: user.username,
								subject: "weather",
								text: text,
							});
						}
					};
					xhr.send(JSON.stringify(data));
				}
			});
		});
	}
}
