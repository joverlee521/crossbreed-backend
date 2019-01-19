const db = require("../models");
const getStarterPet = require("../scripts/starterPets");
const Pet = require("../scripts/petClass");
const asyncMiddleware = require("../routes/middleware/async");
const calcLevelAndXP = require("../scripts/levelSystem");


//Main controllers
module.exports = {
  //CREATE METHODS
  //There are two valid ways to create a pet:
  //1) from breeding two parents
  //2) creating a 'starter' when a new user is first created
  createPetFromBreeding: async function (req, res) {
    //EXPECTS an object with two keys, firstParent and secondParent
    //Values should be obj ids for the parents
    //If both parents can breed, do so, update their 'lastBred' timestamp, then save the new child to the db
 
    if(!req.body.hasOwnProperty('firstParent') && !req.body.hasOwnProperty('secondParent')) {
      return res.sendStatus(400);
    }

    //Cannot breed the same pet to itself
    if(req.body.firstParent === req.body.secondParent) {
      return res.sendStatus(400);
    }

    //Cannot breed parents to pets that belong to different users

    let firstParent = await db.Pet.findOne({_id: req.body.firstParent, user: req.params.userId}, ['_id', 'dna']);
    let secondParent = await db.Pet.findOne({_id: req.body.secondParent, user: req.params.userId}, ['_id', 'dna']);
  
    //Make sure we actually got valid parents
    if(!firstParent || !secondParent) {
      return res.sendStatus(404);
    }

    //Finally!  We can create a baby :)
    const newChild = new Pet(firstParent, secondParent);

    //now we save the child to the db under this user's name 
    newChild['user'] = req.params.userId;
    //save it to the db 
    Promise.all([
      db.Pet.updateOne({_id: req.body.firstParent, user: req.params.userId}, {$set: {lastBred: Date.now()}}),
      db.Pet.updateOne({_id: req.body.secondParent, user: req.params.userId}, {$set: {lastBred: Date.now()}}),
       db.Pet.create(newChild)])
    .then(results => res.json(results));

    //and update the parents to show they have recently bred
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
   //TEST ROUTE: exposes all pets in the db
   findAll: function (req, res) {
    db.Pet.find({}, { dna: 0 })   //return everything except the dna
      .then(results => res.json(results))
      .catch(err => res.json(err));
  },
  //TEST ROUTE:
  //Find one pet (regardless of the user who owns it)
  findOne: function (req, res) {
    db.Pet.findOne({ _id: req.params.petId }, { dna: 0 }) //return everything except the dna
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
    db.Pet.findOneAndUpdate({ _id: req.params.petId, user: req.params.userId }, options, { new: true, fields: {dna: 0} })
      .then(result => res.json(result))
      .catch(err => res.json(err));
  }
};