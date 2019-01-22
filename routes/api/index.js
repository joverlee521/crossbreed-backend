
const express = require('express');
const router = express.Router();

const usersRoutes = require("./users");

//MAIN ROUTES
router.use("/users", usersRoutes);

module.exports = router;
