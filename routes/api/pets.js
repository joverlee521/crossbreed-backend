var router = require("express").Router();
var petsController = require("../../controllers/petController");

//ADD YOUR ROUTES HERE
//EX:
router.post("/", petsController.create);
router.get("/", petsController.findAll);
router.delete("/", petsController.delete);
router.get("/:id", petsController.findOne);

module.exports = router;
