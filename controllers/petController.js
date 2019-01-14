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
  delete: function (req, res) {
    //TO-DO
  },
  // Update the specified headline
  update: function (req, res) {
    //TO-DO
  }
};
