const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middleware/async');
const userController = require("../../controllers/userController");
const petsController = require("../../controllers/petController");
const eggsController = require("../../controllers/eggController");

//PROTECTED ROUTES - Pets
//  Accessed via /api/pets/:petId
router.post('/', asyncMiddleware(petsController.createPetFromEgg)); //Create a new pet (by hatching an egg)

router.put('/:petId', petsController.update);  //Update one pet
router.delete('/:petId', petsController.delete); //Delete one pet

module.exports = router;