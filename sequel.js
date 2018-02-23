var Sequelize = require('sequelize');
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

var Article = con.define('article', {//making a new table
	slug:{
		type: Sequelize.STRING,
		primaryKey: true
	},
	title: {
		type: Sequelize.STRING,
		unique: true, // all titles are unique
		//if you try to insert something thats already existing, 
		//sq will throw an error
		allowNull: false
	},

	//body: Sequelize.TEXT, same as the one below
	body: {
		type: Sequelize.TEXT,
		//defaultValue: 'default time!' doesnt work w text + windows
	}
}, {
	timestamps: false
});

//sync creates tables and data, doesnt update
//migrations basically update without manually deleting tables

//con.sync();//connect to database 

con.sync({
	force: true,//clears out old tables of same name
	logging: console.log
}).then(function(){	
	/* inserting info to the table
	Article.create({
		title: 'my first title!',
		body: 'my first article! Well aint this just fun'
	});*/

	/* selecting from table
	Article.findById(1).then(function(article){
		console.log(article.dataValues);
	}); */
}); 
