const db = require("../db/models");
const getStarterPet = require("../scripts/starterPets");
const Pet = require("../scripts/hatchEggs");
const calcLevelAndXP = require("../scripts/levelSystem");

module.exports = {
  //UNPROTECTED METHODS (GET)
  //Find all pets (for a particular user)
  findAllPetsByUser: function (req, res) {
    db.Pet.find({ user: req.params.userId }, { dna: 0 })
      .then(results => res.json(results))
      .catch(err => res.sendStatus(500));
  },

  //Find one pet (that belongs to a user)
  //Looks up a particular pet 
  findOneByUser: function (req, res) {
    db.Pet.findOne({ _id: req.params.petId, user: req.params.userId }, { dna: 0 }) //return everything except the dna
      .then(result => res.json(result))
      .catch(err => res.sendStatus(500));
  },

  //PROTECTED METHODS
  //CREATE METHODS
  //Note: there are two valid ways to create a pet:
  //1) from hatching an egg
  //2) creating an adult 'starter' pet when a new user is first created
  createPetFromEgg: async function (req, res) {
    if(!req.session.passport ) { //if there is no session info, user is not logged in!  reject their request
      return res.sendStatus(403);
    }
    const loggedInUser = req.session.passport.user._id; //grab the user's id from the session cookie

    //sanity check if the id doesn't match the route, also reject with forbidden
    if (loggedInUser !== req.params.userId) {
      return res.sendStatus(403);
    }

    //Expects the _id of an egg to hatch from the body of the request
    if (!req.body._id) {
      return res.json(400);
    }

    //First, look up the egg 
    //(TO-DO) Validate that it has incubated long enough to hatch
    const eggData = await db.Egg.findOne({ _id: req.body._id, user: loggedInUser, isFrozen: false });
    if (!eggData) {
      return res.sendStatus(404);
    }

    //create a new pet from the egg (and set it to belong to the user)
    const newPet = new Pet(eggData);
    newPet['user'] = loggedInUser;

    //now, delete the egg...and save our hatched pet!
    const results = await Promise.all([db.Egg.findByIdAndDelete(eggData._id), db.Pet.create(newPet)]); 

    //return only the new pet (minus the dna) to the front end
    const hatchedPet = results[1];
    hatchedPet.dna = "";
    res.json(hatchedPet);
  },

  createStarterPet: function (req, res) {
    if(!req.session.passport ) { //if there is no session info, user is not logged in!  reject their request
      return res.sendStatus(403);
    }
    const loggedInUser = req.session.passport.user._id; //grab the user's id from the session cookie

    //sanity check if the id doesn't match the route, also reject with forbidden
    if (loggedInUser !== req.params.userId) {
      return res.sendStatus(403);
    }

    //grab a random starter pet from the template and add which user it belongs to
    const dataToSave = getStarterPet();
    dataToSave['user'] = loggedInUser;

    //save it to the db 
    db.Pet.create(dataToSave)
      .then(result => {
        //NOTE: since we don't serve the dna to the front end, we'll delete that from the result object
        result.dna = "";
        res.json(result);
      })
      .catch(err => res.status(500).json(err));
  },

  // Delete one pet (belonging to a particular user)
  delete: function (req, res) {
    if(!req.session.passport ) { //if there is no session info, user is not logged in!  reject their request
      return res.sendStatus(403);
    }
    const loggedInUser = req.session.passport.user._id; //grab the user's id from the session cookie

    //sanity check if the id doesn't match the route, also reject with forbidden
    if (loggedInUser !== req.params.userId) {
      return res.sendStatus(403);
    }

    db.Pet.deleteOne({ _id: req.params.petId, user: loggedInUser })
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err));
  },

  // Update the specified pet (belonging to a particular user)
  // Valid attributes to update at present are isFavorite, pet name, and level/xp/gainedxp
  update: function (req, res) {
    if(!req.session.passport ) { //if there is no session info, user is not logged in!  reject their request
      return res.sendStatus(403);
    }
    const loggedInUser = req.session.passport.user._id; //grab the user's id from the session cookie

    //sanity check if the id doesn't match the route, also reject with forbidden
    if (loggedInUser !== req.params.userId) {
      return res.sendStatus(403);
    }

    //Check what we passed in -- if we didn't set at least one of the possible options, reject as malformed
    if (!req.body.isFavorite && !req.body.name && !req.body.currentLevel && !req.body.currentXP && !req.body.gainedXP) {
      return res.sendStatus(400);
    }

    //Now we populate our options based on what we received in the req.body
    const options = { $set: {} };

    // Check that we have all the necessary variables to calculate level and XP; if not, don't adjust those
    if (req.body.currentLevel && req.body.currentXP && req.body.gainedXP) {
      const currentLevel = parseInt(req.body.currentLevel);
      const currentXP = parseInt(req.body.currentXP);
      const gainedXP = parseInt(req.body.gainedXP);
      //if you send garbage in for the level data, reject as a malformed request
      if (isNaN(currentLevel) || isNaN(currentXP) || isNaN(gainedXP)) {
        return res.sendStatus(400);
      }
      //otherwise calculate the level
      // Pass variables through calculation function and return results as update arg
      const { newLevel, newXP } = calcLevelAndXP(currentLevel, currentXP, gainedXP);
      options.$set["level"] = newLevel;
      options.$set["experiencePoints"] = newXP;
    }

    if (req.body.isFavorite) {
      options.$set["isFavorite"] = req.body.isFavorite;
    }

    if (req.body.name) {
      options.$set["name"] = req.body.name;
    }

    // Update pet and return the new pet stats (if anything did update successfully)
    db.Pet.findOneAndUpdate({ _id: req.params.petId, user: loggedInUser }, options, { new: true, fields: { dna: 0 } })
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err));
  }
};