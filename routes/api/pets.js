const express = require('express');
const router = express.Router();
const petsController = require("../../controllers/petController");

//ADD YOUR ROUTES HERE
//EX:
//RESTful routes for /api/pets
//We can create a new pet (by breeding) OR get all pets a user currently has
router.get("/", petsController.findAll);
router.post("/", petsController.createPetFromBreeding);  

//RESTful routes for ONE pet
router.get("/:id", petsController.findOne);
router.put("/:id", petsController.update);
router.put("/level/:id", petsController.updateLevel);
router.delete("/:id", petsController.delete);

module.exports = router;
