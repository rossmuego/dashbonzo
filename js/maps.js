function initMap(allTrans) {
  var points = [];
  var currLat = 51.528801
  var currLon = -0.093241

  for (var i = 0; i < allTrans.transactions.length; i++) {
    if (allTrans.transactions[i].merchant != null) {
      points.push(new google.maps.LatLng(allTrans.transactions[i].merchant.address.latitude, allTrans.transactions[i].merchant.address.longitude))
    }
  }

  var currLocation = new google.maps.LatLng(currLat, currLon);

  map = new google.maps.Map(document.getElementById('map'), {
    center: currLocation,
    zoom: 13,
    mapTypeId: 'satellite'
  });

  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: points,
    radius: 20
  });
  heatmap.setMap(map);
}
