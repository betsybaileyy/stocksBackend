const express = require('express');
const stockRoutes = require('./server/stocks/stocks.route');
const investRoutes = require('./server/investments/investments.route');
const authRoutes = require('./server/auth/auth.route');

const router = express.Router(); // eslint-disable-line new-cap

// #TODO: Change to your model.
router.use('/stocks', stockRoutes);

router.use('/invest', investRoutes);

router.use('/auth', authRoutes);

module.exports = router;
