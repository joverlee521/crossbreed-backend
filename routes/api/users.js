const express = require('express');
const router = express.Router();
const userController = require("../../controllers/userController");
const petsController = require("../../controllers/petController");

//UNPROTECTED ROUTES (GET)-- /api/users/:userId
router.get('/:userId', userController.findOne); //Find basic details + pets + eggs for a single user

//PROTECTED ROUTES - User
router.put('/:userId', userController.update); //Update select user info (like their display name)
router.delete('/:userId', userController.delete); //Delete my user account (and all my pets/eggs)


//SPECIAL ROUTE FOR A STARTER PET
router.post("/:userId/starterPet", petsController.createStarterPet); //Create a new pet (from one of the stock starter eggs)

module.exports = router;
