$(document).ready(init)
	// var key = process.env.GOOGLE_MAP
	var key = 'AIzaSyAhtt7bs2IHD30b3q7qRpMqtyHGgPrGbog'
	// var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	// var labelIndex = 0;
function init(){
// $('#find').click(getlocation)
$('#direct').click(getlocation)
var styles = [ [{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"weight":1}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"weight":0.8}]},{"featureType":"landscape","stylers":[{"color":"#ffffff"}]},{"featureType":"water","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"elementType":"labels.text","stylers":[{"visibility":"on"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},{"elementType":"labels.icon","stylers":[{"visibility":"on"}]}] ]
}

	function initMap() {
		var markerArray = [];
		var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6,
		// styles: styles

  });
	var directionsDisplay = new google.maps.DirectionsRenderer({map: map});

	var stepDisplay = new google.maps.InfoWindow;
	calculateAndDisplayRoute(
		 directionsDisplay, directionsService, markerArray, stepDisplay, map);
 // Listen to change events from the start and end lists.
 var onChangeHandler = function() {
	 calculateAndDisplayRoute(
			 directionsDisplay, directionsService, markerArray, stepDisplay, map);
 };
 document.getElementById('start').addEventListener('change', onChangeHandler);
 document.getElementById('end').addEventListener('change', onChangeHandler);

  var infoWindow = new google.maps.InfoWindow({map: map});

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
	google.maps.event.addListener(map, 'click', function(event) {
		addMarker(event.latLng, map);
	});
}
function calculateAndDisplayRoute(directionsDisplay, directionsService,
    markerArray, stepDisplay, map) {
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {

    if (status === google.maps.DirectionsStatus.OK) {
      document.getElementById('warnings-panel').innerHTML =
          '<b>' + response.routes[0].warnings + '</b>';
      directionsDisplay.setDirections(response);
      showSteps(response, markerArray, stepDisplay, map);
    } else {
      // window.alert('Directions request failed due to ' + status);
    }
  });
}

function showSteps(directionResult, markerArray, stepDisplay, map) {
  var myRoute = directionResult.routes[0].legs[0];
  for (var i = 0; i < myRoute.steps.length; i++) {
    var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
    marker.setMap(map);
    marker.setPosition(myRoute.steps[i].start_location);
    attachInstructionText(
        stepDisplay, marker, myRoute.steps[i].instructions, map);
  }
}

function attachInstructionText(stepDisplay, marker, text, map) {
  google.maps.event.addListener(marker, 'click', function() {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
  'Error: The Geolocation service failed.' :
  'Error: Your browser doesn\'t support geolocation.');
}


function getlocation (req, res){
	console.log("Location")
	var local = $('#location').val()
	console.log(local)
	$.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + local + '&key=' + key)
	.done(function(data){
		console.log(data)
		 map = new google.maps.Map(document.getElementById('map'), {
			center: data.results[0].geometry.location,
			zoom: 15
		});

  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });

	})
}
function addMarker(location, map) {

  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
		var infowindow = new google.maps.InfoWindow({
    content: $('#place').val(),
		draggable: true,
  });

	marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
	var latLng = marker.getPosition().lat() + ',' + marker.getPosition().lng();
	// var lng = marker.getPosition().lng();
	// var latlng =  evt.latLng.lat().toFixed(3) + ',' + evt.latLng.lng().toFixed(3)
		console.log(latLng);
		$.get('https://maps.googleapis.com/maps/api/geocode/json?' + 'latlng=' + latLng + '&key=' + key)
		.done(function(data){
			console.log(data.results[0].formatted_address)
			$('#start').append( '<option>' + data.results[0].formatted_address + '</option>')
			$('#end').append( '<option>' + data.results[0].formatted_address + '</option>')
	console.log(latLng)
	// google.maps.event.addListener(marker, 'click', function (evt) {
	// 	var latlng =  evt.latLng.lat().toFixed(3) + ',' + evt.latLng.lng().toFixed(3)
	// 	console.log(latlng);
	// 	$.get('https://maps.googleapis.com/maps/api/geocode/json?' + 'latlng=' + latlng + '&key=' + key)
	// 	.done(function(data){
	// 		console.log(data.results[0].formatted_address)
	// 		$('#start').append( '<option>' + data.results[0].formatted_address + '</option>')
	// 		$('#end').append( '<option>' + data.results[0].formatted_address + '</option>')
	// 	})
// 	google.maps.event(marker, 'click', function (evt) {
// 		var latlng =  evt.latLng.lat().toFixed(3) + ',' + evt.latLng.lng().toFixed(3)
// 		console.log(latlng);
// 		$.get('https://maps.googleapis.com/maps/api/geocode/json?' + 'latlng=' + latlng + '&key=' + key)
// 		.done(function(data){
// 			console.log(data.results[0].formatted_address)
// 			$('#start').append( '<option>' + data.results[0].formatted_address + '</option>')
// 			$('#end').append( '<option>' + data.results[0].formatted_address + '</option>')
// 		})
// });
})
}
