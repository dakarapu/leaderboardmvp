const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.match = Schema({
    player1_id: {
        type: String,
        required : true,
        dropDups: true
    },
    player1_email: {
        type: String,
        required : true,
        dropDups: true
    },
    player1_name: {
        type: String,
        required : true,
        dropDups: true
    },
    player1_score: {
        type: Number,
        required : true,
        dropDups: true
    },
    player2_id: {
        type: String,
        required : true,
        dropDups: true
    },
    player2_email: {
        type: String,
        required : true,
        dropDups: true
    },
    player2_name: {
        type: String,
        required : true,
        dropDups: true
    },
    player2_score: {
        type: Number,
        required : true,
        dropDups: true
    },
    status: {
        type: Boolean,
        required: true,
        dropDups: true
    },
    winner: {
        type: String,
        required: true,
        dropDups: true
    }
});