const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/');

router.get('/get', (req, res) => {
  res.json({
    bro: 'you did it'
  });
});

// #TODO: Implement thing.route.js.

module.exports = router;
