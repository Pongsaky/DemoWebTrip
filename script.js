function SpeedDisplaying(){
    const SpeedVal = document.querySelector("#SpeedDisplaying");
    const SpeedInput = document.querySelector("#SpeedRange");
    SpeedVal.textContent = SpeedInput?.value;
    if(SpeedVal.textContent == 1){
        document.getElementById('SpeedDisplaying').innerHTML = "Slow";
    }else if(SpeedVal.textContent == 3){
        document.getElementById('SpeedDisplaying').innerHTML = "Medium";
    }else if(SpeedVal.textContent == 5){
        document.getElementById('SpeedDisplaying').innerHTML = "Fast";
    }
}
function ValueDisplaying(id){
    // const Input = document.querySelector(`#${id}`);
    // var label = document.querySelector(`label[for="#${id}"]`);
    // console.log(label);
    // console.log(Input?.value);
    // var newdiv = document.createElement("div");
    // const newvalue = Input?.value;
    // newdiv.appendChild(newvalue);
    const Input = document.querySelector(`#${id}`);
    var label = document.querySelector(`label[for="${id}"]`);
    const LabelID = label.id;
    const val = Input?.value;
    document.getElementById( `${LabelID}`).innerHTML = val;
}
function submitFunction(){
    //Displaying name value
    let name = document.getElementById("tripname").value;
    console.log(name);
    document.getElementById("outputname").innerHTML = name;
    
    //Displaying datevalue
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);
    const oneDay = 24 * 60 * 60 * 1000;
    let startMilliTime = startDate.getTime()
    console.log(startMilliTime);
    let currentDate = new Date(startDate);
    const dates = [];

    var t = 0;
    while (currentDate <= endDate) {
        t++;
      dates.push(new Date(currentDate));
      currentDate.setTime(currentDate.getTime() + oneDay);
    }
    // document.getElementById("output").innerHTML = dateList;

    //Displaying style

    //Speed Value
    const SpeedInput = document.querySelector("#SpeedRange");
    const SpeedVal = SpeedInput?.value;

    //Art Value
    const ArtInput = document.querySelector("#ArtRange");
    const ArtVal = ArtInput?.value;

    //History Value
    const HistoryInput = document.querySelector("#HistoryRange");
    const HistoryVal = HistoryInput?.value;

    //Nature Value
    const NatureInput = document.querySelector("#NatureRange");
    const NatureVal = NatureInput?.value;

    //Shopping Value
    const ShoppingInput = document.querySelector("#ShoppingRange");
    const ShoppingVal = ShoppingInput?.value;
    // let selectedValueArt = document.querySelector('input[name="ratingArt"]:checked').value;
    //     document.getElementById("outputRatingArt").innerHTML = `Art ${selectedValueArt}`;

    // let selectedValueHistory = document.querySelector('input[name="ratingHistory"]:checked').value;
    //     document.getElementById("outputRatingHistory").innerHTML = `History ${selectedValueHistory}`;
    
    // let selectedValueNature = document.querySelector('input[name="ratingNature"]:checked').value;
    //     document.getElementById("outputRatingNature").innerHTML = `Nature ${selectedValueNature}`;

    // let selectedValueShopping = document.querySelector('input[name="ratingShopping"]:checked').value;
    //     document.getElementById("outputRatingShopping").innerHTML = `Shopping ${selectedValueShopping}`;

    //TripDisplaying ${params.toString()}
    const url ='https://trip-recommendation.onrender.com/get_planning/?art_level=2&history_level=1&nature_level=3&shopping_level=2&milli_start_time=1678939200000&placePerDay=2&day=4&timePerDay=9';
    const params = new URLSearchParams(new URL(url).search);
    params.set('art_level',ArtVal);
    params.set('history_level',HistoryVal);
    params.set('nature_level',NatureVal);
    params.set('shopping_level',ShoppingVal);
    params.set('placePerDay',SpeedVal);
    params.set('day',t);
    params.set('milli_start_time',startMilliTime);
    newUrl = `https://trip-recommendation.onrender.com/get_planning/?${params.toString()}`;
    console.log(newUrl);

    const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

    fetch(newUrl, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        sessionStorage.setItem("Result", JSON.stringify(result));
    })
    .catch((error) => console.log("error", error));

    sessionStorage.setItem("NewUrl",newUrl);
    sessionStorage.setItem("Day",t);
    sessionStorage.setItem("PalcePerDay",SpeedVal);
    sessionStorage.setItem("StartDay",startMilliTime);
    window.open('displaying.html','_blank')
  } 

//     fetch(newUrl, requestOptions)
//     .then(response => response.json())
//     .then(result => {
//       opennewtab()
//       console.log(result);
//       appendData(result)
//       infoMarkers(result)
//       addWaypoints(result)
//       calculateRoute()
//       ShowInfomationsBox()
//     })
//     .catch(error => console.log('error', error));
    
//     var loca =[];
//     function appendData(result){
//       const mainContainer = document.getElementById("resultContainer");
//       for(let i=0 ; i < Object.keys(result).length ; i++){
//         loca[i]= new google.maps.LatLng(result[i].geometry.lat,result[i].geometry.lon);
//         // let div = document.createElement('div');
//         // div.innerHTML = `${result[i].name} - ${result[i].geometry.lat} - ${result[i].geometry.lon}`;
//         // mainContainer.appendChild(div);
//         // console.log[loca[i]];
//     }
//   }
//   var markers = [];
//   function infoMarkers(result){
//     for(let i=0 ; i < Object.keys(result).length ; i++){
//       var marker = new google.maps.Marker({
//         //{lat: 13.7407, lng: 100.5502, name: 'Wat Arun'}
//         position: loca[i],
//         map: map,
//         title: result[i].name
//       });
  
//       if (i !== 0 && i !== Object.keys(result).length - 1) {
//         // This condition ensures that only the markers that are not the origin or destination are added to the markers array
//         markers.push(marker);
//       }
  
//       marker.addListener('click', function() {
//         var content = '<h2>' + this.title + '</h2>';
//         content += '<p>Lat: ' + this.position.lat() + '</p>';
//         content += '<p>Lng: ' + this.position.lng() + '</p>';
  
//         document.getElementById('info').innerHTML = content;
//       });
//     }
//   }
//   function opennewtab(){
//     window.open('displaying.html','_blank');
//   }
//   var waypoints = [];

//   function addWaypoints(result) {
//     for (var i = 1; i < Object.keys(result).length - 1; i++) {
//       waypoints.push({
//         location: loca[i],
//         stopover: true
//       });
//     }
//   }
//   function calculateRoute() {
//     directionsService.route({
//       origin: loca[0],
//       destination: loca[loca.length - 1],
//       waypoints: waypoints,
//       travelMode: 'DRIVING'
//     }, function(response, status) {
//       if (status === 'OK') {
//         directionsRenderer.setDirections(response);
  
//         // This loop removes the markers that are part of the route
//         var routeLegs = response.routes[0].legs;
//         for (var i = 0; i < routeLegs.length; i++) {
//           var routeSteps = routeLegs[i].steps;
//           for (var j = 0; j < routeSteps.length; j++) {
//             var routeMarkers = routeSteps[j].markers;
//             if (routeMarkers) {
//               for (var k = 0; k < routeMarkers.length; k++) {
//                 routeMarkers[k].setMap(null);
//               }
//             }
//           }
//         }
//       }
//     });
//   }
//   function ShowInfomationsBox (){
//     let box = document.getElementById('info');
//     if(box.style.display === "none" || box.style.display == 0){
//       box.style.display = "block"
//     }
//   }
// }

//Variable for directions

//Setup the locations data class
// var locations = [
//   { lat: 13.7407, lng: 100.5502, name: 'Wat Arun' }, // Wat Arun
//   { lat: 13.7539, lng: 100.5014, name: 'Grand Palace' }, // Grand Palace
//   { lat: 13.7279, lng: 100.5247, name: 'Chatuchak Weekend Market' }  // Chatuchak Weekend Market
// ];
// //add press markers
// var markers = [];
// function infoMarkers() {
//   for (var i = 0; i < locations.length; i++) {
//     console.log(locations[i]);
//     var marker = new google.maps.Marker({
//       position: locations[i],
//       map: map,
//       title: locations[i].name
//     });

//     if (i !== 0 && i !== locations.length - 1) {
//       // This condition ensures that only the markers that are not the origin or destination are added to the markers array
//       markers.push(marker);
//     }

//     marker.addListener('click', function() {
//       var content = '<h2>' + this.title + '</h2>';
//       content += '<p>Lat: ' + this.position.lat() + '</p>';
//       content += '<p>Lng: ' + this.position.lng() + '</p>';

//       document.getElementById('info').innerHTML = content;
//     });
//   }
// }

//add waypoints
// var waypoints = [];

// function addWaypoints() {
//   for (var i = 1; i < locations.length - 1; i++) {
//     waypoints.push({
//       location: locations[i],
//       stopover: true
//     });
//   }
// }

//make the directions
// function calculateRoute() {
//   addWaypoints();
//   infoMarkers();
//   ShowInfomationsBox ()

//   directionsService.route({
//     origin: locations[0],
//     destination: locations[locations.length - 1],
//     waypoints: waypoints,
//     travelMode: 'DRIVING'
//   }, function(response, status) {
//     if (status === 'OK') {
//       directionsRenderer.setDirections(response);

//       // This loop removes the markers that are part of the route
//       var routeLegs = response.routes[0].legs;
//       for (var i = 0; i < routeLegs.length; i++) {
//         var routeSteps = routeLegs[i].steps;
//         for (var j = 0; j < routeSteps.length; j++) {
//           var routeMarkers = routeSteps[j].markers;
//           if (routeMarkers) {
//             for (var k = 0; k < routeMarkers.length; k++) {
//               routeMarkers[k].setMap(null);
//             }
//           }
//         }
//       }
//     }
//   });
// }

// function ShowInfomationsBox (){
//   let box = document.getElementById('info');
//   if(box.style.display === "none" || box.style.display == 0){
//     box.style.display = "block"
//   }
// }