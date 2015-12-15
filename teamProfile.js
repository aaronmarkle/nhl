var express = require('express');
var teamProfile = express.Router();
var request = require('request');

teamProfile.get('/', function(req, res) {
  request('https://api.sportradar.us/nhl-t3/teams/44151f7a-0f24-11e2-8525-18a905767e44/profile.json?api_key=6e3p8andmqyfxaqh8hqy59q2', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var teamProfile = JSON.parse(body);
      teamProfile = JSON.stringify(teamProfile);
      res.send(teamProfile);
    }
  });
});

module.exports = teamProfile;