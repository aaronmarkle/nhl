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
    var newEle = document.createElement('p');
    newEle.appendChild(newNode);
    document.getElementById(division.name).appendChild(newEle);
  }
}