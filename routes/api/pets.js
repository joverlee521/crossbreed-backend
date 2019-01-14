var router = require("express").Router();
var petsController = require("../../controllers/petController");

//ADD YOUR ROUTES HERE
//EX:
router.get("/", petsController.findAll);
router.get("/:id", petsController.findOne);

 
module.exports = router;
