
const express = require('express');
const router = express.Router();

/* const petsRoutes = require("./pets");
const eggsRoutes = require("./eggs"); */
const usersRoutes = require("./users");

//MAIN ROUTES
router.use("/users", usersRoutes);

//NOTE: the below are routes I use for testing as a quick way to view data
//You can uncomment them if you want to use during testing
/* router.use("/pets", petsRoutes); 
router.use("/eggs", eggsRoutes); */

module.exports = router;
