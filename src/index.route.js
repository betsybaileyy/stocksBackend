const express = require('express');
const wtfRoutes = require('./server/wtf/wtf.route');
const authRoutes = require('./server/auth/auth.route');

const router = express.Router(); // eslint-disable-line new-cap

// #TODO: Change to your model.
router.use('/wtf', wtfRoutes);

router.use('/auth', authRoutes);

module.exports = router;
