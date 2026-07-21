const router = require('express').Router();

router.use('/books', require('./books'));

router.get('/', (req, res) => {
    res.send('Welcome to the Library API');
});

module.exports = router;