const fs = require('fs');
const path = require('path');
const app = require('../app.js');
const db = require('../db/db_schema.js');
const settings = require('../config/base.js');
const handleError = require('../exceptions/handler.js').handleError;



// ------ Endpoints ------

// ------ Get all users ------
app.get(settings.api + '/users/', function (req, res) {
    db.User.find({user_type: 0}).select().exec(function (err, list) {
        if (err) return handleError(err, res, 500);
        res.send(list);
    });
});
// ------ Get all joined users ------
app.get(settings.api + '/join/users/', function (req, res) {
    
    db.User.find({joined: 1}).select().exec(function (err, list) {
        if (err) return handleError(err, res, 500);
        res.send(list);
    });
});

// ------ Get user score from id ------
app.get(settings.api + '/user/score/:id', function (req, res) {
    db.User.findOne({ _id: req.params.id }).select().exec(function (err, obj) {
        if (err) return handleError(err, res, 404);
        res.send(obj);
    });
});
