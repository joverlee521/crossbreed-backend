const express = require('express');
const router = express.Router();
const petsController = require("../../controllers/petController");

//RESTful routes for ONE pet (publicly viewable)
//TEST ROUTES - expose all the pets, agnostic of user
router.get("/", petsController.findAll);
router.get("/:petId", petsController.findOne);

module.exports = router;
