const mongoose = require('mongoose');

let pressureSchema = new mongoose.Schema({
    token: {
        type: String
    },
    value: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    date: {
        type: Number
	},
	height: {
		type: Number
	},
	weight: {
		type: Number
	},
	physicalActivity: {
		type: String
	},
	alcohol: {
		type: String
	},
	smoke: {
		type: Boolean
	}
});

module.exports = mongoose.model('pressure', pressureSchema); 