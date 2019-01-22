const db = require("../db/models");
const getStarterPet = require("../scripts/starterPets");
const Pet = require("../scripts/hatchEggs");
const calcLevelAndXP = require("../scripts/levelSystem");

//Main controllers
module.exports = {
  //CREATE METHODS
  //There are two valid ways to create a pet:
  //1) from hatching an egg
  //2) creating an adult 'starter' pet when a new user is first created
  createPetFromEgg: async function (req, res) {
    //Expects the _id of an egg to hatch from the body of the request
    if(!req.body.hasOwnProperty('_id')) {
      return res.json(400);
    } 
    //First, look up the egg 
    //(TO-DO) Validate that it has incubated long enough to hatch
    const eggData = await db.Egg.findOne({_id: req.body._id, user: req.params.userId, isFrozen: false});
    if(!eggData) {
      return res.sendStatus(404);
    }

    //otherwise, create a new pet from the egg
    const newPet = new Pet(eggData);

    //...and save the pet!
    newPet['user'] = req.params.userId;
    //save it to the db 
    db.Pet.create(newPet)
      .then(result => {
        //NOTE: since we don't serve the dna to the front end, we'll delete that from the result object
        result.dna = "";
        res.json(result)
      })
      .catch(err => res.json(err));
  },

  createStarterPet: function (req, res) {
    //grab a random starter pet from the templates and deconstruct the bits we need
    const dataToSave = getStarterPet();
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
  //TEST ROUTE: exposes all pets in the db
  findAll: function (req, res) {
    db.Pet.find({})   //return everything except the dna
      .then(results => res.json(results))
      .catch(err => res.json(err));
  },
  //TEST ROUTE:
  //Find one pet (regardless of the user who owns it)
  findOne: function (req, res) {
    db.Pet.findOne({ _id: req.params.petId }) //return everything except the dna
      .then(result => res.json(result))
      .catch(err => res.json(err));
  },
  //Find one pet (that belongs to a user)
  //Looks up a particular pet and ensures it also belongs to that user
  findOneByUser: function (req, res) {
    db.Pet.findOne({ _id: req.params.petId, user: req.params.userId }, { dna: 0 }) //return everything except the dna
      .then(result => res.json(result))
      .catch(err => res.json(err));
  },

  //Find all pets (for a particular user)
  findAllPetsByUser: function (req, res) {
    db.Pet.find({ user: req.params.userId }, { dna: 0 })
      .then(results => res.json(results))
      .catch(err => res.json(err));
  },

  // Delete one pet (belonging to a particular user)
  delete: function (req, res) {
    db.Pet.deleteOne({ _id: req.params.petId, user: req.params.userId })
      .then(result => res.json(result))
      .catch(err => res.json(err));
  },

  // Update the specified pet (belonging to a particular user)
  update: function (req, res) {
    //Check what we passed in -- if we didn't set at least one of the possible options, reject immediately
    //(TO-DO) refactor how we check for problems -- array of fields to check?
    //(TO-DO) what happens if we get one of the necessary items for Jover's leveling mechanic but not all three?  Etc
    if (!req.body.hasOwnProperty('isFavorite') && !req.body.hasOwnProperty('name') && !req.body.hasOwnProperty('currentLevel') && !req.body.hasOwnProperty('currentXP') && !req.body.hasOwnProperty('gainedXP')) {
      return res.sendStatus(500);
    }

    //Now we populate our options based on what we received in the req.body
    const options = { $set: {} };

    // Check that we have all the necessary variables to calculate level and XP; if not, don't adjust those
    if (req.body.hasOwnProperty('currentLevel') && req.body.hasOwnProperty('currentXP') && req.body.hasOwnProperty('gainedXP')) {
      // Pass variables through calculation function and return results as update arg
      const currentLevel = parseInt(req.body.currentLevel);
      const currentXP = parseInt(req.body.currentXP);
      const gainedXP = parseInt(req.body.gainedXP);
      const { newLevel, newXP } = calcLevelAndXP(currentLevel, currentXP, gainedXP);
      options.$set["level"] = newLevel;
      options.$set["experiencePoints"] = newXP;
    }

    if (req.body.hasOwnProperty('isFavorite')) {
      options.$set["isFavorite"] = req.body.isFavorite;
    }

    if (req.body.hasOwnProperty('name')) {
      options.$set["name"] = req.body.name;
    }

    // Update pet and return the new pet stats
    db.Pet.findOneAndUpdate({ _id: req.params.petId, user: req.params.userId }, options, { new: true, fields: { dna: 0 } })
      .then(result => res.json(result))
      .catch(err => res.json(err));
  }
};