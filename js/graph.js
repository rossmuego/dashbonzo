function loadChart(allTrans) {
  var categories = [];
  var transData = [];

  for (var i = 0; i < allTrans.transactions.length; i++) {
    if (categories.indexOf(allTrans.transactions[i].category) == -1) {
      categories.push(allTrans.transactions[i].category)
      transData.push(0)
    }
    if (categories.indexOf(allTrans.transactions[i].category) != -1) {
      var value = (allTrans.transactions[i].amount).toFixed(2)
      if (value < 0) {
        value *= -1;
        transData[categories.indexOf(allTrans.transactions[i].category)] += (value / 100)
      }
    }
  }

  var ctx = document.getElementById("myChart");
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      datasets: [{
        data: transData,
        backgroundColor: [
          'Red',
          'Blue',
          'Pink',
          'Green',
          'Yellow',
          'Orange',
          'Cyan',
          'Purple'
        ]
      }],
      labels: categories
    }
  });
}
