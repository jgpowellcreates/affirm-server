const router = require('express').Router();
const {UserCollectionModel} = require('../models');

router.get('/test', (req, res) => {
    res.send('Test successful')
});

module.exports = router;