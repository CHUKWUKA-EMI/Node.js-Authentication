const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./DB/database");
const connection = require("./DB/connection");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const { QueryTypes } = require("sequelize");

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		console.log(user);
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		db.Users.findByPk(id).then(function (user) {
			if (user) {
				done(null, user.get());
			} else {
				done(user.errors, null);
			}
		});
	});

	passport.use(
		"local-login",
		new LocalStrategy(
			{
				usernameField: "username",
				passwordField: "password",
				passReqToCallback: true,
			},
			async function (req, username, password, done) {
				const user = await db.Users.findOne({ where: { username: username } });
				if (!user) {
					return done(null, false, req.flash("loginMsg", "User not found"));
				}

				if (!bcrypt.compareSync(password, user.password)) {
					return done(null, false, req.flash("loginMsg", "Invalid Password"));
				}
				// console.log(user.dataValues.id);
				return done(null, user);
			}
		)
	);
};
