var AccessToken;

function init() {

  AccessToken = prompt("Enter Access Token");

  var accounts = getAccounts();
  var transactions = getTransactions(accounts);
  var balance = getBalance(accounts);

  console.log(transactions);
  document.getElementById('account-balance').innerHTML = "£" + balance.balance / 100;

  for (var i = transactions.transactions.length - 1; i > 0; i--) {

    if (transactions.transactions[i].merchant == null) {
      merch = "N/A"
    } else {
      merch = transactions.transactions[i].merchant.name;
    }

    var singleTrans = document.createElement('div')
    singleTrans.id = transactions.transactions[i].id
    singleTrans.className = "transaction";

    if (parseInt((transactions.transactions[i].amount)) < 0) {
      singleTrans.style.backgroundColor = "red";
    } else {
      singleTrans.style.backgroundColor = "green";
    }
    singleTrans.innerHTML = transactions.transactions[i].amount / 100 + '       ' + merch
    document.getElementById('transactions-all').appendChild(singleTrans);
  }

  var today = new Date(Date.now()).toISOString();
  today = today.slice(0, 10);
  console.log(today)

  for (var i = transactions.transactions.length - 1; i > 0; i--) {

    if (transactions.transactions[i].created.slice(0,10) == today) {

      if (transactions.transactions[i].merchant == null) {
        merch = "N/A"
      } else {
        merch = transactions.transactions[i].merchant.name;
      }

      var singleTrans = document.createElement('div')
      singleTrans.id = transactions.transactions[i].id
      singleTrans.className = "transaction";

      if (parseInt((transactions.transactions[i].amount)) < 0) {
        singleTrans.style.backgroundColor = "red";
      } else {
        singleTrans.style.backgroundColor = "green";
      }
      singleTrans.innerHTML = transactions.transactions[i].amount / 100 + '       ' + merch
      document.getElementById('transactions-today').appendChild(singleTrans);
    }
  }
}

function getTransactions(accNum) {

  return makeRequest("GET", "transactions?expand[]=merchant&account_id=", accNum.accounts[0].id)

}

function getAccounts() {

  var response = makeRequest("GET", "accounts", "")

  document.getElementById('sort-code').innerHTML = response.accounts[0].sort_code;
  document.getElementById('account-name').innerHTML = response.accounts[0].description;
  document.getElementById('account-number').innerHTML = response.accounts[0].account_number;

  return response;
}

function getBalance(accNum) {

  return makeRequest("GET", "balance?account_id=", accNum.accounts[0].id);
}


function makeRequest(type, action, param) {

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open(type, "https://api.monzo.com/" + action + param, false); // false for synchronous request
  xmlHttp.setRequestHeader('Authorization', 'Bearer ' + AccessToken)
  xmlHttp.send(null);

  return JSON.parse(xmlHttp.responseText);
}
