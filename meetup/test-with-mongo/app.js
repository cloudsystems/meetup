var express = require('express');
var path = require('path');
var osprey = require('osprey');
var app = module.exports = express();
var ObjectID = require('mongodb').ObjectID;
var db;
var MongoClient = require ('mongodb').MongoClient;

//permite recoger la conexion a la base de datos
MongoClient.connect('mongodb://localhost:27017/meetup',function(err,dbmongo){
	if (err) throw err;
		db = dbmongo;		
	});

	
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.compress());
app.use(express.logger('dev'));

app.set('port', process.env.PORT || 3000);

//antes
//var users = new Array();


//una vez implementada la API, ya no hace falta el fake
//api = osprey.create('/api', app, {
//  ramlFile: path.join(__dirname, '/assets/raml/test.raml'),
//  logLevel: 'debug'  // logLevel: off->No logs | info->Show Osprey modules
//						// initializations | debug->Show all
//});

 /**
  * obtiene los usuarios
  */
 app.get('/api/users', function(req, res) {

	  var params={};
	   if (req.params){
		   params=req.params;
	   }
		db.collection('users').find(params).toArray(function(err,users){
			if (err)throw err;
			 res.send({
				    "result": {
				        "info": "OK"
				    },
				    "data": users
				});
				
		});
	 
	 
  
 });
 
 /**
  * crea un usuario
  */
 app.post('/api/users', function(req, res) {
	   
	   //utilizamos el cuerpo del mensaje para crear el objeto usuario
	 	var user=req.body;
	   // antes
	   // users.push(user);
	   // ahora
	 	db.collection('users').insert(user,function(err,user){
						
			   res.send({
				    "result": {
				        "info": "OK"
				    },
				    "data": user
				});
			 });
 	});
 
 
 /**
  * obtiene un usuario
  */
 app.get('/api/users/:userid', function(req, res) {
	   
	    // antes
	   // var user=users[req.params.userid];
	   //hay que convertir el id de usuario en un objectid de mongo
	   var objectId = new ObjectID(req.params.userid);
	  
	   //findOne me permite obtener un solo objeto 
	   db.collection('users').findOne({_id:objectId},function(err,user){
			
		   res.send({
			    "result": {
			        "info": "OK"
			    },
			    "data": user
			});
		 });
 });

/**
 * modifica todo el usuario (no es una actualización parcial, si no total)
 */ 
 app.put('/api/users/:userid', function(req, res) {
	   
	 // antes
	 // users[req.params.userid]=req.body;
	   var objectId = new ObjectID(req.params.userid);
	 
	  var user = req.body;
	 
	  
	 db.collection('users').update({_id:objectId},user,function(err,updated){
			
		   res.send({
			    "result": {
			        "info": "OK"
			    },
			    "data": updated
			});
		 });
 });
	   
	 
 /**
  * permite borrar un usuario
  */
 app.delete('/api/users/:userid', function(req, res) {
	   
	 var objectId = new ObjectID(req.params.userid);
	 // antes
	 // users.splice(req.params.userid,1);
	   
	 db.collection('users').remove({_id:objectId},function(err,user){
			
		 res.send({
			    "result": {
			        "info": "OK"
			    },
			    "data": user
			});
		 });
	  
	 });
 
 

if (!module.parent) {
  var port = app.get('port');
  app.listen(port);
  console.log('listening on port ' + port);
}