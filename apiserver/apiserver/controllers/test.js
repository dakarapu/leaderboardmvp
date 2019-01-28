const app = require('../app.js');
const db = require('../db/db_schema.js');
const settings = require('../config/base.js');


// ------ Endpoints ------

// ------ Test get api ------
app.get(settings.api + '/test', function(req, res) {
    console.log("Test api for gety")
    res.send("ok")
});

// ------ Test post api ------
app.post(settings.api + '/test', function(req, res) {

});
