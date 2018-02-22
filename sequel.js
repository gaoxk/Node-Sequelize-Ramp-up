var Sequelize = require('sequelize');
//make things caps to indicate constructive func
var con = new Sequelize('name of db', 'root', ''); 
//conect to db, (db name, username, password) <----- sequelize assumes youre using mysql
//usually youll need to speciify the db stuff with an object

var Artivle = con.define('article', {//mekign a new table
	title: Sequelize.STRING,
	body: Sequelize.TEXT
});
