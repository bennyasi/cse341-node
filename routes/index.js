const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/contacts', require('./contacts'));

router.get('/', (req, res) => {
    res.send('Welcome to the Contacts API');
});

module.exports = router;