var x = document.getElementById("location-data");
var lat;
var lon;

function getInfo() {
  myBtn.style.display = "none";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    " Long: " +
    position.coords.longitude;
}

var myBtn = document.getElementById("btn");
myBtn.addEventListener("click", getInfo);

console.log(lat, lon);
//
