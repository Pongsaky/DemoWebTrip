var requestOptions = {
    method: 'POST',
    redirect: 'follow',
    mode: 'no-cors'
  };
  
var url ='https://trip-recommendation.onrender.com/recommend/?art_level=1&history_level=2&nature_level=2&shopping_level=5&k=10';
    var params = new URLSearchParams(new URL(url).search);
    params.set('art_level',5);
    params.set('history_level',4);
    params.set('nature_level',2);
    params.set('shopping_level',1);
    params.set('k',3);
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