async function getIpFromAPI() {
  document.getElementById("loader-container").style.display = "flex";
  console.log("Fetching Data...");

  try {
    const response = await fetch("https://api.ipify.org?format=json");
    var data = await response.json();
    localStorage.setItem("IP", JSON.stringify(data.ip));
    alert("IP Added to Local Storage");
    if (data) {
      console.log("IP", data.ip);
      getGeoFromAPI(data.ip);
    }
  } catch (e) {
    console.log("Error--", e);
  }
}

async function getGeoFromAPI(iP) {
  try {
    const response = await fetch(`https://ipinfo.io/${iP}?token=4b5ee51896ec8c`);
    var data = await response.json();
    localStorage.setItem("Geo", JSON.stringify(data));
    alert("Geo Added to Local Storage");
    if (data) {
      getPinFromAPI();
      console.log("Geo", data);
    }
  } catch (e) {
    console.log("Error in Fetching IP Info--");
    console.log("Error--", e);
    alert(e);
  }
}

async function getPinFromAPI() {
  var geo = JSON.parse(localStorage.getItem("Geo"));
  try {
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${geo.postal}`
    );
    var data = await response.json();
    localStorage.setItem("Message", JSON.stringify(data[0].Message));
    localStorage.setItem("PO", JSON.stringify(data[0].PostOffice));
    alert("Post Added to Local Storage");
    if (data) {
      console.log("Postal:", data[0].PostOffice);
      document.getElementById("loader-container").style.display = "none";
    }
  } catch (e) {
    console.log("Error in Fetching PostOffice Info--");
    console.log("Error--", e);
  }
}

if (localStorage.getItem("IP")) {
  var iP = JSON.parse(localStorage.getItem("IP"));
  console.log("IP here:", iP);
} else {
  getIpFromAPI();
}

//-------------------------------------------------------------

var gps = document.getElementById("gps");
var map = document.getElementById("map");
var date_time = document.getElementById("date-time");
var poffices = document.getElementById("post-offices");

function getInfo() {
  myBtn.style.display = "none";
  document.getElementById("main-container").style.display = "flex";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var msg = JSON.parse(localStorage.getItem("Message"));
  var po = JSON.parse(localStorage.getItem("PO"));
  var geo = JSON.parse(localStorage.getItem("Geo"));
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  gps.innerHTML = `
                  <div class="line-1">
                  <div class ="gps-info"><strong>Lat: </strong>${lat}</div>
                  <div class ="gps-info"><strong>Long: </strong>${lon}</div>
                  </div>
  
                  <div class = "line-2">
                  <div class ="gps-info"><strong>City: </strong>${geo.city}</div>
                  <div class ="gps-info"><strong>Region: </strong>${geo.region}</div>
                  
                  </div>
                  
                  <div class = "line-2">
                  <div class ="gps-info"><strong>Organisation: </strong>${geo.org}</div>
                  <div class ="gps-info"><strong>Hostname: </strong>${geo.ip}</div>
                  </div>
   `;

  map.innerHTML = `
    <iframe src="https://maps.google.com/maps?q=${lat},${lon}&&output=embed" width="1600" height="600" frameborder="0" style="border:0"></iframe>
  
   `;

  date_time.innerHTML = `
                      <div class = "td-info"><strong>Time Zone: </strong>${
                        geo.timezone
                      }</div>
                      <div class = "td-info"><strong>Date and Time: </strong>${new Date().toLocaleString(
                        "en-US",
                        { timeZone: `${geo.timezone}` }
                      )}</div>
                      <div class = "td-info"><strong>Pincode: </strong>${
                        geo.postal
                      }</div>
                      <div class = "td-info"><strong>Message:</strong>${msg}</div>
  
   `;

  showPO(po);
  //   console.log(po);
}

//---------------
function showPO(arr) {
  let innerHTML = "";
  arr.forEach((office) => {
    innerHTML += `
                                              <div class="po-box">
                                              <div>Name: ${office.Name}</div>
                                              <div>Branch Type: ${office.BranchType}</div>
                                              <div>Delievery Status: ${office.DeliveryStatus}</div>
                                              <div>District: ${office.District}</div>
                                              <div>Division: ${office.Division}</div>
                                              </div>
                              `;
  });
  poffices.innerHTML = innerHTML;
}

//-----------

var myBtn = document.getElementById("get-data");
myBtn.addEventListener("click", getInfo);

var inpt;
//----------
function find(obj) {
  //   console.log("Obj:", obj);
  var objStr = JSON.stringify(obj);
  if (
    objStr
      .toLowerCase()
      .includes(document.getElementById("search").value.toLowerCase().trim())
  ) {
    return obj;
  }
}
//--------------
document.getElementById("search").addEventListener("input", (ev) => {
  ev.preventDefault();

  var po = JSON.parse(localStorage.getItem("PO"));

  var newArr = po.filter(find);

  console.log(newArr);
  showPO(newArr);
});
