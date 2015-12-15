var getRankings = new XMLHttpRequest();
getRankings.onload = function() {
  response = JSON.parse(getRankings.responseText);
  //pacific
  document.getElementById('pd1').textContent = response.conferences[1].divisions[1].teams[0].name;
  document.getElementById('pd2').textContent = response.conferences[1].divisions[1].teams[1].name;
  document.getElementById('pd3').textContent = response.conferences[1].divisions[1].teams[2].name;
  document.getElementById('pd4').textContent = response.conferences[1].divisions[1].teams[3].name;
  document.getElementById('pd5').textContent = response.conferences[1].divisions[1].teams[4].name;
  document.getElementById('pd6').textContent = response.conferences[1].divisions[1].teams[5].name;
  document.getElementById('pd7').textContent = response.conferences[1].divisions[1].teams[6].name;
  //central
  document.getElementById('cd1').textContent = response.conferences[1].divisions[0].teams[0].name;
  document.getElementById('cd2').textContent = response.conferences[1].divisions[0].teams[1].name;
  document.getElementById('cd3').textContent = response.conferences[1].divisions[0].teams[2].name;
  document.getElementById('cd4').textContent = response.conferences[1].divisions[0].teams[3].name;
  document.getElementById('cd5').textContent = response.conferences[1].divisions[0].teams[4].name;
  document.getElementById('cd6').textContent = response.conferences[1].divisions[0].teams[5].name;
  document.getElementById('cd7').textContent = response.conferences[1].divisions[0].teams[6].name;
  //atlantic
  document.getElementById('atld1').textContent = response.conferences[0].divisions[0].teams[0].name;
  document.getElementById('atld2').textContent = response.conferences[0].divisions[0].teams[1].name;
  document.getElementById('atld3').textContent = response.conferences[0].divisions[0].teams[2].name;
  document.getElementById('atld4').textContent = response.conferences[0].divisions[0].teams[3].name;
  document.getElementById('atld5').textContent = response.conferences[0].divisions[0].teams[4].name;
  document.getElementById('atld6').textContent = response.conferences[0].divisions[0].teams[5].name;
  document.getElementById('atld7').textContent = response.conferences[0].divisions[0].teams[6].name;
  document.getElementById('atld8').textContent = response.conferences[0].divisions[0].teams[7].name;
  //metropolitan
  document.getElementById('md1').textContent = response.conferences[0].divisions[1].teams[0].name;
  document.getElementById('md2').textContent = response.conferences[0].divisions[1].teams[1].name;
  document.getElementById('md3').textContent = response.conferences[0].divisions[1].teams[2].name;
  document.getElementById('md4').textContent = response.conferences[0].divisions[1].teams[3].name;
  document.getElementById('md5').textContent = response.conferences[0].divisions[1].teams[4].name;
  document.getElementById('md6').textContent = response.conferences[0].divisions[1].teams[5].name;
  document.getElementById('md7').textContent = response.conferences[0].divisions[1].teams[6].name;
  document.getElementById('md8').textContent = response.conferences[0].divisions[0].teams[7].name;
};
getRankings.open('GET', 'http://127.0.0.1:8080/rankings', true);
getRankings.send();

var getStandings = new XMLHttpRequest();
getStandings.onload = function() {
  response = JSON.parse(getStandings.responseText);
  console.log(response);
}
getStandings.open('GET', 'http://127.0.0.1:8080/standings', true);
getStandings.send();