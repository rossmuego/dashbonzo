var categories = [];
var transData = [];
var rawTransData;
var balance;
var graphPots;

function changeType(graphType) {
  window.myPie.destroy();
  if (graphType == "line") {
    lineChart(rawTransData)
  } else {
    generateGraph(graphType, categories, transData)
  }
}

function loadChartData(allTrans, type, initBalance, initPots) {
  balance = initBalance.balance
  graphPots = initPots.pots;
  console.log(graphPots)
  rawTransData = allTrans;
  for (var i = 0; i < allTrans.transactions.length; i++) {
    if (categories.indexOf(allTrans.transactions[i].category) == -1 && allTrans.transactions[i].amount < 0) {
      categories.push(allTrans.transactions[i].category)
      transData.push(0)
    }
    if (categories.indexOf(allTrans.transactions[i].category) != -1 && allTrans.transactions[i].amount < 0 && allTrans.transactions[i].include_in_spending == true) {
      var value = allTrans.transactions[i].amount
      if (value < 0) {
        value *= -1;
        transData[categories.indexOf(allTrans.transactions[i].category)] += (value / 100)
      }
    }
  }
  generateGraph(type, categories, transData)
}

function generateGraph(type, labels, graphData) {
  var config = {
    type: type,
    data: {
      datasets: [{
        data: graphData,
        backgroundColor: [
          '#F44336',
          '#4CAF50',
          '#FF9800',
          '#E91E63',
          '#2196F3',
          '#9C27B0',
          '#00BCD4',
          '#FFEB3B'
        ]
      }],
      labels: labels
    },
    options: {
      responsive: true,
      legend: {
        position: 'right'
      }
    }
  };
  var ctx = document.getElementById("myChart").getContext("2d");
  window.myPie = new Chart(ctx, config);
}

function balanceHistory() {
  window.myPie.destroy()
  var dates = [];
  var balances = [];
  var CurrBalance = balance
  var today = new Date(Date.now()).toISOString();
  today = today.slice(0, 10);

  for (var i = 0; i < rawTransData.transactions.length; i++) {
    if (dates.indexOf(rawTransData.transactions[i].created.slice(0, 10)) == -1) {
      dates.push(rawTransData.transactions[i].created.slice(0, 10))
      balances.push(0)
    }
  }

  for (var i = rawTransData.transactions.length - 1; i >= 0; i--) {
    for (var j = 0; j < dates.length; j++) {
      if (rawTransData.transactions[i].created.slice(0, 10) == dates[j]) {
        CurrBalance -= rawTransData.transactions[i].amount
        balances[j] = CurrBalance / 100
      }
    }
  }

  var config = {
    type: "line",
    data: {
      labels: dates,
      datasets: [{
        label: "Balance",
        fill: false,
        data: balances,
        backgroundColor: '#E91E63',
        borderColor: '#E91E63'
      }]
    },
    options: {
      responsive: true,
      legend: {
        position: 'right'
      }
    }
  };
  var ctx = document.getElementById("myChart").getContext("2d");
  window.myPie = new Chart(ctx, config);
}

function potHistory() {

  window.myPie.destroy()
  var dates = [];
  var balances = [];
  var CurrBalance = graphPots[0].balance
  var today = new Date(Date.now()).toISOString().slice(0, 10);

  for (var i = 0; i < rawTransData.transactions.length; i++) {
    if (dates.indexOf(rawTransData.transactions[i].created.slice(0, 10)) == -1 && rawTransData.transactions[i].description.slice(0, 4) == "pot_") {
      dates.push(rawTransData.transactions[i].created.slice(0, 10))
      balances.push(0)
    }
  }

  dates.push(today);
  balances.push(CurrBalance / 100)

  for (var i = rawTransData.transactions.length - 1; i >= 0; i--) {
    for (var k = 0; k < dates.length; k++) {
      if (rawTransData.transactions[i].created.slice(0, 10) == dates[k]) {
        for (var j = 0; j < graphPots.length; j++) {
          if (graphPots[j].id == rawTransData.transactions[i].description) {
            console.log(rawTransData.transactions[i].amount)
            CurrBalance += rawTransData.transactions[i].amount
            balances[k] = CurrBalance / 100
          }
        }
      }
    }
  }

  var config = {
    type: "line",
    data: {
      labels: dates,
      datasets: [{
        label: graphPots[0].name,
        fill: false,
        data: balances,
        backgroundColor: '#FF9800',
        borderColor: '#FF9800'
      }]
    },
    options: {
      responsive: true,
      legend: {
        position: 'right'
      }
    }
  };
  var ctx = document.getElementById("myChart").getContext("2d");
  window.myPie = new Chart(ctx, config);
}
