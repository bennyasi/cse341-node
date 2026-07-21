const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/books', require('./books'));
router.use('/teams', require('./teams'));
router.use('/authors', require('./authors'));

router.get('/', (req, res) => {
    res.send('Welcome to the Library API');
});

module.exports = router;