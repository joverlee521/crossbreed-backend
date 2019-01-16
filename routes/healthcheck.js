const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'this is a test message',
  });
});

module.exports = router;
