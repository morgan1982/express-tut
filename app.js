var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// middleware 

// var logger = function (req, res, next) {
//     console.log('logging...')
//     next();
// }

// app.use(logger);
// bodyparser as middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, function() {
    console.log('Server started on 3000...')
});
