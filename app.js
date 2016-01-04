var express = require('express');
var app = express();
var fs = require('fs');
var rankings = require('./rankings.js');
var standings = require('./standings.js');
var teamProfile = require('./teamProfile.js');
var playerProfile = require('./playerProfile.js');

app.use('/rankings', rankings);

app.use('/standings', standings);

app.use('/teamProfile', teamProfile);

app.use('/playerProfile', playerProfile);

app.use('/images', express.static(__dirname + '/images'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/default.js', function(req, res) {
  res.sendFile(__dirname + '/default.js');
});

app.get('/default.css', function(req, res) {
  res.sendFile(__dirname + '/default.css');
});

/*app.get('/rankings', function(req, res) {
  fs.readFile('rankingsSample.json', 'utf8', function(err, data) {
    res.send(data);
  });
});

app.get('/standings', function(req, res) {
  fs.readFile('standingsSample.json', 'utf8', function(err, data) {
    res.send(data);
  });
});

app.get('/teamProfile', function(req, res) {
  fs.readFile('teamProfileSample.json', 'utf8', function(err, data) {
    res.send(data);
  });
});

app.get('/playerProfile', function(req, res) {
  fs.readFile('playerProfileSample.json', 'utf8', function(err, data) {
    res.send(data);
  });
});

app.get('/leagueLeaders', function(req, res) {
  fs.readFile('leagueLeadersSample.json', 'utf8', function(err, data) {
    res.send(data);
  });
});*/

app.listen(8080);
console.log('Server is live on port 8080.');