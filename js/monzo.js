function init() {

  AccessToken = prompt("Enter Access Token");
  var accounts = getAccounts();
  var transactions = getTransactions(accounts);
  var balance = getBalance(accounts);
  loadChart(transactions)
  displayAllTrans(transactions)

  document.getElementById('account-balance').innerHTML = "£" + balance.balance / 100;
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

function getPots() {

  return makeRequest("GET", "pots/listV1", "")

}

function makeRequest(type, action, param) {

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open(type, "https://api.monzo.com/" + action + param, false); // false for synchronous request
  xmlHttp.setRequestHeader('Authorization', 'Bearer ' + AccessToken)
  xmlHttp.send(null);

  return JSON.parse(xmlHttp.responseText);
}

function displayAllTrans(allTransactions) {
  var today = new Date(Date.now()).toISOString();
  today = today.slice(0, 10);

  for (var i = allTransactions.transactions.length - 1; i >= 0; i--) {
    if (allTransactions.transactions[i].merchant == null) {
      if ((allTransactions.transactions[i].description.slice(0, 4)) == "pot_") {
        var pots = getPots()
        for (var j = 0; j < pots.pots.length; j++) {
          if (pots.pots[j].id == allTransactions.transactions[i].description) {
            merch = pots.pots[j].name
            image = "img/bag-money.png"
          }
        }
      } else {
        merch = allTransactions.transactions[i].description;
        image = "img/default-avatar.png"
      }
    } else {
      merch = allTransactions.transactions[i].merchant.name;
      if (allTransactions.transactions[i].merchant.logo == "") {
        image = "img/default-trans.png"
      } else {
        image = allTransactions.transactions[i].merchant.logo;
      }
    }

    var singleTrans = document.createElement('div')
    singleTrans.id = allTransactions.transactions[i].id
    singleTrans.className = "transaction";

    if (parseInt((allTransactions.transactions[i].amount)) < 0) {
      singleTrans.style.backgroundColor = "rgb(210,86,98)";
    } else {
      singleTrans.style.backgroundColor = "green";
    }

    singleTrans.innerHTML = "<div><img class=" + 'transaction-image' + " src=" + image + " alt=" + 'trans_img' + "><div class=" + 'transaction-merch-name' + ">" + merch + "</div><div class=" + 'transaction-price>' + allTransactions.transactions[i].amount / 100 + "</div></div>"
    document.getElementById('transactions-all').appendChild(singleTrans);

    if (allTransactions.transactions[i].created.slice(0, 10) == today) {
      document.getElementById('transactions-today').appendChild(singleTrans);
    }
  }
}
