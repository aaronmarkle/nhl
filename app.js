var express = require('express');
var app = express();
var fs = require('fs');
var standings = require('./standings.js');

app.use('/standings', standings);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/default.js', function(req, res) {
  res.sendFile(__dirname + '/default.js');
});

/*app.get('/rankings', function(req, res) {
  var rankings;
  fs.readFile('rankingsSample.json', 'utf8', function(err, data) {
    res.send(data);
  });
});*/

app.listen(8080);
console.log('Server is live on port 8080.');