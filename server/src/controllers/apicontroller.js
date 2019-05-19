const bpMocks = require('../mocks/bponageandgendermocks');
const usersModel = require('../models/usersModel');
// const nodemailer = require("nodemailer");

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
		let systolicPressureValue = obj.value.split('/')[0];
		let dyastolicPressureValue = obj.value.split('/')[1];
		let systolicNormalPressureValue = obj.normalValue.split('/')[0];
		let dyastolicNormalPressureValue = obj.normalValue.split('/')[1];

		if (obj.height && obj.weight) {
			let weight = obj.weight / (obj.height / 100 * obj.height / 100);
			if (weight < 18.5) {
				reasonsArray.push('Recommend to gain weight');
			} else if (weight > 25 && weight < 30) {
				reasonsArray.push('Recommend to lose weight');
			} else if (weight > 30) {
				reasonsArray.push('Extremely recommend to lose weight');
			}
		}

		if (obj.physicalActivity) {
			if (obj.physicalActivity === 'notactive') {
				reasonsArray.push('Try to increase your physical activity');
			}
		}

		if (obj.alcohol) {
			if (obj.alcohol === 'normal') {
				reasonsArray.push('Reduction in the amount of alcohol consumed can contribute to better health');
			} else if (obj.alcohol === 'active') {
				reasonsArray.push('You need to reduce the amount of alcohol consumed.');
			}
		}

		if (obj.smoke) {
			if (obj.smoke === true) {
				reasonsArray.push('Smoking can cause pressure deterioration');
			}
		}

		if (obj.value) {
			if (obj.value === true) {
				reasonsArray.push('Smoking can cause pressure deterioration');
			}
		}

		if (systolicPressureValue && systolicNormalPressureValue && dyastolicPressureValue && dyastolicNormalPressureValue) {
			if (
				(systolicNormalPressureValue - systolicPressureValue) > 20 &&
				(dyastolicNormalPressureValue - dyastolicPressureValue) > 20
			) {
				reasonsArray.push('Try to avoid stress conditions');
				reasonsArray.push('Try to avoid taking various stimulating substances');
			}
		}

		if (systolicPressureValue && dyastolicPressureValue) {
			if ((systolicPressureValue - dyastolicPressureValue) > 55) {
				reasonsArray.push('You have a significant difference between the upper and lower pressure, which may indicate a malfunction of the digestive system, lesions of the gallbladder, ducts, and tuberculosis.');
			} else if ((systolicPressureValue - dyastolicPressureValue) < 30) {
				reasonsArray.push('You have a lower difference in upper and lower pressure, which can lead to hypoxia, atrophic changes in the brain, impaired vision, respiratory paralysis, cardiac arrest. Seek medical attention immediately.');
			}
		}


		return reasonsArray;
	},

	// sendNotifications() {
	// 	usersModel.find((error, users) => {
	// 		users.forEach(user => {
	// 			if(user.username.match( /@/ig ) && user.city) {
	// 				let testAccount = await nodemailer.createTestAccount();

	// 				let xhr = new XMLHttpRequest();
	// 				xhr.open('GET', 'http://api.apixu.com/v1/current.json?key=d9fe708ea76e4ad6977111820191705&q=' + user.city);
	// 				xhr.onreadystatechange = (resp) => {
	// 					let pressureValue = resp.condition.pressure_mb / 133.466;
	// 					let text;

	// 					if (pressureValue > 770 || pressureValue < 740) {
	// 						text = 'Be careful, there is increased pressure, with high atmospheric pressure, weather-sensitive people should behave more passively, avoid physical exertion, measure blood pressure more often and consult a doctor if necessary. Additional medications should not be taken, however, with an increase in blood pressure, you can resort to short-acting drugs.';
	// 					} else if (pressureValue < 740) {
	// 						text = 'Be careful, there is a reduced atmospheric pressure, with low atmospheric pressure, weather-sensitive people should behave more passively, avoid physical exertion, measure blood pressure more often and, if necessary, consult a doctor. Additional medications should not be taken, however, with an increase in blood pressure, you can resort to short-acting drugs.';
	// 					}

	// 					if (text) {
	// 						let transporter = nodemailer.createTransport({
	// 							host: "smtp.ethereal.email",
	// 							port: 587,
	// 							secure: false,
	// 							auth: {
	// 								user: testAccount.user,
	// 								pass: testAccount.pass
	// 							}
	// 						});
	// 						await transporter.sendMail({
	// 							from: 'mimohojij@mail-finder.net',
	// 							to: user.username,
	// 							subject: "weather",
	// 							text: text,
	// 						});
	// 					}
	// 				};
	// 				xhr.send(JSON.stringify(data));
	// 			}
	// 		});
	// 	});
	// }
}
