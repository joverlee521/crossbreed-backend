// Loading environmental variables here
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport')
const app = express()
const PORT = process.env.PORT || 3001

const bcrypt = require('bcrypt-nodejs');
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('./db/models/user');
var sgTransport = require('../src/sendgrid-transport.js');



// ===== Middleware ====
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// ===== testing middleware =====
app.use(function(req, res, next) {
	console.log('===== passport user =======')
	console.log(req.session)
	console.log(req.user)
	console.log('===== END =======')
	next()
})
// testing
app.get(
	'/auth/google/callback',
	(req, res, next) => {
		console.log(`req.user: ${req.user}`)
		console.log('======= /auth/google/callback was called! =====')
		next()
	},
	passport.authenticate('google', {
		successRedirect: 'https://crossbreed-backend.herokuapp.com',
		failureRedirect: 'https://crossbreed-backend.herokuapp.com/login'
	})
) 
//password reset 

app.post('/forgot', function(req, res, next) {
	console.log("testing forgot route " +  JSON.stringify(req.body))
	const object1 = req.body
	// const {email, thatEmptyString }= req.body;
	const email = Object.keys(object1)

    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ 'local.email': email }, function(err, user) {
        //   if (!user) {
        //     req.flash('error', 'No account with that email address exists.');
        //     return res.redirect('/forgot');
		//   }
		console.log("before blue mountain " +user)
		if (err) return res.json("blue mountain" + err);

		// const userEmailObj = {
		// 	'local.email': user.email,
		// 	'local.resetPasswordToken': token,
		// 	'local.resetPasswordExpires' : Date.now() + 3600000
		// }
          user.local.resetPasswordToken = token;
          user.local.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport('SMTP', {
          service: 'SendGrid',
          auth: {
            user: 'kimmykablitz',
            pass: 'Xuandieu1'
          }
        });
        var mailOptions = {
          to: user.local.email,
          from: 'izumi199@yahoo.com',
          subject: 'Your crossbreed account user password reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
    //   res.redirect('/forgot');
    });
  });

/* Express app ROUTING */
const routes = require('./routes');
app.use(routes);

// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})

app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
