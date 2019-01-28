const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const settings = require('../config/base.js');
const logger = require('../logger.js');
const app = require('../app.js');
const path = require('path');
exports.connection;

// ------ start database connection ------
// here app is connected with mongodb
//if connect is successful, then all routes are imported.
connectDB = function()  {
	const dbConnection = mongoose.createConnection('mongodb://' + settings.dbUrl, function(err){
		if(err) {
			logger.error(err);
			setTimeout(function() {
				connectDB();
			}, 3000);
		} else {
            exports.connection = dbConnection;
			logger.info("MongoDB connected at: " + settings.dbUrl);

			require('./db_schema.js');
            require('../controllers/test.js');
            require('../controllers/auth.js');
            require('../controllers/users.js');
            require('../controllers/match.js');
		}

        // Redirect for frontend pages
        app.use('*', function (req, res, next) {
            if (req._parsedOriginalUrl) {
                url = req._parsedOriginalUrl.path;
                if(!url.startsWith('/api/') && url.indexOf('.') == -1) {
                    res.status(200).sendFile(path.resolve(__dirname + '//..//..//frontend//dist//index.html'));
                } else {
                    next();
                }
            } else {
                next();
            }
        });
	});

};

connectDB();