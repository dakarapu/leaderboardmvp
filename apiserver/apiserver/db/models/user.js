const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.user = Schema({
    full_name: {
        type: String,
        required : true,
        dropDups: true
    },
    email: {
        type: String,
        unique : true,
        required : true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: Number,
        required : true,
        dropDups: true
    },
    score: {
        type: Number,
        required : true,
        dropDups: true
    },
    joined: {
        type: Number,
        required : true,
        dropDups: true
    }
});