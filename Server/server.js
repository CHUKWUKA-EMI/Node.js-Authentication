const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts')
const { check, validationResult } = require('express-validator');
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const mysql = require('mysql');
const path = require('path');
const connection = require('../models/database');
const mailTransport = require('../Users/users')

const app = express();

require('../models/passport')(passport)


app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.use(session({
    name: 'CHUKWUKA',
    secret: 'GRACE',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('../routes/pages')(app, passport)
app.use('/', require('../routes/home'))


module.exports = app;