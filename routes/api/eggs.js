const express = require('express');
const router = express.Router();
const eggsController = require("../../controllers/eggController");

//ADD YOUR ROUTES HERE
//EX:
router.post("/", eggsController.create);
 
module.exports = router;