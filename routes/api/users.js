const express = require('express');
const router = express.Router();
const userController = require("../../controllers/userController");
const asyncMiddleware = require('../middleware/async');
const petsController = require("../../controllers/petController");

//RESTFUL routes for all users
router.post('/', userController.create);
//TEST section -- right now I don't think we have need for a 'find all users' route, but it makes for a good test :)
router.get('/', userController.findAll);

//RESTFUL routes for a single user
router.get('/:userId', userController.findOne);
router.put('/:userId', userController.update);
router.delete('/:userId', userController.delete);

//Special Route: creating a starter pet for a user
//Creating a starter pet
router.post("/:userId/starter", petsController.createStarterPet);

//RESTFUL routes for a user's pets
//Show all the pets that belong to a particular user
router.get('/:userId/pets', petsController.findAllPetsForUser);

//RESTFUL routes for a single pet for the user
router.get('/:userId/pets/:petId', petsController.findOne);
router.put('/:userId/pets/:petId', petsController.update); //can only be done by the owner
router.delete('/:userId/pets/:petId', petsController.delete); //can only be done by the owner

module.exports = router;
