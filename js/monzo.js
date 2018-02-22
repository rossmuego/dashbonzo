var AccessToken;

function init() {

  AccessToken = prompt("Enter Access Token");
  var accounts = getAccounts();
  var transactions = getTransactions(accounts);
  var balance = getBalance(accounts);
  document.getElementById('account-balance').innerHTML = "£" + balance.balance / 100;

  for (var i = transactions.transactions.length - 1; i >= 0; i--) {
    if (transactions.transactions[i].merchant == null) {
      if ((transactions.transactions[i].description.slice(0, 4)) == "pot_") {
        var pots = getPots()
        for (var j = 0; j < pots.pots.length; j++) {
          if (pots.pots[j].id == transactions.transactions[i].description) {
            merch = pots.pots[j].name
            image = "img/bag-money.jpg"
          }
        }
      } else {
        merch = transactions.transactions[i].description;
        image = "img/default-avatar.png"
      }
    } else {
      merch = transactions.transactions[i].merchant.name;
      image = transactions.transactions[i].merchant.logo;
    }

    var singleTrans = document.createElement('div')
    singleTrans.id = transactions.transactions[i].id
    singleTrans.className = "transaction";

    if (parseInt((transactions.transactions[i].amount)) < 0) {
      singleTrans.style.backgroundColor = "red";
    } else {
      singleTrans.style.backgroundColor = "green";
    }
    singleTrans.innerHTML = "<div><img class=" + 'transaction-image' + " src=" + image + " alt=" + 'trans_img' + "><div class=" + 'transaction-merch-name' + ">" + merch + "</div><div class=" + 'transaction-price>' + transactions.transactions[i].amount / 100 + "</div></div>"
    document.getElementById('transactions-all').appendChild(singleTrans);
  }

  var today = new Date(Date.now()).toISOString();
  today = today.slice(0, 10);

  for (var i = transactions.transactions.length - 1; i >= 0; i--) {
    if (transactions.transactions[i].created.slice(0, 10) == today) {
      if (transactions.transactions[i].merchant == null) {
        merch = "N/A"
      } else {
        merch = transactions.transactions[i].merchant.name;
        image = transactions.transactions[i].merchant.logo;
      }

      var singleTrans = document.createElement('div')
      singleTrans.id = transactions.transactions[i].id
      singleTrans.className = "transaction";

      if (parseInt((transactions.transactions[i].amount)) < 0) {
        singleTrans.style.backgroundColor = "red";
      } else {
        singleTrans.style.backgroundColor = "green";
      }
      singleTrans.innerHTML = "<div><img class=" + 'transaction-image' + " src=" + image + " alt=" + 'trans_img' + "><div class=" + 'transaction-merch-name' + ">" + merch + "</div><div class=" + 'transaction-price>' + transactions.transactions[i].amount / 100 + "</div></div>"
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
