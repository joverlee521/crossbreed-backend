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
    //TO-Do
    res.json({user: true, id: req.params.id});
  },
  // Delete one
  delete: function(req, res) {
    //TO-DO
  },
  // Update the specified headline
  update: function(req, res) {
   //TO-DO
  }
};
