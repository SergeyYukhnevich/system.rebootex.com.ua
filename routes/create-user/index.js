var express = require('express');
var User = require('../../models/user').User;

var router = express.Router();

/* BEGIN GET REQUESTS HANDLERS FOR LOGIN */
router.get('/', function (req, res) {
    res.render('create-user', { isPjax: require('../../lib/isPjax')(req) });
});
/* END GET REQUESTS HANDLERS FOR LOGIN */

/* BEGIN POST REQUESTS HANDLERS FOR LOGIN */
router.post('/', function (req, res, next) {

    var user = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        city: req.body.city,
        address: req.body.address,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });

    user.save(function (err, user, affected) {

        if (err) {
            res.send(['ERROR', err]);
        } else {
            res.send(['OK', user, affected]);
        }

    });

});
/* END POST REQUESTS HANDLERS FOR LOGIN */
module.exports = router;