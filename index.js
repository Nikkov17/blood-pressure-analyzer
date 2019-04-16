let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let pug = require('pug');
let mongoose = require('mongoose');

let app = express();

//db connect
mongoose.connect('mongodb://localhost/frontcamp', { useNewUrlParser: true });

//view engine
app.set('view engine', 'pug');
app.set('views', './views/');

//static folder path
app.use(express.static(path.join(__dirname, 'src')));

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/articlesList', require('./routes/articlesList'));

//error handling
app.use((req, res, next) => {
    res.render('error', { message: 'Sorry, but something went wrong!' });
});

app.listen(3000);