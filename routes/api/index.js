var router = require("express").Router();
var petsRoutes = require("./pets");
var eggsRoutes = require("./eggs");
var usersRoutes = require("./users");
var starterPetRoute = require("./starterPet");

router.use("/users", usersRoutes);
router.use("/pets", petsRoutes);
router.use("/eggs", eggsRoutes);
router.use("/starter", starterPetRoute);

module.exports = router;
