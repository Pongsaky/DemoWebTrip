var requestOptions = {
  method: 'POST',
  redirect: 'follow',
  mode: 'no-cors'
};

function submitFunction(){
    //Displaying name value
    let name = document.getElementById("tripname").value;
    console.log(name);
    document.getElementById("outputname").innerHTML = name;
    
    //Displaying datevalue
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);
    const oneDay = 24 * 60 * 60 * 1000;

    let currentDate = new Date(startDate);
    const dates = [];

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setTime(currentDate.getTime() + oneDay);
    }

    const dateList = dates.map((date) => `<li>${date.toDateString()}</li>`).join("");
    document.getElementById("output").innerHTML = dateList;

    //Displaying style
    let selectedValueArt = document.querySelector('input[name="ratingArt"]:checked').value;
        document.getElementById("outputRatingArt").innerHTML = `Art ${selectedValueArt}`;

    let selectedValueHistory = document.querySelector('input[name="ratingHistory"]:checked').value;
        document.getElementById("outputRatingHistory").innerHTML = `History ${selectedValueHistory}`;
    
    let selectedValueNature = document.querySelector('input[name="ratingNature"]:checked').value;
        document.getElementById("outputRatingNature").innerHTML = `Nature ${selectedValueNature}`;

    let selectedValueShopping = document.querySelector('input[name="ratingShopping"]:checked').value;
        document.getElementById("outputRatingShopping").innerHTML = `Shopping ${selectedValueShopping}`;

    //TripDisplaying
    var url ='https://trip-recommendation.onrender.com/recommend/?art_level=1&history_level=2&nature_level=2&shopping_level=5&k=10';
    var params = new URLSearchParams(new URL(url).search);
    params.set('art_level',selectedValueArt);
    params.set('history_level',selectedValueHistory);
    params.set('nature_level',selectedValueNature);
    params.set('shopping_level',selectedValueShopping);
    params.set('k','3');
    var newUrl = "https://trip-recommendation.onrender.com/recommend/?" + params.toString();
    console.log(newUrl);

    fetch(newUrl, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      appendData(result);
    })
    .catch(error => console.log('error', error));

    function appendData(result){
      var mainContainer = document.getElementById("resultContainer");
      for (var i=0 ; i<=result.length;i++){
      var div = document.createElement('div');
      div.innerHTML = result[i];
      mainContainer.appendChild(div);
    }
  }
}

//Map dispalying

/*Firstly Show Bangkok
var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 13.7563, lng: 100.5018},
  zoom: 11
});

Variable for directions
var directionsService = new google.maps.DirectionsService();
var directionsRenderer = new google.maps.DirectionsRenderer({
  suppressMarkers: true // This option removes the default markers from the route
});
directionsRenderer.setMap(map);

//Setup the locations data class
var locations = [
  { lat: 13.7407, lng: 100.5502, name: 'Wat Arun' }, // Wat Arun
  { lat: 13.7539, lng: 100.5014, name: 'Grand Palace' }, // Grand Palace
  { lat: 13.7279, lng: 100.5247, name: 'Chatuchak Weekend Market' }  // Chatuchak Weekend Market
];

//add press markers
var markers = [];

function infoMarkers() {
  for (var i = 0; i < locations.length; i++) {
    var marker = new google.maps.Marker({
      position: locations[i],
      map: map,
      title: locations[i].name
    });

    if (i !== 0 && i !== locations.length - 1) {
      // This condition ensures that only the markers that are not the origin or destination are added to the markers array
      markers.push(marker);
    }

    marker.addListener('click', function() {
      var content = '<h2>' + this.title + '</h2>';
      content += '<p>Lat: ' + this.position.lat() + '</p>';
      content += '<p>Lng: ' + this.position.lng() + '</p>';

      document.getElementById('info').innerHTML = content;
    });
  }
}

//add waypoints
var waypoints = [];

function addWaypoints() {
  for (var i = 1; i < locations.length - 1; i++) {
    waypoints.push({
      location: locations[i],
      stopover: true
    });
  }
}

//make the directions
function calculateRoute() {
  addWaypoints();
  infoMarkers();
  ShowInfomationsBox ()

  directionsService.route({
    origin: locations[0],
    destination: locations[locations.length - 1],
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

function ShowInfomationsBox (){
  let box = document.getElementById('info');
  if(box.style.display === "none" || box.style.display == 0){
    box.style.display = "block"
  }
}
*/






