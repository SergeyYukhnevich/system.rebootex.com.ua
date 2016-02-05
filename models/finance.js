var mongoose = require('../bin/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
    revenue: {
        type: Number
    },
    profit: {
        type: Number
    },
    expenses: {
        type: Number
    }
});

exports.Finance = mongoose.model('Finance', schema);