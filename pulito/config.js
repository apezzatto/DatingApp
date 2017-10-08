var mongo = require("mongoose");  
var db =   
mongo.connect("mongodb://pulitoAdmin:pulito2017@pulitocluster0-shard-00-00-bx6lt.mongodb.net:27017,pulitocluster0-shard-00-01-bx6lt.mongodb.net:27017,pulitocluster0-shard-00-02-bx6lt.mongodb.net:27017/test?ssl=true&replicaSet=pulitoCluster0-shard-0&authSource=admin", function(err, response){  
   if(err){ console.log('Failed to connect to ' + db); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});  
  
  
module.exports =db;  
  
// reactcrud is database name  
// 192.168.1.71:27017 is your mongo server name 