var AccessToken;

function auth() {

  var theUrl = "https://api.monzo.com/accounts";
  AccessToken = prompt("Enter Access Token");

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.setRequestHeader('Authorization', 'Bearer ' + AccessToken)

  xmlHttp.send(null);
  var response = JSON.parse(xmlHttp.responseText);

  document.getElementById('sort-code').innerHTML = response.accounts[0].sort_code;
  document.getElementById('account-name').innerHTML = response.accounts[0].description;
  document.getElementById('account-number').innerHTML = response.accounts[0].account_number;


}
