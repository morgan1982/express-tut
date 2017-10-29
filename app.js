var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

// middleware 

// var logger = function (req, res, next) {
//     console.log('logging...')
//     next();
// }

// app.use(logger);

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// bodyparser as middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 

//Set static path
app.use(express.static(path.join(__dirname, 'public'))); // hear react will go

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

var users = [
    {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@gmail.com',
    },
    {
        id: 2,
        first_name: 'Max',
        last_name: 'Goodman',
        email: 'MaxGoodman@gmail.com',
    },
    {
        id: 3,
        first_name: 'Tulio',
        last_name: 'Morgan',
        email: 'johndoe@gmail.com',
    },
]



app.get('/', (req, res) => {
    // res.send('Hello World');
    // res.json(people);
    let title = 'Customers'
    res.render('index', {
        title: title,
        users: users
    });
});

app.post('/users/add', function(req, res) {
    req.checkBody('first_name', 'First name is required').notEmpty;
    req.checkBody('last_name', 'Last name is required').notEmpty;
    req.checkBody('email', 'Email is required').notEmpty;
    
    var errors = req.validationErrors()

    if(errors) {
        console.log('ERRORS')
    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,        
        }
        console.log(newUser);
        console.log('succes');
    }

})


app.listen(3000, function() {
    console.log('Server started on 3000...')
});
