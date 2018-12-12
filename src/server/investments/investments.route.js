const express = require('express');

const auth = require('../auth/auth.controller');
const stocks = require('../stocks/stocks.controller');
const controller = require('./investments.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/');

router.post('/new', (req, res) => {
  const token = req.get('token');
  const body = req.body;

  if (body.invDate === '0') {
    body.invDate = Date.now();
  }

  auth
    .getUser(token)
    .then((user) => {
      controller
        .newInvestment(user, body)
        .then((investment) => {
          res.json({
            user,
            investment
          });
        })
        .catch((error) => {
          res.json({
            error
          });
        });
    })
    .catch((error) => {
      res.json({
        error
      });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  controller
    .getInvestment(id)
    .then((investment) => {
      stocks
        .getStockRate(investment.symbol, investment.invDate)
        .then((rate) => {
          res.json({
            investment,
            rate
          });
        })
        .catch((stockError) => {
          res.json({
            error: stockError
          });
        });
    })
    .catch((error) => {
      res.json({
        error
      });
    });
});

module.exports = router;
