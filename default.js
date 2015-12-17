var getRankings = new XMLHttpRequest();
getRankings.onload = function() {
  rankingsResponse = JSON.parse(getRankings.responseText);
};
getRankings.open('GET', 'http://127.0.0.1:8080/rankings', true);
getRankings.send();

var getStandings = new XMLHttpRequest();
getStandings.onload = function() {
  standingsResponse = JSON.parse(getStandings.responseText);
  //pacific
  var pacific = standingsResponse.conferences[1].divisions[1];
  listTeams(pacific);
  listStandings(pacific);
  //central
  var central = standingsResponse.conferences[1].divisions[0];
  listTeams(central);
  listStandings(central);
  //atlantic
  var atlantic = standingsResponse.conferences[0].divisions[0];
  listTeams(atlantic);
  listStandings(atlantic);
  //metropolitan
  var metropolitan = standingsResponse.conferences[0].divisions[1];
  listTeams(metropolitan);
  listStandings(metropolitan);
}
getStandings.open('GET', 'http://127.0.0.1:8080/standings', true);
getStandings.send();

function listTeams(division) {
  //create rankings table and table-header
  var table = document.createElement('table');
  table.setAttribute('class', 'table');
  var thead = document.createElement('thead');
  var theadrow = document.createElement('tr');
  createTableData('Team', 'th', thead)
  createTableData('W', 'th', thead)
  createTableData('L', 'th', thead)
  createTableData('OT', 'th', thead)
  createTableData('Total', 'th', thead)
  table.appendChild(thead);
  var tbody = document.createElement('tbody');
  table.appendChild(tbody);
  //create each row and give team-id attribute
  document.getElementById(division.name).appendChild(table);
  for (var i=0; i<division.teams.length; i++) {
    var tr = document.createElement('tr');
    tr.setAttribute('id', division.teams[i].id);
    tbody.appendChild(tr);
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
    createTableData(division.teams[i].wins, 'td', teamRow);
    createTableData(division.teams[i].losses, 'td', teamRow);
    createTableData(division.teams[i].overtime_losses, 'td', teamRow);
    createTableData(division.teams[i].points, 'td', teamRow);
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
    newEle.setAttribute('class', 'h2');
    newEle.appendChild(newNode);
    teamProfile.appendChild(newEle);
    var table = document.createElement('table');
    table.setAttribute('class', 'table');
    teamProfile.appendChild(table);
    var thead = document.createElement('thead');
    createTableData('Status', 'th', thead);
    createTableData('Player', 'th', thead);
    createTableData('Position', 'th', thead);
    createTableData('Number', 'th', thead);
    createTableData('Weight', 'th', thead);
    createTableData('Height', 'th', thead);
    createTableData('Birthplace', 'th', thead);
    table.appendChild(thead);
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    for (var i=0; i<response.players.length; i++) {
      var tr = document.createElement('tr');
      tbody.appendChild(tr);
      createTableData(response.players[i].status, 'td', tr);
      createTableData(response.players[i].full_name, 'td', tr);
      createTableData(response.players[i].primary_position, 'td', tr);
      createTableData(response.players[i].jersey_number, 'td', tr);
      createTableData(response.players[i].weight, 'td', tr);
      createTableData(response.players[i].height, 'td', tr);
      createTableData(response.players[i].birth_place, 'td', tr);
    }
  }
  getTeamProfile.open('GET', 'http://127.0.0.1:8080/teamProfile?teamId=' + teamId, true);
  getTeamProfile.send();
}
function createTableData(property, element, parent) {
  var node = document.createTextNode(property);
  var td = document.createElement(element);
  td.appendChild(node);
  parent.appendChild(td);
}