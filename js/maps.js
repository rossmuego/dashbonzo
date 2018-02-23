function initMap(allTrans) {
  var points = [];
  var currLat = 51.528801
  var currLon = -0.093241

  for (var i = 0; i < allTrans.transactions.length; i++) {
    if (allTrans.transactions[i].merchant != null) {
      points.push(new google.maps.LatLng(allTrans.transactions[i].merchant.address.latitude, allTrans.transactions[i].merchant.address.longitude))
    }
  }

  /* Data points defined as an array of LatLng objects */
  var heatmapData = [
    new google.maps.LatLng(37.782, -122.447),
    new google.maps.LatLng(37.782, -122.445),
    new google.maps.LatLng(37.782, -122.443),
    new google.maps.LatLng(37.782, -122.441),
    new google.maps.LatLng(37.782, -122.439),
    new google.maps.LatLng(37.782, -122.437),
    new google.maps.LatLng(37.782, -122.435),
    new google.maps.LatLng(37.785, -122.447),
    new google.maps.LatLng(37.785, -122.445),
    new google.maps.LatLng(37.785, -122.443),
    new google.maps.LatLng(37.785, -122.441),
    new google.maps.LatLng(37.785, -122.439),
    new google.maps.LatLng(37.785, -122.437),
    new google.maps.LatLng(37.785, -122.435)
  ];

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
