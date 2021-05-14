const router = require('express').Router();
const {RoleModel} = require('../models');

router.get('/test', (req, res) => {
    res.send('Test successful')
});

module.exports = router;