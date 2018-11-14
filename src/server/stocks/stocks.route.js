const express = require('express');
const controller = require('./stocks.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/');

router.get('/symbols', (req, res) => {
  controller
    .getSymbols()
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

router.get('/:symbol/:from/:to', (req, res) => {
  const symbol = req.params.symbol;
  const from = req.params.from;
  const to = req.params.to;
  controller
    .getStockRate(symbol, from, to)
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

router.get('/:symbol', (req, res) => {
  const symbol = req.params.symbol;
  controller
    .getStockData(symbol)
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
