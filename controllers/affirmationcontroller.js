const router = require('express').Router();
const {AffirmationModel} = require('../models');

router.get('/test', (req, res) => {
    res.send('Test successful')
});

module.exports = router;