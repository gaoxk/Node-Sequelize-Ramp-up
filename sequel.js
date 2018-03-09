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
		allowNull: false,
		validate: {
			len: {//customize your validation
				args: [10,69],
				msg: 'The title should be no more than 69 char and no less than 10 char'
			}
		}
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

con
	.sync({
		force: true,//clears out old tables of same name
		logging: console.log
	})
	.then(function(){	
		///inserting info to the table
		
		//fails validaion 
	 	return Article.create({
			title: 'my first Article!!!!!!!!!!!!!!!1',
			body: 'My first article! Well aint this just fun'
		});
 
		/* selecting from table
		Article.findById(1).then(function(article){
			console.log(article.dataValues);
		}); */
	})
	.catch(function(error){
		console.log("oopsies: " + error);
}); 
