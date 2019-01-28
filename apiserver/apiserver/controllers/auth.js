const path = require('path');
const request = require('request');

const app = require('../app.js');
const db = require('../db/db_schema.js');
const settings = require('../config/base.js');

const getAccount = require('../db/account');
const handleError = require('../exceptions/handler.js').handleError;

// ------ Endpoint for user login ------
app.post(settings.api + '/auth/users/login', function(req, res) {
    var params = req.body;

    getAccount.getUser(params.email, function(user) {
        if (user) {
            if (params.password !== user.password) {
                return handleError("Bad request", res, 400);
            }
            res.send({"user": user});
        } else {
            return handleError("Unauthorized", res, 401);
        }
    });
});

// ------ Create user ------
app.post(settings.api + '/auth/users/signup', function(req, res) {
    obj = new db.User(req.body);
    obj.save(function(err) {
        if (err) {
            if (err.message.includes('dup key')) {
                if (err.message.includes('email')) {
                    return handleError({'status': 'failed', 'message': "The 'Current Email' is already in use by another user. Please use another email address or contact the system administrator."}, res, 200);
                }
            }
            return handleError(err, res, 400);
        }
        res.send({'status': 'success'});
    });
});
