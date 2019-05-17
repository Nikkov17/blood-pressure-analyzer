const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose'); 

let UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		index: true,
		required: true
	},
	password: {
		type: String,
	},
	password2: {
		type: String,
	},
	city: {
		type: String,
	}
});

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', UserSchema); 