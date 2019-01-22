const express = require('express');
const router = express.Router();
const userController = require("../../controllers/userController");
const asyncMiddleware = require('../middleware/async');
const petsController = require("../../controllers/petController");
const eggsController = require("../../controllers/eggController");

//RESTFUL routes for all users -- /api/users
//RESTFUL routes for a single user -- /api/user/:userId
//NOTE: the 'create' route is handled by /auth/signup at this time
router.get('/:userId', userController.findOne);

//PROTECTED ROUTES
router.post("/:userId/starter", petsController.createStarterPet); //note: this is a special route for starter pets
router.put('/:userId', userController.update);
router.delete('/:userId', userController.delete);

//RESTFUL routes for a user's pets -- /api/user/:userId/pets
//Show all the pets that belong to a particular user
router.get('/:userId/pets', petsController.findAllPetsByUser);

//PROTECTED ROUTES
//Create a new pet (by hatching an egg)
router.post('/:userId/pets', asyncMiddleware(petsController.createPetFromEgg));

//RESTFUL routes for a single pet for the user -- api/user/:userId/pets/:petId
router.get('/:userId/pets/:petId', petsController.findOneByUser);

//PROTECTED ROUTES
router.put('/:userId/pets/:petId', petsController.update); 
router.delete('/:userId/pets/:petId', petsController.delete); 

//RESTFUL routes for a user's eggs -- /api/user/:userId/eggs
router.get('/:userId/eggs', eggsController.findAllEggsByUser);

//PROTECTED ROUTES
router.post('/:userId/eggs', asyncMiddleware(eggsController.createPetFromEgg)); //Create a new egg (by breeding)

//RESTFUL routes for a single egg for the user -- /api/user/:userId/eggs/:eggId
router.get('/:userId/eggs/:eggId', eggsController.findOneByUser);

//PROTETED ROUTES
router.put('/:userId/eggs/:eggId', eggsController.update); 
router.delete('/:userId/eggs/:eggId', eggsController.delete); 

module.exports = router;
