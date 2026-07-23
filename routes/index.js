const router = require('express').Router();
const baseController = require('../controllers/index');

router.get('/', baseController.home);
router.use('/books', require('./books'));
router.use('/teams', require('./teams'));
router.use('/api-docs', require('./swagger')); // if you have a swagger route file

module.exports = router;