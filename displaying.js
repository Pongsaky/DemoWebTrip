const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};
var map, directionsService, directionsRenderer
var script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBkfTgCYdhexRJrhDkuD92EUJBBFKFovq4&callback=initMap";
script.async = true;
// Attach your callback function to the `window` object
window.initMap = function() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 13.7563, lng: 100.5018},
    zoom: 11,
  });
  // JS API is loaded and available
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
  suppressMarkers: true // This option removes the default markers from the route
});
directionsRenderer.setMap(map);
};
// Append the 'script' element to 'head'
document.head.appendChild(script);
window.initMap = initMap;

var NewUrl = sessionStorage.getItem("NewUrl");
var Day = sessionStorage.getItem("Day");
var PalcePerDay = sessionStorage.getItem("PalcePerDay");
console.log(NewUrl);
display(NewUrl)

function display(NewUrl){
fetch(NewUrl, requestOptions)
    .then(response => response.json())
    .then(result => {
      // opennewtab()
      console.log(result);
      createPlaceBox(result)
      // appendData(result)
      // infoMarkers(result)
      // addWaypoints(result)
      // calculateRoute()

    })
    .catch(error => console.log('error', error));
    
    function createPlaceBox(result){
      console.log("fuction working");
      console.log(Day);
      for(let i=1 ; i <=Day ;i++){
        console.log(i);
        var boxPlace = document.createElement("div");
        boxPlace.className = `boxPlace`;
        boxPlace.id = `boxPlace${i}`;
        document.body.appendChild(boxPlace);

        var valButton = document.createElement("button");
        valButton.textContent =  `See Day${i} Plan!`;
        valButton.id = `valButton${i}`;
        valButton.className = "valButton";
        valButton.addEventListener("click", function(){
          console.log(result[i]);
          appendData(result[i])
        });
        boxPlace.appendChild(valButton);

        for(let j=0 ;j < PalcePerDay ;j++){
          console.log(j);
          console.log(result[i][j].name);
          var valText = document.createTextNode(`${result[i][j].name} \n`);
          var valSpan = document.createElement("span");
          valSpan.id = "valspan";
          valSpan.appendChild(valText);
          boxPlace.appendChild(valSpan);
        }
      }
    }

    function showMaker(){

    }

    function appendData(result){
      let loca=[];
      let markers =[];
      const mainContainer = document.getElementById("resultContainer");
      for(let i=0 ; i < Object.keys(result).length ; i++){
        console.log(result[i].geometry.lat,result[i].geometry.lon);
        loca[i]= new google.maps.LatLng(result[i].geometry.lat,result[i].geometry.lon);

        var marker = new google.maps.Marker({
          position: loca[i],
          map: map,
          title: result[i].name
        });
    
        if (i !== 0 && i !== Object.keys(result).length - 1) {
          // This condition ensures that only the markers that are not the origin or destination are added to the markers array
          markers.push(marker);
        }
    
        marker.addListener('click', function() {
  
          $("#myModal").modal();
          var title = '<h2>' + this.title + '</h2>';
          var content = '<p>Lat: ' + this.position.lat() + '</p>';
          content += '<p>Lng: ' + this.position.lng() + '</p>';
          
          document.getElementById('modal-title').innerHTML = title;
          document.getElementById('modal-body').innerHTML = content;
          
        });
    }
  }
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
  var waypoints = [];
  function addWaypoints(result) {
    for (var i = 1; i < Object.keys(result).length - 1; i++) {
      waypoints.push({
        location: loca[i],
        stopover: true
      });
    }
  }
  function calculateRoute() {
    directionsService.route({
      origin: loca[0],
      destination: loca[loca.length - 1],
      waypoints: waypoints,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
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
    });
  }
}