var xhr = new XMLHttpRequest();
xhr.onload = function() {
  response = JSON.parse(xhr.responseText);
  document.getElementById('test').textContent = response;
};
xhr.open('GET', 'http://127.0.0.1:8080/rankings', true);
xhr.send();