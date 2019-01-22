const express = require('express');
const router = express.Router();
const User = require('../../db/models/user');
const passport = require('../../passport');

// router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// router.get('/google/callback',
// 	passport.authenticate('google', {
// 		successRedirect: 'http://localhost:3000',
// 		failureRedirect: 'http://localhost:3000/login'
// 	}))

router.post(
	'/login',
	function(req, res, next) {
		console.log(req.body)
		console.log('================')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		//Only return explicitly what we need to the front end
		const cleanUser = {
			_id: user._id,
			displayName: user.displayName,
/* 			pets: user.pets,
			eggs: user.eggs */
		};
		res.json({ user: cleanUser })
	}
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

router.post('/signup', (req, res) => {
	const { username, password, displayName /* firstName, lastName, photo,  */ } = req.body
	console.log("REQ.BODY: ", req.body)
	// ADD VALIDATION
	User.findOne({ 'local.username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
		}
		const newUser = new User({
			'local.username': username,
			'local.password': password,
			displayName,
		/* 	firstName,
			lastName,
			photo */
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			//NOTE: make sure we ONLY return the minimum stuff we need to know about the user -- ie, their _id and pets array
			return res.json(
				{	_id: savedUser._id,
					displayName: savedUser.displayName,
				  	pets: savedUser.pets
				})
		})
	})
})

// Route for logging in with Google on the front-end
// Will look for googleId in the database, will create doc if it doesn't exist already
router.post('/login/google', (req, res) => {
	const { id, givenName } = req.body;
	User.findOneAndUpdate({ 'google.googleId': id }, {$set: { 'displayName': givenName }}, { upsert: true, new: true }, (err, user) => {
		if(err) return res.json(err);
		return res.json(
			{
				_id: user._id,
				displayName: user.displayName,
				pets: user.pets
			}
		)
	})
})

module.exports = router