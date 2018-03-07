var AccessToken;

function getTransactions(accNum) {
  return makeRequest("GET", "transactions?account_id=", accNum.accounts[0].id+"&expand[]=merchant")
}

function getAccounts() {
  return makeRequest("GET", "accounts", "")
}

function getBalance(accNum) {
  return makeRequest("GET", "balance?account_id=", accNum.accounts[0].id);
}

function getPots() {
  return makeRequest("GET", "pots", "")
}

function makeRequest(type, action, param) {

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open(type, "https://api.monzo.com/" + action + param, false); // false for synchronous request
  xmlHttp.setRequestHeader('Authorization', 'Bearer ' + AccessToken)
  xmlHttp.send(null);

  return JSON.parse(xmlHttp.responseText);
}
