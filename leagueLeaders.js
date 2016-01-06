var express = require('express');
var leagueLeaders = express.Router();
var request = require('request');
var fs = require('fs');

var options = {
  url: 'https://api.sportradar.us/nhl-t3/seasontd/2015/reg/leaders/offense.json?api_key=6e3p8andmqyfxaqh8hqy59q2',
  //headers: {
  //  'If-Modified-Since': 'Wed, 06 Jan 2016 05:33:12 GMT'
  //}
};

leagueLeaders.use('/', function(req, res) {
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var leagueLeaders = JSON.parse(body);
      res.json(leagueLeaders);
    } 
    else {
      fs.readFile('leagueLeadersSample.json', 'utf8', function(err, data) {
        console.log(response.headers);
        res.send(data);
      });
    }
  });
});

module.exports = leagueLeaders;