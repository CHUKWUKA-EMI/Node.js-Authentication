const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_USER, DB_DATABASE, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
	host: "ruby.db.elephantsql.com",
	dialect: "postgres",
	port: 5432,
	define: {
		timestamps: false,
	},
});

module.exports = sequelize;
