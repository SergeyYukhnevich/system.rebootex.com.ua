var User = require('./user');
var mongoose = require('../bin/mongoose');

var schema = function () {
    User.call(this);
};

exports.Customer = mongoose.model('Customer', schema);