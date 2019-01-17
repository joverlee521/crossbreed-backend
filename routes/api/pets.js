const express = require('express');
const router = express.Router();
const petsController = require("../../controllers/petController");

//RESTful routes for ONE pet (publicly viewable)
router.get("/:petId", petsController.findOne);

module.exports = router;
