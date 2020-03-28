//const express = require('express')
//const passport = require('passport')
const bcrypt = require('bcryptjs')
const mailTransport = require('../Users/users')
const connection = require('../models/database');
//const router = express.Router()

//require('../models/passport')

//const app = express()


module.exports = function (app, passport) {

    app.get('/register', (req, res) => {
        res.render('register', { message: req.flash('regMsg') })
    })
    app.post('/register', (req, res) => {
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const username = req.body.username
        const password = req.body.password
        const email = req.body.email

        const pass_hash = bcrypt.hashSync(password, 10);


        connection.query('INSERT INTO accounts(firstname, lastname, email, password, username) VALUES(?,?,?,?,?)', [firstname, lastname, email, pass_hash, username], (error, result) => {
            if (error) throw error;
            console.log('User details inserted: ', result);
        });

        mailTransport.sendMail({
            from: 'emichukwuka@gmail.com',
            to: email,
            subject: 'SUCCESSFUL REGISTRATION',
            text: 'Thanks for registering with us.'
        }, function (error, info) {
            if (error) { console.error('Unable to send mail', error) } else {
                console.info('Mail sent to ' + email + " " + info['test'])
            }

        });

        res.redirect('/login')
    })

    app.get('/login', (req, res, ) => {
        res.render('login', { message: req.flash('loginMsg') })
    })

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }))

    app.get('/logout', (req, res) => {
        req.logOut()
        res.redirect('/')
    })

    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile', {
            user: req.user
        });
    })

}
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
};