const clientId = 'oauthclient_00009TXCnYQLZeF8s0rvbF';
const redirectUri = 'https://rossmuego.github.io/dashbonzo/js/monzo.js'

function auth() {

  var theUrl = "https://api.monzo.com/accounts";
  var code = document.getElementById('access-token-input').value;
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.setRequestHeader('Authorization', 'Bearer ' + code)

  xmlHttp.send(null);
  console.log(JSON.parse(xmlHttp.responseText));

}
