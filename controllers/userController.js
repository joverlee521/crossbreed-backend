// Controller
// ============================
const User  = require('../models/User');

module.exports = {
  //Create
  create: function(req, res) {
     //TEST CODE
     User.create(req.body)
     .then(result => res.json(result))
     .catch(err => res.json(err));
  },
  //Find all 
  //TEST PURPOSES
  findAll: function(req, res) {
     User.find()
     .then(results => res.json(results))
     .catch(err=> res.json(err));
  },
  //Find (one)
  findOne: function(req, res) {
    User.find({_id: req.params.userId})
    .then(results => res.json(results))
    .catch(err=> res.json(err));
  },
  // Delete one
  //NOTE: deleting a user will ALSO delete the pets they have on the site
  delete: function(req, res) {
    User.deleteOne({_id: req.params.userId})
    .then(result=>res.json(result))
    .catch(err=>res.json(err));
  },
  // Update the specified user's profile
  update: function(req, res) {
   //QUESTION: should they be able to update their email right now?  Without another way to authenticate, this would break
    //Check what we passed in -- if we didn't set at least one of the possible options, reject immediately
    if (!req.body.hasOwnProperty('name') && !req.body.hasOwnProperty('device') && !req.body.hasOwnProperty('profileURL')) {
      return res.sendStatus(500);
    }

    //now we populate our options based on what we received in the req.body
    const options = { $set: {} };

    if (req.body.hasOwnProperty('name')) {
      options.$set['name'] = req.body.name;
    }

    if (req.body.hasOwnProperty('device')) {
      options.$set['device'] = req.body.device;
    }

    if(req.body.hasOwnProperty('profileURL')) {
      options.$set['profileURL'] = req.body.profileURL;
    }
    
    //finally, try to perform the update
    User.updateOne({ _id: req.params.userId }, options)
      .then(result => res.json(result))
      .catch(err => res.json(err));
  }

};
