const router = require('express').Router();
const postRoutes = require('./userRoutes');
const commentRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
