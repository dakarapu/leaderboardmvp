const fs = require('fs');
const path = require('path');
const app = require('../app.js');
const db = require('../db/db_schema.js');
const settings = require('../config/base.js');
const handleError = require('../exceptions/handler.js').handleError;


// ------ Get all matches ------
app.get(settings.api + '/matches/', function (req, res) {
    db.Match.find().select().exec(function (err, list) {
        if (err) return handleError(err, res, 500);
        res.send(list);
    });
});


//---------join in competition---------
app.put(settings.api + '/join_in/:id', function (req, res) {
    let user = {};
    db.User.findByIdAndUpdate(req.params.id, { "joined": 1 }, { 'new': true }, function (err, obj) {
        if (err) return handleError(err, res, 500);

        obj.save(function (err) {
            if (err) return handleError(err, res, 500);
            // res.send({ 'status': 'success' });
            user = obj;

            db.User.find({ joined: 1 }).select().exec(function (err, obj) {
                if (err) return handleError(err, res, 500);
                // res.send(obj);
                if (obj.length > 0) {
                    for (i = 0; i < obj.length; i++) {
                        let temp = obj[i];
                        if (temp.email != user.email) {
                            let newMatch = {};
                            newMatch.player1_id = user._id;
                            newMatch.player1_email = user.email;
                            newMatch.player1_name = user.full_name;
                            newMatch.player1_score = user.score;
                            newMatch.player2_id = temp._id;
                            newMatch.player2_email = temp.email;
                            newMatch.player2_name = temp.full_name;
                            newMatch.player2_score = temp.score;
                            newMatch.status = false;
                            newMatch.winner = "No win"
                            obj_match = new db.Match(newMatch);
                            obj_match.save(function (err) {
                                if (err) {
                                    return handleError(err, res, 400);
                                }
                            });
                        }
                    }

                    res.send({ 'status': 'success' });
                }

            });
        });
    });




});

//-----------join out---------------
app.put(settings.api + '/join_out/:id', function (req, res) {
    let user = {};
    db.User.findByIdAndUpdate(req.params.id, { "joined": 0 }, { 'new': true }, function (err, obj) {
        if (err) return handleError(err, res, 500);

        obj.save(function (err) {
            if (err) return handleError(err, res, 500);
            user = obj;
            db.Match.deleteMany({ player1_id: user._id }, function (err) {
                if (err) return handleError(err, res, 500);
            });

            db.Match.deleteMany({ player2_id: user._id }, function (err) {
                if (err) return handleError(err, res, 500);
            });
            res.send({ 'status': 'success' });

        });
    });

});

// ------ Update score ------
app.put(settings.api + '/update/score', function (req, res) {
    let body = req.body;
    let match_id = body.match_id;
    let player1_id = body.player1_id;
    let player1_email = body.player1_email;
    let player1_score = body.player1_score;
    let player2_id = body.player2_id;
    let player2_email = body.player2_email;
    let player2_score = body.player2_score;
    let win_player_email = body.win_player_email;
    let updatedscore_player1 = 0;
    let updatedscore_player2 = 0;
    if (win_player_email == player1_email) {
        updatedscore_player1 = player1_score + 4;
        updatedscore_player2 = player2_score + 1;
    } else if (win_player_email == 'draw') {
        updatedscore_player1 = player1_score + 2;
        updatedscore_player2 = player2_score + 2;
    } else {
        updatedscore_player1 = player1_score + 1;
        updatedscore_player2 = player2_score + 4;
    }


    db.User.findByIdAndUpdate(player1_id, { 'score': updatedscore_player1 }, { 'new': true }, function (err, obj) {
        if (err) return handleError(err, res, 500);

        obj.save(function (err) {
            if (err) return handleError(err, res, 500);

        });
    });
    db.User.findByIdAndUpdate(player2_id, { 'score': updatedscore_player2 }, { 'new': true }, function (err, obj) {
        if (err) return handleError(err, res, 500);

        obj.save(function (err) {
            if (err) return handleError(err, res, 500);
        });
    });
    db.Match.findByIdAndUpdate(match_id, { 'player1_score': updatedscore_player1, 'player2_score': updatedscore_player2, 'status': true, 'winner': win_player_email }, { 'new': true }, function (err, obj) {
        if (err) return handleError(err, res, 500);

        obj.save(function (err) {
            if (err) return handleError(err, res, 500);
            res.send({ 'status': 'success' });
        });
    });

});
//------ Delete match ------
app.delete(settings.api + '/matches/finish/:id', function (req, res) {
    db.Match.findByIdAndRemove(req.params.id, function (err) {
        if (err) return handleError(err, res, 500);
        res.send({ "status": "success" });
    });
});


//------ Reset match ------ 
app.put(settings.api + '/matches/reset/:id', function (req, res) {


    db.Match.findOne({ _id: req.params.id }).select().exec(function (err, obj) {
        if (err) return handleError(err, res, 404);
        let match_id = obj._id;
        let player1_id = obj.player1_id;
        let player1_email = obj.player1_email;
        let player1_name = obj.player1_name;
        let player1_score = obj.player1_score;
        let player2_id = obj.player2_id;
        let player2_email = obj.player2_email;
        let player2_name = obj.player2_name;
        let player2_score = obj.player2_score;
        let status = obj.status;
        let winner = obj.winner;
        let updatedscore_player1 = 0;
        let updatedscore_player2 = 0;
        if (winner == player1_email) {
            updatedscore_player1 = player1_score - 4;
            updatedscore_player2 = player2_score - 1;
        } else if (winner == player2_email) {
            updatedscore_player1 = player1_score - 1;
            updatedscore_player2 = player2_score - 4;
        } else if (winner == "draw") {
            updatedscore_player1 = player1_score - 2;
            updatedscore_player2 = player2_score - 2;
        }

        db.User.findByIdAndUpdate(player1_id, { 'score': updatedscore_player1 }, { 'new': true }, function (err, obj) {
            if (err) return handleError(err, res, 500);

            obj.save(function (err) {
                if (err) return handleError(err, res, 500);

            });
        });
        db.User.findByIdAndUpdate(player2_id, { 'score': updatedscore_player2 }, { 'new': true }, function (err, obj) {
            if (err) return handleError(err, res, 500);

            obj.save(function (err) {
                if (err) return handleError(err, res, 500);
            });
        });
        db.Match.findByIdAndUpdate(match_id, { 'player1_score': updatedscore_player1, 'player2_score': updatedscore_player2, 'status': false, 'winner': "No Win" }, { 'new': true }, function (err, obj) {
            if (err) return handleError(err, res, 500);

            obj.save(function (err) {
                if (err) return handleError(err, res, 500);
                res.send({ 'status': 'success' });
            });
        });

    });
});