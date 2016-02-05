var express = require('express');
var isPjax = require('../../lib/isPjax');

var router = express.Router();

/* BEGIN GET REQUESTS HANDLERS FOR LOGIN */
router.get('/', function (req, res) {
    res.render('home', { isPjax: isPjax(req) });
});
/* END GET REQUESTS HANDLERS FOR LOGIN */

module.exports = router;