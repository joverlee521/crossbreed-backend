const express = require('express');
const router = express.Router();
const User = require('../../db/models/user');
const petController = require('../../controllers/petController');
const userController = require('../../controllers/userController');
const passport = require('../../passport');
const asyncMiddleWare = require('../middleware/async');



router.post(
	'/login',
	function (req, res, next) {
		passport.authenticate('local', function(err, user, info) {
			if (err) { return res.status(500).json(err) }
			if (!user) { return res.status(403).json( { message: info.message }) }
			req.login(user, (err) => {
				if(err){
					return res.status(500).json(err);
				}
				next();
			})
		})(req, res, next)
	},
	userController.findOne
)

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

// Route for logging in with Google on the front-end
// Will look for googleId in the database, will create doc if it doesn't exist already
router.post('/login/google', (req, res, next) => {
	console.log("beep" + JSON.stringify(req.body))
	const { id, givenName } = req.body;
	User.findOneAndUpdate({ 'google.googleId': id }, { $set: { 'displayName': givenName } }, { upsert: true, new: true }, (err, user) => {
		
		console.log("purple mountain"+ user)
    if (err) return res.json("blue mountain" + err);
		// return res.json(
		// 	{
		// 		_id: user._id,
		// 		displayName: user.displayName,
		// 		pets: user.pets,
		// 		eggs: user.eggs
		// 	}
    // )
    //AP: instead of returning user as above, you would instead do:
    const userObj = {
      _id: user._id,
	  displayName: user.displayName,
	  pets: user.pets,
	  eggs: user.eggs
    }
    req.login(userObj, function(err) { //AP: req.login is available in passport; it's not an express function
      if (err) {
		console.log('Hit some error ', err);
		return res.status(307)
      } else {
        next();
      }
    })
		// next(); => AP: Moved next function call above

	})
},

  // passport.authenticate('google'), asyncMiddleWare(petController.createStarterPet)
  // AP: Since we are forcing passport session with req.login, we can skip passport.authenticate here and straight call the createStarterPet function
  asyncMiddleWare(petController.createStarterPet)

)

router.post(
	'/signup',
	function (req, res, next) {
		console.log(req.body)
		console.log('======INCOMING NEW USER==========')
		const { username, password, displayName, email } = req.body
		console.log("REQ.BODY: ", req.body)
		// ADD VALIDATION
		User.findOne({ 'local.username': username }, (err, userMatch) => {
			if (userMatch) {
				return res.status(403).json({
					message: `Sorry, the username: "${username}" is already taken`
				})
			}
			const newUser = new User({
				'local.username': username,
				'local.password': password,
				'local.email':email,
				displayName
			})
			newUser.save((err, savedUser) => {
				if (err) return res.status(500).json(err);

				//NOTE: make sure we ONLY return the minimum stuff we need to know about the user -- ie, their _id and pets array
				next();
			})
		})
	},
	passport.authenticate('local'), asyncMiddleWare(petController.createStarterPet)
)


//reset password

// router.post('/forgot', function(req, res, next) {
// 	console.log("testing forgot route " +  req.body)
// 	const email = req.body;
//     async.waterfall([
//       function(done) {
//         crypto.randomBytes(20, function(err, buf) {
//           var token = buf.toString('hex');
//           done(err, token);
//         });
//       },
//       function(token, done) {
//         User.findOne({ email: req.body.email }, function(err, user) {
//         //   if (!user) {
//         //     req.flash('error', 'No account with that email address exists.');
//         //     return res.redirect('/forgot');
// 		//   }
// 		if (err) return res.json("blue mountain" + err);

  
//           user.resetPasswordToken = token;
//           user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
//           user.save(function(err) {
//             done(err, token, user);
//           });
//         });
//       },
//       function(token, user, done) {
//         var smtpTransport = nodemailer.createTransport('SMTP', {
//           service: 'SendGrid',
//           auth: {
//             user: '!!! YOUR SENDGRID USERNAME !!!',
//             pass: '!!! YOUR SENDGRID PASSWORD !!!'
//           }
//         });
//         var mailOptions = {
//           to: user.email,
//           from: 'izumi199@yahoo.com',
//           subject: 'Your crossbreed account user password reset',
//           text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//             'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//             'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//             'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//         };
//         smtpTransport.sendMail(mailOptions, function(err) {
//           req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
//           done(err, 'done');
//         });
//       }
//     ], function(err) {
//       if (err) return next(err);
//       res.redirect('/forgot');
//     });
//   });




module.exports = router;