var express = require('express');
var leagueLeaders = express.Router();
var request = require('request');

leagueLeaders.use('/', function(req, res) {
  var keyword = req.query.teamId;
  request('https://api.sportradar.us/nhl-t3/seasontd/2015/reg/leaders/offense.json?api_key=6e3p8andmqyfxaqh8hqy59q2', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var leagueLeaders = JSON.parse(body);
      res.json(leagueLeaders);
    }
  });
});

module.exports = leagueLeaders;