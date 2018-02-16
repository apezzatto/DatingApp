var express = require('express');
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var url = 'mongodb://pulitoAdmin:pulito2017@pulitocluster0-shard-00-00-bx6lt.mongodb.net:27017,pulitocluster0-shard-00-01-bx6lt.mongodb.net:27017,pulitocluster0-shard-00-02-bx6lt.mongodb.net:27017/Pulito?ssl=true&replicaSet=pulitoCluster0-shard-0&authSource=admin'

app.use(express.static(path.join(__dirname, 'views')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next){
    console.log(`${req.method} request for '${req.url}'`);
    next();
})

app.get('/signin', function (req, res) {
    res.sendFile(__dirname+"/views/sign-in.html");
});

app.post('/signin', function (req, res) {
    var email = {email: req.body.email, pwd: req.body.password};
    console.log(JSON.stringify(email));
    
    mongo.connect(url, function(err, db) {
      if (err) throw err;
      db.collection("Users").find(email).toArray(function(err, result) {
        if (err) throw err;
        
        console.log(result);
          
        if (result[0]!=null)
            res.sendFile(__dirname+"/views/home.html");    
        else
            res.sendFile(__dirname+"/views/sign-in.html");
          
        db.close();
      });
    });
});

app.listen(3000);

console.log('Port 3000');

module.export = app;