var express = require('express');
var teamProfile = express.Router();
var request = require('request');

teamProfile.use('/', function(req, res) {
  var keyword = req.query.teamId;
  request('https://api.sportradar.us/nhl-t3/teams/' + keyword + '/profile.json?api_key=6e3p8andmqyfxaqh8hqy59q2', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var teamProfile = JSON.parse(body);
      res.json(teamProfile);
    }
  });
});

module.exports = teamProfile;