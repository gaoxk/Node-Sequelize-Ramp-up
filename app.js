var Sequelize = require('sequelize');
//for the front end
var express = require('express');
var app = express();
var path = require('path');

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

//make things caps to indicate constructive func
var con = new Sequelize('dbnode', 'root', '',{
	host: 'localhost',
	dialect: 'mysql',
	pool:{
		max: 5,
	    min: 0,
	    acquire: 30000,
	    idle: 1000
	}
}); 

var TextChange = con.define('textChangeTable', {//making a new table
	identifier: {
		type: Sequelize.STRING,
		unique: false, // all titles are unique
		//if you try to insert something thats already existing, 
		//sq will throw an error
		allowNull: false,
	},

	//body: Sequelize.TEXT, same as the one below
	body: {
		type: Sequelize.TEXT,
		//defaultValue: 'default time!' doesnt work w text + windows
		validate:{
			startsWithUpper: function(bodval){
				var first = bodval.charAt(0);
				var startsWithUpper = first == first.toUpperCase();
				if(!startsWithUpper){
					throw new Error('First letter of body needs to be upper case');
				}
			}
		}
	}
}, {
	timestamps: false
});

//sync creates tables and data, doesnt update
//migrations basically update without manually deleting tables

//con.sync();//connect to database 

var display;

con
	.sync({
		force: true,//clears out old tables of same name
		logging: console.log
	})
	.then(function(){	//connection is done
		
		TextChange.create({
			identifier: 'Some prersistent title',
			body: 'Uses .create'
		}).then(function (insertedReord){
			//promise
			//happens when .create, an async func is done

			console.log("using .create: "  );
			console.log(insertedReord.dataValues);
			display = insertedReord.dataValues;

		});
	})
	.catch(function(error){
		console.log("oopsies: " + error);
}); 





app.post('/csc', function(req, resp){
	console.log("hello submit");
}); 



// Define the port to run on
app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});


$(document).ready(function (){
	console.log("hello!");
});

$('#submit').click(function () {
	alert("woohoo!");
});
