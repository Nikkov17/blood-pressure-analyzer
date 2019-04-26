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
	}
}
