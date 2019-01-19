const express = require('express');
const router = express.Router();
const eggsController = require("../../controllers/eggController");

//ADD YOUR ROUTES HERE
//EX:
//Test Routes
router.get("/", eggsController.findAll);
router.get("/:eggId", eggsController.findOne);
 
module.exports = router;