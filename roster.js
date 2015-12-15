var getTeamProfile = new XMLHttpRequest();
getTeamProfile.onload = function() {
  //var teamId = teamId
  response = JSON.parse(getTeamProfile.responseText);
  console.log(response);
}
getTeamProfile.open('GET', 'http://127.0.0.1:8080/teamProfile', true);
getTeamProfile.send();