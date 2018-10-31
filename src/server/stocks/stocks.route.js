const express = require('express');
const controller = require('./stocks.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/');

router.get('/test', (req, res) => {
  controller
    .getStockRate('fb', '2017-09-13', '2018-09-14')
    .then((resp) => {
      res.json({
        resp
      });
    })
    .catch((error) => {
      res.json({
        error
      });
    });
});

// #TODO: Implement thing.route.js.

module.exports = router;
