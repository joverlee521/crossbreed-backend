const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middleware/async');
const userController = require("../../controllers/userController");
const petsController = require("../../controllers/petController");
const eggsController = require("../../controllers/eggController");

//UNPROTECTED ROUTES (GET)
router.get('/:userId', userController.findOne); //Find basic details + pets + eggs for a single user

router.get('/:userId/pets', petsController.findAllPetsByUser); //Show just the pets that belong to a particular user
router.get('/:userId/pets/:petId', petsController.findOneByUser); //Show a single pet for a user

router.get('/:userId/eggs', eggsController.findAllEggsByUser); //Show all the eggs for a user
router.get('/:userId/eggs/:eggId', eggsController.findOneByUser); //Get a single egg for a user

//PROTECTED ROUTES - User
router.put('/:userId', userController.update); //Update select user info (like their display name)
router.delete('/:userId', userController.delete); //Delete my user account (and all my pets/eggs)

//PROTECTED ROUTES - Eggs
router.post('/:userId/eggs', asyncMiddleware(eggsController.createEggFromTwoParents)); //Create a new egg (by breeding)
router.put('/:userId/eggs/:eggId', eggsController.update); //Update one egg
router.delete('/:userId/eggs/:eggId', eggsController.delete); //Delete one egg

//PROTECTED ROUTES - Pets
router.post('/:userId/pets', asyncMiddleware(petsController.createPetFromEgg)); //Create a new pet (by hatching an egg)
router.post("/:userId/starter", petsController.createStarterPet); //Create a new pet (from one of the stock starter eggs)
router.put('/:userId/pets/:petId', petsController.update);  //Update one pet
router.delete('/:userId/pets/:petId', petsController.delete); //Delete one pet

module.exports = router;
