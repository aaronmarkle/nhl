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
};
getRankings.open('GET', 'http://127.0.0.1:8080/rankings', true);
getRankings.send();

var getStandings = new XMLHttpRequest();
getStandings.onload = function() {
  response = JSON.parse(getStandings.responseText);
  //pacific
  var pacific = response.conferences[1].divisions[1];
  listStandings(pacific);
  //central
  var central = response.conferences[1].divisions[0];
  listStandings(central);
  //atlantic
  var atlantic = response.conferences[0].divisions[0];
  listStandings(atlantic);
  //metropolitan
  var metropolitan = response.conferences[0].divisions[1];
  listStandings(metropolitan);
}
getStandings.open('GET', 'http://127.0.0.1:8080/standings', true);
getStandings.send();

function listTeams(division) {
  var table = document.createElement('table');
  table.setAttribute('class', 'table');
  document.getElementById(division.name).appendChild(table);
  for (var i=0; i<division.teams.length; i++) {
    var tr = document.createElement('tr');
    tr.setAttribute('id', division.teams[i].id);
    table.appendChild(tr);
    var newNode = document.createTextNode(division.teams[i].name);
    var newEleTd = document.createElement('td');
    var newEleA = document.createElement('a');
    tr.appendChild(newEleTd);
    newEleA.appendChild(newNode);
    newEleTd.appendChild(newEleA);
    newEleA.setAttribute('data-team', division.teams[i].id);
    newEleA.addEventListener('click', function(e) {
      listPlayers(e.target.getAttribute('data-team'));
    }, false);
  }
}

function listStandings(division) {
  for (var i=0; i<division.teams.length; i++) {
    var teamRow = document.getElementById(division.teams[i].id)
    var winsNode = document.createTextNode(division.teams[i].wins);
    var winsTd = document.createElement('td');
    winsTd.appendChild(winsNode);
    teamRow.appendChild(winsTd);

    var lossesNode = document.createTextNode(division.teams[i].losses);
    var lossesTd = document.createElement('td');
    lossesTd.appendChild(lossesNode);
    teamRow.appendChild(lossesTd);
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
    var newNode = document.createTextNode(response.market + ' ' + response.name);
    var newEle = document.createElement('p');
    newEle.setAttribute('class', 'h1');
    newEle.appendChild(newNode);
    teamProfile.appendChild(newEle);
    /*for (var i=0; i<response.players.length; i++) {
      var newNode = document.createTextNode(response.players[i].full_name);
      var newEle = document.createElement('p');
      newEle.setAttribute('class', 'h4');
      newEle.appendChild(newNode);
      teamProfile.appendChild(newEle);
    }*/
    var table = document.createElement('table');
    teamProfile.appendChild(table);
    for (var i=0; i<response.players.length; i++) {
      var tr = document.createElement('tr');
      table.appendChild(tr);
      var nameNode = document.createTextNode(response.players[i].full_name);
      var name = document.createElement('td');
      name.appendChild(nameNode);
      tr.appendChild(name);
    }
  }
  getTeamProfile.open('GET', 'http://127.0.0.1:8080/teamProfile?teamId=' + teamId, true);
  getTeamProfile.send();
}