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

  //REQUIRES that we pass in the id of the user whom the pet will belong to in the body of the request
  createStarterPet: function (req, res) {
    //grab a random starter pet from the templates and deconstruct the bits we need
    const dataToSave = getStarterPet().toObj();
    dataToSave['user'] = req.params.userId;
    //save it to the db 
    db.Pet.create(dataToSave)
      .then(result => {
        //NOTE: since we don't serve the dna to the front end, we'll delete that from the result object
        result.dna = "";
        res.json(result)
      })
      .catch(err => res.json(err));
  },
  //Find (one)
  //Find
  //(TO-DO) ensure that the user _id of the logged-in user also matches
  findOne: function (req, res) {
    const petId = req.params.petId;
    db.Pet.findOne({ _id: petId, user: req.params.userId }, { dna: 0 }) //return everything except the dna
      .then(result => res.json(result))
      .catch(err => res.json(err));
  },
  //Looks up a particular pet and ensures it also belongs to that user
  findOneByUser: function (req, res) {
    const petId = req.params.id;

    db.Pet.findOne({ _id: petId }, { dna: 0 }) //return everything except the dna
      .then(result => res.json(result))
      .catch(err => res.json(err));
  },

  //TEST ROUTE: exposes all pets in the db
  findAll: function (req, res) {
    db.Pet.find({}, { dna: 0 })   //return everything except the dna
      .then(results => res.json(results))
      .catch(err => res.json(err));
  },

  //Find all pets (for a particular user)
  //NOTE: the DNA field is NEVER returned to the front end
  //(TO-DO) limit the pets returned to only the ones that belong to a particular user!
  findAllPetsForUser: function (req, res) {
    db.Pet.find({ user: req.params.userId }, { dna: 0 })
      .then(results => res.json(results))
      .catch(err => res.json(err));
  },
  // Delete one
  delete: function (req, res) {
    db.Pet.deleteOne({ _id: req.params.petId, userid: req.params.userId })
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
    db.Pet.updateOne({ _id: req.params.petId }, options)
      .then(result => res.json(result))
      .catch(err => res.json(err));
  }
};