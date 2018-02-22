var express = require('express');
var mysql = require('mysql');
var app = express();

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'dbnode'
});

con.connect(function(error){
	if(!!error){
		console.log('error');

	}else{
		console.log('connected');
	}
});

app.get('/', function(req, resp){
	con.query("SELECT * FROM mySampleTable", function(error, rows, fields){
		if(!!error){
			console.log('error');
		}else{
			console.log('gud\n');
			console.log(rows);
			resp.send("hellooo, " + rows[0].Name);
		}
	}); 
	con.query("INSERT INTO mySampleTable VALUES (7,'lil')", function(error, result){
	if(!!error){
		console.log('error');
	}else{
		console.log('gud\n');
		console.log(result);
		resp.send("hellooo, " + result);
	}}); 
});

app.listen(1337);