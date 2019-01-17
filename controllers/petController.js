// Controller
// ============================
const db = require("../models");
const getStarterPet = require("../scripts/starterPets");
const Pet = require("../scripts/petClass");

//Main controllers
module.exports = {
  //Create
    //Note: there are two valid ways to create a pet:
    //1) from passing in two parents (in which case we look up their dna and breed them)
    //2) creating a 'starter' when a new user is first created
    //for #2, we should use 'createStarterPet'
  createPetFromBreeding: function (req, res) {
    //EXPECTS an object with two keys, firstParent and secondParent
    //Values should be obj ids for the parents
    //(TO-DO) check that a valid user id was passed

    //(TO-DO) grab both parents and check that both are currently able to breed
    
    //If both parents can breed, do so, then save the child  
  },

  //(TO-DO) associate this pet with the user whom it belongs to
  createStarterPet: function(req, res) {
    //grab a random starter pet from the templates and deconstruct the bits we need
    const dataToSave = getStarterPet().toObj();
   
    //save it to the db 
    db.Pet.create(dataToSave)
    .then(result => {
      //NOTE: since we don't serve the dna to the front end, we'll delete that from the result object
      result.dna = "";
      res.json(result)})
    .catch(err => res.json(err)); 
  },
  //Find (one)
  //Find
  //(TO-DO) ensure that the user _id of the logged-in user also matches
  findOne: function (req, res) {
    const petId = (req.params.id || req.body.id);  //NOTE: we may not need this depending on how axios works
    db.Pet.findOne({ _id: petId }, { dna: 0 } ) //return everything except the dna
      .then(result => res.json(result))
      .catch(err => res.json(err));
  },
  //Find all pets (for a particular user)
  //NOTE: the DNA field is NEVER returned to the front end
  //(TO-DO) limit the pets returned to only the ones that belong to a particular user!
  findAll: function (req, res) {
    db.Pet.find({}, { dna: 0 })   //return everything except the dna
    .then(results => res.json(results))
      .catch(err => res.json(err));
  },
  // Delete one
  //(TO-DO): ensure that the user _id of the logged-in user also matches - you can only delete your own pets!
  delete: function (req, res) {
    db.Pet.deleteOne({ _id: req.body._id })
      .then(result => res.json(result))
      .catch(err => res.json(err));
  },

  // Update the specified pet - currently we ONLY allow users to update the pet's name and isFavorite on their own
  //(TO-DO) ensure that the user _id of the logged-in user also matches
  update: function (req, res) {
    //Check what we passed in -- if we didn't set at least one of the two possible options, reject immediately
    if (!req.body.hasOwnProperty('isFavorite') && !req.body.hasOwnProperty('name')) {
      return res.sendStatus(500);
    }

    //now we populate our options based on what we received in the req.body
    const options = { $set: {} };

    if (req.body.hasOwnProperty('isFavorite')) {
      options.$set["isFavorite"] = req.body.isFavorite;
    }

    if (req.body.hasOwnProperty('name')) {
      options.$set["name"] = req.body.name;
    }

    //finally, try to perform the update
    db.Pet.updateOne({ _id: req.params.id }, options)
      .then(result => res.json(result))
      .catch(err => res.json(err));
  }
};
