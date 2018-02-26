function init() {
  try {
    AccessToken = prompt("Enter Access Token");
    var accounts = getAccounts();
    var transactions = getTransactions(accounts);
    var pots = getPots()
    loadChartData(transactions, "pie", getBalance(accounts));
    displayAllTrans(transactions, pots)
    initMap(transactions)
    loadAccountData(accounts, transactions, pots)
  } catch (e) {
    alert("Invalid Token")
    //location.reload()
    console.log(e)
  }
}

function displayAllTrans(allTransactions, pots) {
  var today = new Date(Date.now()).toISOString();
  today = today.slice(0, 10);

  for (var i = allTransactions.transactions.length - 1; i >= 0; i--) {
    if (allTransactions.transactions[i].merchant == null) {
      if ((allTransactions.transactions[i].description.slice(0, 4)) == "pot_") {
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
      singleTrans.style.backgroundColor = "#F44336";
    } else {
      singleTrans.style.backgroundColor = "#4CAF50";
    }

    if (allTransactions.transactions[i].amount < 0) {
      value = allTransactions.transactions[i].amount * -1
    } else {
      value = allTransactions.transactions[i].amount
    }

    singleTrans.innerHTML = "<img class=" + 'transaction-image' + " src=" + image + " alt=" + 'trans_img' + "><div class=" + 'transaction-merch-name' + ">" + merch + "</div><div class=" + 'transaction-price>£' + value / 100 + "</div>"
    document.getElementById('transactions-all').appendChild(singleTrans);

    if (allTransactions.transactions[i].created.slice(0, 10) == today) {
      document.getElementById('transactions-today').appendChild(singleTrans);
    }
  }
}

function loadAccountData(accounts, allTransactions, pots) {
  var balance = getBalance(accounts);
  var totalIn = 0;
  var totalOut = 0;

  document.getElementById('account-balance').innerHTML = "£" + balance.balance / 100;
  document.getElementById('sort-code').innerHTML = accounts.accounts[0].sort_code;
  document.getElementById('account-name').innerHTML = accounts.accounts[0].description;
  document.getElementById('account-number').innerHTML = accounts.accounts[0].account_number;

  for (var i = 0; i < allTransactions.transactions.length; i++) {
    if (allTransactions.transactions[i].amount > 0) {
      totalIn += allTransactions.transactions[i].amount
    } else if (allTransactions.transactions[i].amount < 0) {
      totalOut += (allTransactions.transactions[i].amount) * -1
    }
  }

  document.getElementById('total-in').innerHTML = "£" + totalIn / 100;
  document.getElementById('total-out').innerHTML = "£" + totalOut / 100;
  document.getElementById('net-balance').innerHTML = "£" + (totalIn - totalOut) / 100;
  document.getElementById('total-transactions').innerHTML = allTransactions.transactions.length - 1

  if (pots.pots.length == 0) {
    var potDesc = document.createElement('div')
    potDesc.innerHTML = "<h3>No Pots</h3>"
    document.getElementById('pots-list').appendChild(potDesc);
  } else {
    for (var i = 0; i < pots.pots.length; i++) {
      var potDesc = document.createElement('div')
      potDesc.id = pots.pots[i].id
      potDesc.innerHTML = "<h3>" + pots.pots[i].name + "</h3><div>£" + pots.pots[i].balance / 100 + "</div>"
      document.getElementById('pots-list').appendChild(potDesc);
    }
  }

}
