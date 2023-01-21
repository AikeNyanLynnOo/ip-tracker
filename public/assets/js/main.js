var search = document.getElementById("btnSearch");
var toast = document.getElementById("myToast");
var toastMsg = document.getElementById("toastMessage");
var toastClose = document.getElementById("toastClose");

var inputField = document.getElementById("inputField");

var ip = document.getElementById("ip");
var loc = document.getElementById("loc");
var tz = document.getElementById("tz");
var isp = document.getElementById("isp");

var downUp = document.getElementById("downUp");
var els = document.getElementsByClassName("data-gp");

toast.style.display = "none";

downUp.addEventListener("click", () => {
  if (downUp.className === "fa fa-chevron-up") {
    downUp.className = "fa fa-chevron-down";
    for (var i = 0; i < els.length; i++) {
      els[i].style.display = "none";
    }
  } else {
    downUp.className = "fa fa-chevron-up";
    for (var i = 0; i < els.length; i++) {
      els[i].style.display = "block";
    }
  }
});

toastClose.addEventListener("click", () => {
  toast.style.display = "none";
});

search.addEventListener("click", () => {
  toast.style.display = "none";
  var input = inputField.value;

  fetch("/.netlify/functions/fetch-api?input=" + input)
    .then((data) => data.json())
    .then((data) => {
      if (data.notFound) {
        toast.style.display = "flex";
        toastMsg.innerHTML = "Unavailable! Now showing your default location";
        inputField.value = data.ip;
      }
      setMap(data.location.lat, data.location.lng);
      setData(data);
    });
});

function setMap(lat, lng) {
  $("#map").detach();
  $(".map").append("<div id='map'></div>");
  var mymap = L.map("map", {
    center: [lat, lng],
    zoom: 13,
  });

  L.marker([lat, lng]).addTo(mymap);
  L.circle([lat, lng], {
    color: "#ddd",
    fillColor: "#000",
    fillOpacity: 0.2,
    radius: 600,
  }).addTo(mymap);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(mymap);
}

function setData(data) {
  ip.innerText = data.ip;
  loc.innerText = data.location.country + "," + data.location.city;
  tz.innerText = "UTC " + data.location.timezone;
  isp.innerText = data.isp;
}
