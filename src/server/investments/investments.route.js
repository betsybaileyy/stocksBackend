const express = require('express');

const auth = require('../auth/auth.controller');
const controller = require('./investments.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/');

router.post('/new', (req, res) => {
  const token = req.get('token');
  const body = req.body;
  auth.getUser(token).then((user) => {
    controller.newInvestment(user, body).then((investment) => {
      res.json({
        user,
        investment
      });
    }).catch((error) => {
      res.json({
        error
      });
    });
  }).catch((error) => {
    res.json({
      error
    });
  });
});

module.exports = router;
