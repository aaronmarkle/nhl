var getRankings = new XMLHttpRequest();
getRankings.onload = function() {
  response = JSON.parse(getRankings.responseText);
  //pacific
  var pacific = response.conferences[1].divisions[1];
  listTeams(pacific);
  //central
  var central = response.conferences[1].divisions[0];
  listTeams(central);
  //atlantic
  var atlantic = response.conferences[0].divisions[0];
  listTeams(atlantic);
  //metropolitan
  var metropolitan = response.conferences[0].divisions[1];
  listTeams(metropolitan);
//  md8.textContent = response.conferences[0].divisions[1].teams[7].name;
//  md8.setAttribute("data-team", response.conferences[0].divisions[1].teams[7].id);
};
getRankings.open('GET', 'http://127.0.0.1:8080/rankings', true);
getRankings.send();

var getStandings = new XMLHttpRequest();
getStandings.onload = function() {
  response = JSON.parse(getStandings.responseText);
}
getStandings.open('GET', 'http://127.0.0.1:8080/standings', true);
getStandings.send();

function listTeams(division) {
  for (var i=0; i<division.teams.length; i++) {
    var newNode = document.createTextNode(division.teams[i].name);
    var newEleP = document.createElement('p');
    var newEleBtn = document.createElement('button');
    newEleBtn.appendChild(newNode);
    newEleP.appendChild(newEleBtn);
    newEleBtn.setAttribute('data-team', division.teams[i].id);
    document.getElementById(division.name).appendChild(newEleP);
    newEleBtn.addEventListener('click', function(e) {
      listPlayers(e.target.getAttribute('data-team'));
    }, false);
  }
}

function listPlayers(teamId) {
  var teamProfile = document.getElementById('teamProfile');
  while (teamProfile.firstChild) {
    teamProfile.removeChild(teamProfile.firstChild);
  }
  var getTeamProfile = new XMLHttpRequest();
  getTeamProfile.onload = function() {
    response = JSON.parse(getTeamProfile.responseText);
    document.getElementById('teamName').textContent = response.market + ' ' + response.name;
    for (var i=0; i<response.players.length; i++) {
    var newNode = document.createTextNode(response.players[i].full_name);
    var newEle = document.createElement('p');
    newEle.setAttribute('class', 'h4');
    newEle.appendChild(newNode);
    document.getElementById('teamProfile').appendChild(newEle);
    }
  }
  getTeamProfile.open('GET', 'http://127.0.0.1:8080/teamProfile?teamId=' + teamId, true);
  getTeamProfile.send();
}