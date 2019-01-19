const express = require('express');
const router = express.Router();
const userController = require("../../controllers/userController");
const asyncMiddleware = require('../middleware/async');
const petsController = require("../../controllers/petController");

//RESTFUL routes for all users
router.post('/', userController.create);
router.get('/', userController.findUserByEmail);

//RESTFUL routes for a single user
router.get('/:userId', userController.findOne);
router.put('/:userId', userController.update);
router.delete('/:userId', userController.delete);

//Special Route: creating a starter pet for a user
//Creating a starter pet
router.post("/:userId/starter", petsController.createStarterPet);

//RESTFUL routes for a user's pets
//Show all the pets that belong to a particular user
router.get('/:userId/pets', petsController.findAllPetsByUser);
//Create a new pet (by breeding)
router.post('/:userId/pets', asyncMiddleware(petsController.createPetFromBreeding));

//RESTFUL routes for a single pet for the user
router.get('/:userId/pets/:petId', petsController.findOneByUser);
router.put('/:userId/pets/:petId', petsController.update); 
router.delete('/:userId/pets/:petId', petsController.delete); 

module.exports = router;
