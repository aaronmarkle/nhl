var express = require('express');
var app = express();
var fs = require('fs');
var rankings = require('./rankings.js');
var standings = require('./standings.js');
var teamProfile = require('./teamProfile.js');

//app.use('/rankings', rankings);

//app.use('/standings', standings);

//app.use('/teamProfile', teamProfile);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/roster.html', function(req, res) {
  res.sendFile(__dirname + '/roster.html');
})

app.get('/default.js', function(req, res) {
  res.sendFile(__dirname + '/default.js');
});

app.get('/roster.js', function(req, res) {
  res.sendFile(__dirname + '/roster.js');
});

app.get('/default.css', function(req, res) {
  res.sendFile(__dirname + '/default.css');
});

app.get('/rankings', function(req, res) {
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

app.listen(8080);
console.log('Server is live on port 8080.');