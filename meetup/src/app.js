var express = require('express');
var path = require('path');
var osprey = require('osprey');

var app = module.exports = express();

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.compress());
app.use(express.logger('dev'));

app.set('port', process.env.PORT || 3000);

var users = new Array();

api = osprey.create('/api', app, {
  ramlFile: path.join(__dirname, '/assets/raml/test.raml'),
  logLevel: 'debug'  //  logLevel: off->No logs | info->Show Osprey modules initializations | debug->Show all
});

 //Adding business logic to a valid RAML Resource
 app.get('/api/users', function(req, res) {

   res.send({
	    "result": {
	        "info": "OK"
	    },
	    "data": users
	});
 });
 
 app.post('/api/users', function(req, res) {
	   
	 	var user=req.body;
	   users.push(user);
	  
	   res.send({
		    "result": {
		        "info": "OK"
		    },
		    "data": user
		});
	 });
 
 app.get('/api/users/:userid', function(req, res) {
	   
	 	var user=users[req.params.userid];
	   
	  
	   res.send({
		    "result": {
		        "info": "OK"
		    },
		    "data": user
		});
	 });
 
 app.put('/api/users/:userid', function(req, res) {
	   
	 	users[req.params.userid]=req.body;
	   
	  
	   res.send({
		    "result": {
		        "info": "OK"
		    },
		    "data": users[req.params.userid]
		});
	 });
 
 app.delete('/api/users/:userid', function(req, res) {
	   
	 	
	 	users.splice(req.params.userid,1);
	   
	  
	   res.send({
		    "result": {
		        "info": "OK"
		    },
		    "data": users
		});
	 });
 
 

if (!module.parent) {
  var port = app.get('port');
  app.listen(port);
  console.log('listening on port ' + port);
}