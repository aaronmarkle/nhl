var tableify = require('tableify');
var fs = require('fs');

fs.readFile('teamProfileSample.json', 'utf8', function(err, data) {
  var html = JSON.parse(data);
  html = tableify(html.players);
  console.log(html);
});