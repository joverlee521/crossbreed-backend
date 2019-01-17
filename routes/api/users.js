const express = require('express');
const router = express.Router();
const userController = require("../../controllers/userController");
const asyncMiddleware = require('../middleware/async');

//RESTFUL routes for all users
router.post('/', userController.create);
//TEST section -- right now I don't think we have need for a 'find all users' route, but it makes for a good test :)
router.get('/', asyncMiddleware(userController.findAll));

//RESTFUL routes for a single user
router.get('/:id', userController.findOne);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;
