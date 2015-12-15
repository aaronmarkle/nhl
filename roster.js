var getTeamProfile = new XMLHttpRequest();
getTeamProfile.onload = function() {
  response = JSON.parse(getTeamProfile.responseText);
  listPlayers();
}
getTeamProfile.open('GET', 'http://127.0.0.1:8080/teamProfile', true);
getTeamProfile.send();

function listPlayers() {
  for (var i=0; i<response.players.length; i++) {
    var newNode = document.createTextNode(response.players[i].full_name);
    var newEle = document.createElement('p');
    newEle.appendChild(newNode);
    document.getElementById('roster').appendChild(newEle);
  }
}