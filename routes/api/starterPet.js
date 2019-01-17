const router = require("express").Router();
const petsController = require("../../controllers/petController");

//Route to create a brand new starter pet for a user id
router.post("/", petsController.createStarterPet);

module.exports = router;

