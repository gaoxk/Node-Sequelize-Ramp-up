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
	title: Sequelize.STRING,
	body: Sequelize.TEXT
});

//con.sync();//connect to database 
con.sync().then(function(){
	
	/* inserting info to the table
	Article.create({
		title: 'my first title!',
		body: 'my first article! Well aint this just fun'
	});*/

	Article.findById(1).then(function(article){
		console.log(article.dataValues);
	});
});