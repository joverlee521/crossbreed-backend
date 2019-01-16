const express = require('express')
const router = express.Router()

const petsRoutes = require("./pets");
const eggsRoutes = require("./eggs");
const usersRoutes = require("./users");
const starterPetRoute = require("./starterPet");


router.use("/users", usersRoutes);
router.use("/pets", petsRoutes);
router.use("/eggs", eggsRoutes);
router.use("/starter", starterPetRoute);


module.exports = router;
