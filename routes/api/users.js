const express = require('express')
const router = express.Router()
const { User } = require('../../models/User');
const asyncMiddleware = require('../middleware/async');

router.get('/', asyncMiddleware(async (_, res) => {
  const users = await User.find();
  res.send({
    success: true,
    users,
  });
}));

module.exports = router;
