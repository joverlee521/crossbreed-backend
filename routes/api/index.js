var router = require("express").Router();
var petsRoutes = require("./pets");
var eggsRoutes = require("./eggs");
var usersRoutes = require("./users");

router.use("/users", usersRoutes);
router.use("/pets", petsRoutes);
router.use("/eggs", eggsRoutes);

module.exports = router;
