var crypto = require('crypto');
var mongoose = require('../bin/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    remember: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: true,
        enum: ['super admin', 'admin', 'employee', 'customer']
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function (data, callback) {

    var User = this;

    User.findOne({ username: data.username }, function (err, user) {

        if (err) return callback(err);

        err = {
            type: 'authErr'
        };

        if (user) {
            if (user.checkPassword(data.password)) {
                user.remember = data.remember;
                callback(null, user);
            } else {
                err.message = 'Access denied, wrong password!';
                callback(err);
            }
        } else {
            err.message = 'Access denied, user not found!';
            callback(err);
        }

    });
};

exports.User = mongoose.model('User', schema);