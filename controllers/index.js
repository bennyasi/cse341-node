const router = require('express').Router();
const baseController = require('../controllers/index');

// Home route
router.get('/', baseController.home);

// Resource routes
router.use('/books', require('./books'));
router.use('/teams', require('./teams'));
router.use('/swagger', require('./swagger'));

module.exports = router;