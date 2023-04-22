


var x = document.getElementById("location-data");
var lat;
var lon;

function getInfo() {
    myBtn.style.display = 'none';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
      }

 
    
}



function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  Longitude: " + position.coords.longitude;

    let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=4386c846bbd47488b31af77a40cd26b2`;
    //  let options = {
    //     method:"GET",
    //     body:JSON.stringify({
    //         Location: data.time
    //     })
    //  }


    fetch(url)
    .then((response) => {
       return response.json();
    })
    .then((data) => {
        var err = data.message;


        x.innerHTML += `
        </br>
        </br>
        <p>${err}</p>`;
        
    })
  }





 
var myBtn = document.getElementById('btn');
myBtn.addEventListener('click', getInfo);


//
