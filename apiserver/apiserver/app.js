// ------ import settings
const settings = require('./config/base.js');

// import libraries
const logger = require('./logger.js');
const express = require('express');
const app = module.exports = express();
const mongoose = require('mongoose');
const extend = require('extend');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');


// ------ import db ------ nocie tthis line.
require('./db/db_connection.js');

//middleware
app.use(cors())

// ------ add parse ------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ------ start application ------
const server = http.Server(app);

server.listen(settings.port, function() {
    logger.info('Server started on port ' + settings.port);
});
