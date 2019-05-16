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
    }
});

module.exports = mongoose.model('pressure', pressureSchema); 