module.exports = {
	getPressure: (req, res) => {
		let data = {
			age: req.body.age,
			gender: req.body.gender,
			systolicBloodPressure: req.body.systolicBloodPressure,
			diastolicBloodPressure: req.body.diastolicBloodPressure
		}
		res.send(data);
	}
}
