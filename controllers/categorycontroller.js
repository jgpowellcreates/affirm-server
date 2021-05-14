const router = require('express').Router();

router.get('/test', (req, res) => {
    res.send('Test successful')
});

module.exports = router;