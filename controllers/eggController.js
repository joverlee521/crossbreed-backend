//(TO-DO) REFACTOR THE PET CONTROLLER TO HANDLE AUTH
//USER MUST BE AUTHENTICATED IN ORDER TO CREATE EGGS, UPDATE EGGS, DELETE EGGS
//(but anyone can get EGGS)

const db = require("../db/models");
const Egg = require("../scripts/createEggs");

module.exports = {
  //Create an egg (from two parents)
  createPetFromEgg: async function (req, res) {
    //EXPECTS an object with two keys, firstParent and secondParent
    //Values should be obj ids for the parents
    //If both parents can breed, do so, update their 'lastBred' timestamp, then save the new child to the db

    if (!req.body.hasOwnProperty('firstParent') && !req.body.hasOwnProperty('secondParent')) {
      return res.sendStatus(400);
    }

    //Cannot breed the same pet to itself
    if (req.body.firstParent === req.body.secondParent) {
      return res.sendStatus(400);
    }

    //Cannot breed parents to pets that belong to different users
    //(TO-DO) Add the logic that prevents an egg from being created if the parents were last bred too recently
    let firstParent = await db.Pet.findOne({ _id: req.body.firstParent, user: req.params.userId }, ['_id', 'dna']);
    let secondParent = await db.Pet.findOne({ _id: req.body.secondParent, user: req.params.userId }, ['_id', 'dna']);

    //Make sure we actually got valid parents
    if (!firstParent || !secondParent) {
      return res.sendStatus(404);
    }

    //Finally!  We can create an egg :)
    const newEgg = Egg.createFromParents(firstParent, secondParent);

    //now we save the child to the db under this user's name 
    //and update the parents to show they have recently bred
    newEgg['user'] = req.params.userId;
    
    Promise.all([
      db.Pet.updateOne({ _id: req.body.firstParent, user: req.params.userId }, { $set: { lastBred: Date.now() } }),
      db.Pet.updateOne({ _id: req.body.secondParent, user: req.params.userId }, { $set: { lastBred: Date.now() } }),
      db.Egg.create(newEgg)])
      .then(results => res.json(results));
  },
  //TEST ROUTE: exposes all eggs in the db
  findAll: function (req, res) {
    db.Egg.find({}, { dna: 0 })   //return everything except the dna
      .then(results => res.json(results))
      .catch(err => res.json(err));
  },
  //TEST ROUTE:
  //Find one egg (regardless of the user who owns it)
  findOne: function (req, res) {
    db.Egg.findOne({ _id: req.params.eggId }, { dna: 0 }) //return everything except the dna
      .then(result => res.json(result))
      .catch(err => res.json(err));
  },
  findAllEggsByUser: function (req, res) {
    db.Egg.find({ user: req.params.userId }, { dna: 0 })
      .then(results => res.json(results))
      .catch(err => res.json(err));
  },
  //Find one egg by user: 
  findOneByUser: function (req, res) {
    db.Egg.findOne({ _id: req.params.eggId, user: req.params.userId }, { dna: 0 }) //return everything except the dna
      .then(result => res.json(result))
      .catch(err => res.json(err));
  },
  // Delete one
  delete: function (req, res) {
    db.Egg.deleteOne({ _id: req.params.eggId, user: req.params.userId })
      .then(result => res.json(result))
      .catch(err => res.json(err));
  },
  // Update the specified egg (belonging to a user)
  update: function (req, res) {
    //NOTE: at this time the only things we can change are the isFrozen and countdown timers
    if (!req.body.hasOwnProperty('isFrozen')) {
      return res.sendStatus(400);
    }
    //TO-DO: add a check to make sure the user has stable space to be hatching this egg!

    //Customize our options based on what we let the user set
    const options = { $set: {} };

    if (req.body.hasOwnProperty('isFrozen')) {
      options.$set["isFrozen"] = req.body.isFrozen;
    }

    // Update pet and return the new egg
    db.Egg.findOneAndUpdate({ _id: req.params.eggId, user: req.params.userId }, options, { new: true, fields: { dna: 0 } })
      .then(result => res.json(result))
      .catch(err => res.json(err));
  }
};
