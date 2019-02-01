const express = require('express');
const router = express.Router();
const User = require('../../db/models/user');
const petController = require('../../controllers/petController');
const userController = require('../../controllers/userController');
const passport = require('../../passport');
const asyncMiddleWare = require('../middleware/async');

// router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// router.get('/google/callback',
// 	passport.authenticate('google', {
// 		successRedirect: 'http://localhost:3000',
// 		failureRedirect: 'http://localhost:3000/login'
// 	}))

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
router.post(
    "/login/google",
    (req, res, next) => {
        const { id, givenName, email } = req.body;

        User.findOneAndUpdate({ 'google.googleId': id }, { $set: { 'displayName': givenName } }, { upsert: true, new: true }, (err, user) => {
            if(!user) {
                const userObj = new userObj({
                    _id: user._id,
                    displayName: user.displayName,
                    pets: user.pets,
                    eggs: user.eggs
                  });
     
                  req.login(userObj, function(err) {
                    if (err) {
                      console.log("Hit some error ", err);
                      return res.status(307);
                    } else {
                      next();
                    }
                  })
                    asyncMiddleWare(petController.createStarterPet)
            }
             else{
                return user
            }
        })
    },
)

router.post(
	'/signup',
	function (req, res, next) {
		console.log(req.body)
		console.log('======INCOMING NEW USER==========')
		const { username, password, displayName } = req.body
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
//Create the user in the db

//Authenticate the user with passport

//Resolve to the front end with the token


module.exports = router;