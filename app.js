var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongojs = require("mongojs");
var db = mongojs("customerapp", ["users"]);
var ObjectId = mongojs.ObjectId;

var app = express();

// var logger = function(req, res, next){
//     console.log("Logging");
//     next();
// }
// app.use(logger);

//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res){
    
    db.users.find(function(err, users){
        res.render('index', {
            title: "Customers App",
            users: users
        });
    });
});

app.post("/users/add", function(req, res){
    
    db.users.insert({firstname: req.body.firstName, lastName: req.body.lastName}, function(err, result){
        if(err){
            console.log("err");
        }

        res.redirect('/');
    });
});

app.delete("/users/delete/:id", function(req, res){
    
    db.users.remove({_id: ObjectId(req.params.id)}, function(err, result){
        if(err){
            console.log("err");
        }

        res.redirect(200, '/');
    });
});

app.listen(3000, function(){
    console.log("Server Started on Port 3000...");
});