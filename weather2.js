
// var getUserRepos = function(user) {
    
//     var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
//     // make a request to the url
//     fetch(apiUrl).then(function(response) {
//       response.json().then(function(data) {
//         console.log(data);
//       });
//     });
//   };
// getUserRepos();

var weatherContainerEl = document.querySelector("#weather-container");
var citySearchTerm = document.querySelector("#city-search-term");
var userFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#city");

var formSubmitHandler = function(event) {
  event.preventDefault();
// get value from input element
var city = nameInputEl.value.trim();

if (city) {
  getCityWeather(city);
  nameInputEl.value = "";
} else {
  alert("Oops! My bad!");
}
  console.log(event);
};


var getCityWeather = function(city) {
    
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5b33eff3ff13a94af4b4710b78cc83bc";
    
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);



        });
      });
    };
    getCityWeather();
    
    var displayWeather = function(city, searchTerm) {
      console.log(city);
      console.log(searchTerm);
      response.json().then(function(city) {
        displayWeather(city);

        // clear old content
weatherContainerEl.textContent = "";
citySearchTerm.textContent = searchTerm;

// create a status element
var statusEl = document.createElement("span");
statusEl.classList = "flex-row align-center";

// check if current repo has issues or not
if (city[i].open_issues_count > 0) {
  statusEl.innerHTML =
    "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
} else {
  statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
}

// append to container
repoEl.appendChild(statusEl);

  // append container to the dom
  repoContainerEl.appendChild(repoEl);
}
      });
    };
    
    //.then(function(response) {
//         response.json().then(function(data) {
//           console.log(data);
//         });
//       });
//     };
//   getCityWeather();

  //"http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5b33eff3ff13a94af4b4710b78cc83bc