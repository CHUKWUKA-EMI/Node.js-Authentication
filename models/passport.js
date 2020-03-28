const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const bcrypt = require('bcryptjs')
const flash = require('connect-flash')


module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id)
    });

    passport.deserializeUser(function (id, done) {
        connection.query('SELECT * from accounts WHERE id =?', [id], function (err, rows) {
            done(err, rows[0])
        })
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        connection.query('SELECT * FROM accounts WHERE username =?', [username], function (err, rows) {
            if (err) return done(err);
            if (!rows.length) {
                return done(null, false, req.flash('loginMsg', 'No user found'));
            }
            if (!bcrypt.compareSync(password, rows[0].password)) {
                return done(null, false, req.flash('loginMsg', 'Invalid Password!'));
            }
            return done(null, rows[0])
        });
    })
    );
};

