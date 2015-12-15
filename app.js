var express = require('express');
var app = express();
var fs = require('fs');
var rankings = require('./rankings.js');
var standings = require('./standings.js');

//app.use('/rankings', rankings);

//app.use('/standings', standings);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/default.js', function(req, res) {
  res.sendFile(__dirname + '/default.js');
});

app.get('/default.css', function(req, res) {
  res.sendFile(__dirname + '/default.css');
})

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

app.listen(8080);
console.log('Server is live on port 8080.');