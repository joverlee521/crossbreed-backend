const express = require('express')
const router = express.Router()
const petsController = require("../../controllers/petController");

//ADD YOUR ROUTES HERE
//EX:
router.get("/", petsController.findAll);
router.get("/:id", petsController.findOne);

 
module.exports = router;
