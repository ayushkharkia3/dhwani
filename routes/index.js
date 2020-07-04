const express = require('express');

const router = express.Router();

const userRoutes = require('./user/users.routes');
const stateRoutes = require('./state/state.routes');
const districtRoutes = require('./district/district.routes');
const childRoutes = require('./child/child.routes');
const isAuth = require('../middleware/is-auth');

router.use('/', userRoutes);

router.use('/state', isAuth, stateRoutes);

router.use('/district', isAuth, districtRoutes);

router.use('/child', isAuth, childRoutes);

router.use((req, res, next) => {
    res.status(404).json({ message: 'Page Not Found' });
    next();
});


module.exports = router;