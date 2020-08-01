const Sequelize = require("sequelize");
const sequelize = require("./connection");

const Users = require("../models/users");

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = Users;

module.exports = db;
