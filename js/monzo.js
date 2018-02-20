var AccessToken;

function auth() {

  AccessToken = prompt("Enter Access Token");

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", "https://api.monzo.com/accounts", false); // false for synchronous request
  xmlHttp.setRequestHeader('Authorization', 'Bearer ' + AccessToken)

  xmlHttp.send(null);
  var response = JSON.parse(xmlHttp.responseText);

  document.getElementById('sort-code').innerHTML = response.accounts[0].sort_code;
  document.getElementById('account-name').innerHTML = response.accounts[0].description;
  document.getElementById('account-number').innerHTML = response.accounts[0].account_number;

  var bal = new XMLHttpRequest();
  bal.open("GET", "https://api.monzo.com/balance?account_id=" + response.accounts[0].id, false)
  bal.setRequestHeader('Authorization', 'Bearer ' + AccessToken)
  bal.send(null)
  var balance = JSON.parse(bal.responseText);
  document.getElementById('account-balance').innerHTML = balance.balance / 100;


  var trans = new XMLHttpRequest();

  trans.open("GET", "https://api.monzo.com/transactions?account_id=" + response.accounts[0].id, false); // false for synchronous request
  trans.setRequestHeader('Authorization', 'Bearer ' + AccessToken)

  trans.send(null);
  var transactions = JSON.parse(trans.responseText);

  for (var i = 0; i < transactions.transactions.length; i++) {
    var singleTrans = document.createElement('div')
    singleTrans.id = transactions.transactions[i].id
    singleTrans.innerHTML = '<p>' + transactions.transactions[i].amount / 100 + '       ' + transactions.transactions[i].description + '<p>'

    document.getElementById('transactions').appendChild(singleTrans);
  }
}
