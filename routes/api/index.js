
const express = require('express');
const router = express.Router();

const petsRoutes = require("./pets");
const eggsRoutes = require("./eggs");
const usersRoutes = require("./users");

//MAIN ROUTES
router.use("/users", usersRoutes);
router.use("/pets", petsRoutes);
router.use("/eggs", eggsRoutes);

module.exports = router;
