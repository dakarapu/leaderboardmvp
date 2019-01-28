
db = require('../db/db_schema.js');
/**
 * Get user by email
 * @param {*} email
 * @param {*} callback
 */
exports.getUser = function(email, callback) {
    db.User.findOne({ email: email }).lean().exec(function(err, user) {
        callback(user);
    });
};

/**
 * Get user by _id
 * @param {*} _id
 * @param {*} callback
 */
exports.getUserById = function(_id, callback) {
    db.User.findById(_id).lean().exec(function(err, user) {
        callback(user);
    });
};
