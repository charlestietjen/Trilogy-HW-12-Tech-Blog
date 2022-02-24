const router = require('express').Router();
const home = require('./home');
const dashboardRoute = require('./dashboard');

router.use('/', home);
router.use('/dashboard', dashboardRoute);

module.exports = router;