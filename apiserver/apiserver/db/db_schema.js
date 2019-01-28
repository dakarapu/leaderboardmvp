const mongoose = require('mongoose');
var db_model = require('./db_connection.js');

// Import models
var models = require('./models/index.js');


// Declare mongoose models
const db = [];
// db.Admin = db_model.connection.model('Admin', models.admin);
db.User = db_model.connection.model('User', models.user);
db.Match = db_model.connection.model('Match', models.match);
module.exports = db;

