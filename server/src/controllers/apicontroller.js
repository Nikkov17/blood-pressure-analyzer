const bpMocks = require('../mocks/bponageandgendermocks');

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
	}
}
