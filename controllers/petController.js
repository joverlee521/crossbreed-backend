// Controller
// ============================
const db = require("../models");
const getStarterPet = require("../scripts/starterPets");

module.exports = {
  //Create
  create: function (req, res) {
    //TO-DO
    //Note: there are two valid ways to create a pet:
    //1) from passing in two parents (in which case we look up their dna and breed them)
    //2) passing in a request to create a 'starter' (in which case we use 'getStarterPet')
    //RIGHT NOW: only creating name
    db.Pet.create(req.body)
      .then(result => res.json(result))
      .catch(err => res.json({ error: err.message }));

  },
  //Find (one)
  findOne: function (req, res) {
    //TO-DO
    //TEST CODE FOR NOW
    res.json({ success: true, queryWas: "findOne", id: req.params.id });
  },
  //Find all pets (for a particular user)
  findAll: function (req, res) {
    //TO-DO
    //TEST CODE FOR NOW
    res.json({ success: true, queryWas: "findAll" });
  },
  // Delete one
  //(TO-DO): check that the user has the permission to delete the pet
  delete: function (req, res) {
    db.Pet.deleteOne({_id: req.body._id})
      .then(result => res.json(result))
      .catch(err => res.sendStatus(500));
  },
  // Update the specified headline
  update: function (req, res) {

  }
};
