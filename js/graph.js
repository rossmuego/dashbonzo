var categories = [];
var transData = [];

function changeType(graphType) {
  window.myPie.destroy();
  generateGraph(graphType, categories, transData)
}

function loadChartData(allTrans, type) {

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
