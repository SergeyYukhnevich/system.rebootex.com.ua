var express = require('express');
var User = require('../../models/user').User;
var isPjax = require('../../lib/isPjax');
var HttpError = require('../../bin/errorHandler').HttpError;

var router = express.Router();

/* BEGIN GET REQUESTS HANDLERS FOR LOGIN */
router.get('/', function (req, res) {
    res.render('login/login', { isPjax: isPjax(req) });
});
router.get('/forget-password', function (req, res) {
    res.render('login/forget-password', { isPjax: isPjax(req) })
});
/* END GET REQUESTS HANDLERS FOR LOGIN */

/* BEGIN POST REQUESTS HANDLERS FOR LOGIN */
router.post('/', function (req, res, next) {

    User.authorize({
        username: req.body.username,
        password: req.body.password,
        remember: req.body.remember
    }, function (err, user) {

        if (err) {
            if (err.type === 'authErr') {
                err.status = 403;
                res.sendHttpError(err);
            } else {
                next(err);
            }
        } else {
            req.session.user = user._id;
            res.status(200).json(user);
        }

    });

});
router.post('/forget-password', function (req, res) {
    console.log(req.body);
    res.send(req.body);
});
/* END POST REQUESTS HANDLERS FOR LOGIN */
module.exports = router;