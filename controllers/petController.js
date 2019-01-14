// Controller
// ============================
const db = require("../models");
const getStarterPet = require("../scripts/starterPets");

module.exports = {
  //Create
  create: function (req, res) {
    //TO-DO
  },
  //TEST
  getStarter: function(req, res) {
    const randomStarterPet = getStarterPet();
    res.json(randomStarterPet);
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
