function initMap() {
  var uluru = {
    lat: 55.3781,
    lng: 3.4360
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
}
