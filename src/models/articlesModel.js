let mongoose = require('mongoose');

let articleScheme = new mongoose.Schema({
    title: String,
    text: String
});

module.exports = mongoose.model('articles', articleScheme);