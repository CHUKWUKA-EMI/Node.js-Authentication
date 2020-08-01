const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const { check, validationResult } = require("express-validator");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require("path");
require("dotenv").config();

const app = express();

require("../passport")(passport);

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(
	session({
		name: process.env.SESSION_NAME,
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("../routes/pages")(app, passport);
app.use("/", require("../routes/home"));

module.exports = app;
