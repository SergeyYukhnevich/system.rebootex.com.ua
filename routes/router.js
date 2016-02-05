var express = require('express');

var router = express.Router();

router.use('/', require('./home'));
router.use('/login', require('./login'));
router.use('/create-user', require('./create-user'));

// Used for Letsencrypt ssl verification
router.get('/.well-known/acme-challenge/', function (req, res, next) {
    res.send('');
});

module.exports = router;