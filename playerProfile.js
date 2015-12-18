var express = require('express');
var playerProfile = express.Router();
var request = require('request');

playerProfile.use('/', function(req, res) {
  var keyword = req.query.playerId;
  request('https://api.sportradar.us/nhl-t3/players/' + keyword + '/profile.json?api_key=6e3p8andmqyfxaqh8hqy59q2', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var playerProfile = JSON.parse(body);
      playerProfile = JSON.stringify(playerProfile);
      res.send(playerProfile);
    }
  });
});

module.exports = playerProfile;