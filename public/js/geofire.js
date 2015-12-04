var firebaseRef = new Firebase("https://markerman.firebaseio.com/");
var geoFire = new GeoFire(firebaseRef);
var ref = geoFire.ref();


geoFire.set("some_key", [37.79, -122.41]).then(function() {
  console.log("Provided key has been added to GeoFire");
}, function(error) {
  console.log("Error: " + error);
});

geoFire.get("some_key").then(function(location) {
  if (location === null) {
    console.log("Provided key is not in GeoFire");
  }
  else {
    console.log("Provided key has a location of " + location);
  }
}, function(error) {
  console.log("Error: " + error);
});

geoFire.remove("some_key").then(function() {
  console.log("Provided key has been removed from GeoFire");
}, function(error) {
  console.log("Error: " + error);
});

var geoQuery = geoFire.query({
  center: [10.38, 2.41],
  radius: 10.5
});

var geoQuery = geoFire.query({
  center: [10.38, 2.41],
  radius: 10.5
});

var center = geoQuery.center();  // center === [10.38, 2.41]

var geoQuery = geoFire.query({
  center: [10.38, 2.41],
  radius: 10.5
});

var radius = geoQuery.radius();  // radius === 10.5
