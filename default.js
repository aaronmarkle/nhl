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
  var thName = document.createElement('th');
  var thNode = document.createTextNode('Team');
  thName.appendChild(thNode);
  thead.appendChild(thName);
  var thWins = document.createElement('th');
  var winsNode = document.createTextNode('W');
  thWins.appendChild(winsNode);
  thead.appendChild(thWins);
  var thLosses = document.createElement('th');
  var lossesNode = document.createTextNode('L');
  thLosses.appendChild(lossesNode);
  thead.appendChild(thLosses);
  var thOtl = document.createElement('th');
  var otlNode = document.createTextNode('OT');
  thOtl.appendChild(otlNode);
  thead.appendChild(thOtl);
  var thTotal = document.createElement('th');
  var totalNode = document.createTextNode('Total');
  thTotal.appendChild(totalNode);
  thead.appendChild(thTotal);
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

    var winsNode = document.createTextNode(division.teams[i].wins);
    var winsTd = document.createElement('td');
    winsTd.appendChild(winsNode);
    teamRow.appendChild(winsTd);

    var lossesNode = document.createTextNode(division.teams[i].losses);
    var lossesTd = document.createElement('td');
    lossesTd.appendChild(lossesNode);
    teamRow.appendChild(lossesTd);

    var otLossesNode = document.createTextNode(division.teams[i].overtime_losses);
    var otLossesTd = document.createElement('td');
    otLossesTd.appendChild(otLossesNode);
    teamRow.appendChild(otLossesTd);

    var pointsNode = document.createTextNode(division.teams[i].points);
    var pointsTd = document.createElement('td');
    pointsTd.appendChild(pointsNode);
    teamRow.appendChild(pointsTd);
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
    function createTableData(property, element) {
      var node = document.createTextNode(property);
      var td = document.createElement(element);
      td.appendChild(node);
      tr.appendChild(td);
    }
    var table = document.createElement('table');
    table.setAttribute('class', 'table');
    teamProfile.appendChild(table);

    var thead = document.createElement('thead');
    var theadrow = document.createElement('tr');

    
    var thName = document.createElement('th');
    var thNode = document.createTextNode('Status');
    thName.appendChild(thNode);
    thead.appendChild(thName);
    var thWins = document.createElement('th');
    var winsNode = document.createTextNode('Player');
    thWins.appendChild(winsNode);
    thead.appendChild(thWins);
    var thLosses = document.createElement('th');
    var lossesNode = document.createTextNode('Position');
    thLosses.appendChild(lossesNode);
    thead.appendChild(thLosses);
    var thOtl = document.createElement('th');
    var otlNode = document.createTextNode('Number');
    thOtl.appendChild(otlNode);
    thead.appendChild(thOtl);
    var thTotal = document.createElement('th');
    var totalNode = document.createTextNode('Weight');
    thTotal.appendChild(totalNode);
    thead.appendChild(thTotal);
    var thTotal = document.createElement('th');
    var totalNode = document.createTextNode('Height');
    thTotal.appendChild(totalNode);
    thead.appendChild(thTotal);
    var thTotal = document.createElement('th');
    var totalNode = document.createTextNode('Birthplace');
    thTotal.appendChild(totalNode);
    thead.appendChild(thTotal);

    table.appendChild(thead);
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);



    for (var i=0; i<response.players.length; i++) {
      var tr = document.createElement('tr');
      tbody.appendChild(tr);
      createTableData(response.players[i].status, 'td');
      createTableData(response.players[i].full_name, 'td');
      createTableData(response.players[i].primary_position, 'td');
      createTableData(response.players[i].jersey_number, 'td');
      createTableData(response.players[i].weight, 'td');
      createTableData(response.players[i].height, 'td');
      createTableData(response.players[i].birth_place, 'td');
    }
  }
  getTeamProfile.open('GET', 'http://127.0.0.1:8080/teamProfile?teamId=' + teamId, true);
  getTeamProfile.send();
}