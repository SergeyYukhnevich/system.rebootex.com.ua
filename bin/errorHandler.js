var http = require('http');
var path = require('path');
var util = require('util');

// the errors send to a user

function HttpError(status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}

util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';

exports.HttpError = HttpError;

exports.sendHttpError = function(req, res, next) {

    res.sendHttpError = function(err) {
        res.status(err.status);
        if (req.headers['x-requested-with'] == 'XMLHttpRequest') {
            res.json(err);
        } else {
            res.render('error', { data: err });
        }
    };

    next();

};

exports.sendValidationError = function (req, res, next) {

    res.sendValidationError = function(data) {
        res.send({
            type: 'error',
            data: data
        })
    };

    next();

};