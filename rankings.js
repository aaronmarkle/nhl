var express = require('express');
var rankings = express.Router();
var request = require('request');

rankings.get('/', function(req, res) {
  request('https://api.sportradar.us/nhl-t3/seasontd/2015/reg/rankings.json?api_key=6e3p8andmqyfxaqh8hqy59q2', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var rankings = JSON.parse(body);
      res.json(rankings);
    }
  });
});

module.exports = rankings;