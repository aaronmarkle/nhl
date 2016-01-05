var getRankings = new XMLHttpRequest();
getRankings.onload = function() {
  rankingsResponse = JSON.parse(getRankings.responseText);
  //pacific
  var pacific = rankingsResponse.conferences[1].divisions[1];
  listTeams(pacific);
  //central
  var central = rankingsResponse.conferences[1].divisions[0];
  listTeams(central);
  //atlantic
  var atlantic = rankingsResponse.conferences[0].divisions[0];
  listTeams(atlantic);
  //metropolitan
  var metropolitan = rankingsResponse.conferences[0].divisions[1];
  listTeams(metropolitan);
  setTimeout(standingsCall, 1100);
};
getRankings.open('GET', 'http://127.0.0.1:8080/rankings', true);
getRankings.send();

function standingsCall() {
  var getStandings = new XMLHttpRequest();
  getStandings.onload = function() {
    standingsResponse = JSON.parse(getStandings.responseText);
    //pacific
    var pacific = standingsResponse.conferences[1].divisions[1];
    listStandings(pacific);
    //central
    var central = standingsResponse.conferences[1].divisions[0];
    listStandings(central);
    //atlantic
    var atlantic = standingsResponse.conferences[0].divisions[0];
    listStandings(atlantic);
    //metropolitan
    var metropolitan = standingsResponse.conferences[0].divisions[1];
    listStandings(metropolitan);
    setTimeout(listLeagueLeaders, 1100);
  }
  getStandings.open('GET', 'http://127.0.0.1:8080/standings', true);
  getStandings.send();
}

function listTeams(division) {
  //create rankings table and table-header
  var table = document.createElement('table');
  table.setAttribute('class', 'table table-hover');
  var thead = document.createElement('thead');
  var theadrow = document.createElement('tr');
  createTableData(division.name, 'th', thead);
  createTableData('GP', 'th', thead);
  createTableData('W', 'th', thead);
  createTableData('L', 'th', thead);
  createTableData('OT', 'th', thead);
  createTableData('Total', 'th', thead);
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
    tr.appendChild(newEleTd);
    var newImg = document.createElement('img');
    newImg.setAttribute('src', '/images/' + division.teams[i].name.toLowerCase().replace(/\s+/g, '') + '-logo.png');
    newImg.setAttribute('class', 'logo');
    newEleTd.appendChild(newImg);
    newEleTd.appendChild(newNode);
    tr.addEventListener('click', function(e) {
      listPlayers(e.target.parentElement.getAttribute('id'));
    }, true);
  }
}
function listStandings(division) {
  for (var i=0; i<division.teams.length; i++) {
    var teamRow = document.getElementById(division.teams[i].id)
    createTableData(division.teams[i].games_played, 'td', teamRow);
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
    table.setAttribute('class', 'table table-hover');
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
      tr.setAttribute('id', response.players[i].id);
      tbody.appendChild(tr);
      createTableData(response.players[i].status, 'td', tr);
      createTableData(response.players[i].full_name, 'td', tr);
      createTableData(response.players[i].primary_position, 'td', tr);
      createTableData(response.players[i].jersey_number, 'td', tr);
      createTableData(response.players[i].weight, 'td', tr);
      createTableData(response.players[i].height, 'td', tr);
      createTableData(response.players[i].birth_place, 'td', tr);
      tr.addEventListener('click', function(e) {
        listPlayerProfile(e.target.parentElement.getAttribute('id'));
      }, true);
    }
  }
  getTeamProfile.open('GET', 'http://127.0.0.1:8080/teamProfile?teamId=' + teamId, true);
  getTeamProfile.send();
}

function listPlayerProfile(playerId) {
  var playerProfile = document.getElementById('playerProfile');
  while (playerProfile.firstChild) {
    playerProfile.removeChild(playerProfile.firstChild);
  }
  var getPlayerProfile = new XMLHttpRequest();
  getPlayerProfile.onload = function() {
    response = JSON.parse(getPlayerProfile.responseText);
    var table = document.createElement('table');
    table.setAttribute('class', 'table');
    playerProfile.appendChild(table);
  }
  getPlayerProfile.open('GET', 'http://127.0.0.1:8080/playerProfile?playerId=' + playerId, true);
  getPlayerProfile.send();
}

function listLeagueLeaders() {
  var goals = document.getElementById('goals');
  var assists = document.getElementById('assists');
  var getLeagueLeaders = new XMLHttpRequest();
  getLeagueLeaders.onload = function() {
    response = JSON.parse(getLeagueLeaders.responseText);
    var newImg = document.createElement('img');
    newImg.setAttribute('src', '/images/' + response.categories[1].ranks[0].teams[0].name.toLowerCase().replace(/\s+/g, '') + '-logo.png');
    newImg.setAttribute('class', 'leadersImg');
    goals.appendChild(newImg);
    for (i=0; i<10; i++) {
      createTableData(response.categories[1].ranks[i].player.full_name + ' ' + response.categories[1].ranks[i].score, 'p', goals);
    }
    var newImg = document.createElement('img');
    newImg.setAttribute('src', '/images/' + response.categories[2].ranks[0].teams[0].name.toLowerCase().replace(/\s+/g, '') + '-logo.png');
    newImg.setAttribute('class', 'leadersImg');
    assists.appendChild(newImg);
    for (i=0; i<10; i++) {
      createTableData(response.categories[2].ranks[i].player.full_name + ' ' + response.categories[2].ranks[i].score, 'p', assists);
    }
  }
  getLeagueLeaders.open('GET', 'http://127.0.0.1:8080/leagueLeaders', true);
  getLeagueLeaders.send();
}

function createTableData(property, element, parent) {
  var node = document.createTextNode(property);
  var td = document.createElement(element);
  td.appendChild(node);
  parent.appendChild(td);
}