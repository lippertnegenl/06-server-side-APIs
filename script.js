var repoList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');
var searchButton = document.getElementById("search-city");
function getApi(city) {
  // replace `octocat` with anyone else's GitHub username
  // var requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
  var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=01a7731bc0e4026ac3c24dbe79164be9&units=imperial`
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      htmlCards = ""
      for (var i = 0; i < data.list.length; i = i + 8) {
        htmlCards += `
      <div class="card" style="width: 18rem;">
      <div class="card-body">
      <h5 class="card-title">${data.list[i].dt_txt}</h5>
      <p class="card-text">Description: ${data.list[i].weather[0].description}</p>
      <p class="card-text">Humidity: ${data.list[i].main.humidity}</p>
      <p class="card-text">Temperature: ${data.list[i].main.temp}
      <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" class="card-img-top" alt="...">
    </p>
    <p class="card-text">Wind Speed: ${data.list[i].weather[0].description}</p>
  
  </div>
</div>
      `
      }
        document.getElementById("city-name").textContent =city // data.name
        document.getElementById("5-day").innerHTML = htmlCards
      
    });
}


searchButton.addEventListener('click', function (event) {
  event.preventDefault()
  var city = document.getElementById("cityName").value
  var previousSearch = JSON.parse(localStorage.getItem("weatherDashboard")) || []
  previousSearch.push(city)
  localStorage.setItem("weatherDashboard", JSON.stringify(previousSearch))
  getApi(city)
});