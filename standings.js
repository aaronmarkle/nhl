var express = require('express');
var standings = express.Router();
var request = require('request');

standings.get('/', function(req, res) {
  request('https://api.sportradar.us/nhl-t3/seasontd/2015/reg/standings.json?api_key=6e3p8andmqyfxaqh8hqy59q2', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var standings = JSON.parse(body);
      res.json(standings);
    }
  });
});

module.exports = standings;