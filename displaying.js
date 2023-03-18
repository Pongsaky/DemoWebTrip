
var map, directionsService, directionsRenderer;
var script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyBkfTgCYdhexRJrhDkuD92EUJBBFKFovq4&callback=initMap";
script.async = true;

// Attach your callback function to the `window` object
initMap = function () {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 13.7563, lng: 100.5018 },
    zoom: 11,
  });
  // JS API is loaded and available
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true, // This option removes the default markers from the route
  });
  directionsRenderer.setMap(map);
};

// Append the 'script' element to 'head'
document.head.appendChild(script);
window.initMap = initMap;

var NewUrl = sessionStorage.getItem("NewUrl");
var Day = sessionStorage.getItem("Day");
var PalcePerDay = sessionStorage.getItem("PalcePerDay");
var StartDay = sessionStorage.getItem("StartDay");
var result = JSON.parse(sessionStorage.getItem("Result"));
console.log(NewUrl);
display();

var loca = [];
var markers = [];
var waypoints = [];

function display() {
  
  console.log(result);
  createPlaceBox(result);

  function createPlaceBox(result) {
    console.log("fuction working");
    console.log(Day);
    for (let i = 1; i <= Day; i++) {
      console.log(i);
      var boxPlace = document.createElement("div");
      boxPlace.className = `boxPlace`;
      boxPlace.id = `boxPlace${i}`;
      document.body.appendChild(boxPlace);

      var DateDisplaying = document.createElement("p");
      var date = new Date(StartDay);
      var dateString = millisecondsToDate(date); // call the function with the Date object
      DateDisplaying.textContent = dateString;
      DateDisplaying.className = "DateText";
      boxPlace.appendChild(DateDisplaying);

      var valButton = document.createElement("button");
      valButton.textContent = `See Day${i} Plan!`;
      valButton.id = `valButton${i}`;
      valButton.className = "valButton";
      //ButtonShowMarker
      valButton.addEventListener("click", function () {
        resetMap();
        // JS API is loaded and available
        ShowMakers(result[i]);
        // addWaypoints(result[i])
        calculateRoute(result[i]);
      });
      boxPlace.appendChild(valButton);

      for (let j = 0; j < PalcePerDay; j++) {
        var time = new Date(result[i][j].time.time_start);
        var timeString = millisecondsToTime(time); // call the function with the Date object
        console.log(timeString); // 00:00 Saturday 18/March/2023
        var valText = document.createTextNode(`${result[i][j].name} \n`);
        var valSpan = document.createElement("p");
        valSpan.id = "valspan";
        valSpan.appendChild(valText);
        boxPlace.appendChild(valSpan);
      }
    }
  }

  function ShowMakers(result) { 
    for (let i = 0; i < Object.keys(result).length; i++) {
      loca[i] = new google.maps.LatLng(
        result[i].geometry.lat,
        result[i].geometry.lon
      );

      var marker = new google.maps.Marker({
        position: loca[i],
        map: map,
        title: result[i].name,
        visible: true,
      });

      markers.push(marker);

      marker.addListener("click", function () {
        $("#myModal").modal();
        var title = "<h2>" + this.title + "</h2>";
        var content = "<p>Lat: " + this.position.lat() + "</p>";
        content += "<p>Lng: " + this.position.lng() + "</p>";

        document.getElementById("modal-title").innerHTML = title;
        document.getElementById("modal-body").innerHTML = content;
      });
      // waypoints.push({
      //     location: loca[i],
      //     stopover: true,
      // });
    }
  }
  // function addWaypoints(result) {
  //   for (let j = 0; j < waypoints.length; j++) {
  //     waypoints[j].setMap(null);
  //   }
  //   for (var i = 0; i <= Object.keys(result).length - 1; i++) {
  //     waypoints.push({
  //       location: loca[i],
  //       stopover: true
  //     });
  //   }
  // }

  function calculateRoute(result) {
    
    for (var i = 0; i <= Object.keys(result).length - 1; i++) {
      waypoints.push({
        location: loca[i],
        stopover: true,
      });
    }
    directionsService.route(
      {
        origin: loca[0],
        destination: loca[loca.length - 1],
        waypoints: waypoints,
        travelMode: "DRIVING",
      },
      function (response, status) {
        if (status === "OK") {
          directionsRenderer.setDirections(response);

          // This loop removes the markers that are part of the route
          var routeLegs = response.routes[0].legs;
          for (var i = 0; i < routeLegs.length; i++) {
            var routeSteps = routeLegs[i].steps;
            for (var j = 0; j < routeSteps.length; j++) {
              var routeMarkers = routeSteps[j].markers;
              if (routeMarkers) {
                for (var k = 0; k < routeMarkers.length; k++) {
                  routeMarkers[k].setMap(null);
                }
              }
            }
          }
        }
      }
    );
  }

  function resetMap() {
    // reset Markers
    for (let j = 0; j < markers.length; j++) {
      console.log("First ShowMakers loop is working.")
      markers[j].setMap(null);
    }
    // reset Way points
    waypoints = [];
  }

  function millisecondsToTime(time) {
    var hours = String(time.getHours()).padStart(2, "0");
    var minutes = String(time.getMinutes()).padStart(2, "0");
    var day = time.toLocaleString("en-US", { weekday: "long" });
    var month = time.toLocaleString("en-US", { month: "long" });
    var year = time.getFullYear();

    return hours + ":" + minutes;
  }

  function millisecondsToDate(date) {
    var hours = String(date.getHours()).padStart(2, "0");
    var minutes = String(date.getMinutes()).padStart(2, "0");
    var day = date.toLocaleString("en-US", { weekday: "long" });
    var month = date.toLocaleString("en-US", { month: "long" });
    var year = date.getFullYear();

    return day + " " + date.getDate() + " " + month + " " + year;
  }

  // Test the function with some examples
  // Output: 00:01.234
  //   for (let i = 0; i < markers.length; i++) {
  //     markers[i].setMap(map);
  //   }
  // }
  // function hideMarkers() {
  //   setMapOnAll(null);
  // }
  // function showMarkers() {
  //   setMapOnAll(map);
  // }
  // var markers = [];
  // function infoMarkers(result){
  //   for(let i=0 ; i < Object.keys(result).length ; i++){
  //     var marker = new google.maps.Marker({
  //       position: loca[i],
  //       map: map,
  //       title: result[i].name
  //     });

  //     if (i !== 0 && i !== Object.keys(result).length - 1) {
  //       // This condition ensures that only the markers that are not the origin or destination are added to the markers array
  //       markers.push(marker);
  //     }

  //     marker.addListener('click', function() {

  //       $("#myModal").modal();
  //       var title = '<h2>' + this.title + '</h2>';
  //       var content = '<p>Lat: ' + this.position.lat() + '</p>';
  //       content += '<p>Lng: ' + this.position.lng() + '</p>';

  //       document.getElementById('modal-title').innerHTML = title;
  //       document.getElementById('modal-body').innerHTML = content;
  //     });
  //   }
  // }
  // function opennewtab(){
  //   window.open('displaying.html','_blank');
  // }
  // function addWaypoints(result) {
  //   for (var i = 0; i <= Object.keys(result).length - 1; i++) {
  //     waypoints.push({
  //       location: loca[i],
  //       stopover: true
  //     });
  //   }
  // }
}
