// var weatherContainerEl = document.querySelector("#weather-container");
// var citySearchTerm = document.querySelector("#city-search-term");
// var cityFormEl = document.querySelector("#city-form");
// var nameInputEl = document.querySelector("#city");
let fiveDay = document.getElementById("card-text");
 
function getSearchVal(){
  console.log("working");
  var searchValue = document.querySelector("#city").value;
  searchWeather(searchValue);
  makeRow(searchValue);
};

// take value and place into hsitory or list on the left side
function makeRow(searchValue) {

  var liEl = document.createElement("li")
  liEl.classList.add("list-group-item", "list-group-item-action");

  var text = searchValue;
  liEl.textContent = text;
  var historyEl = document.querySelector('.history');
  historyEl.onClick = function() {
    if(target.tagName == "LI") {
      searchWeather(target.textContent)
    }
  }
  historyEl.appendChild(liEl);
};

// using the openweathermap api to print out the weather portion at the top right
function searchWeather(searchValue) {
  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=5b33eff3ff13a94af4b4710b78cc83bc&units=imperial").then(function(response){
    return response.json();
  }).then(function(data) {
    console.log(data);


   // create html content for current weather (adding date and city info as well)
              var titleEl = document.createElement("h3");
              titleEl.classList.add("card-title");
              titleEl.textContent = data.name + " (" + new Date().toLocaleDateString() + " )"

              var cardEl = document.createElement("div");
              cardEl.classList.add("card");

              var windEl = document.createElement("p");
              windEl.classList.add("card-text");

              var humidEl = document.createElement("p");
              humidEl.classList.add("card-text");

              var tempEl = document.createElement("p");
              tempEl.classList.add("card-text");

              humidEl.textContent = "Humidity" + data.main.humidity + " % ";
              tempEl.textContent = "Temperature: " + data.main.temp + " F ";

              var cardBodyEl = document.createElement("div");
              cardBodyEl.classList.add("card-bodi");

              var imgEl = document.createElement("img");
              imgEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")

              titleEl.appendChild(imgEl);
              cardBodyEl.appendChild(titleEl);
              cardBodyEl.appendChild(tempEl);
              cardBodyEl.appendChild(humidEl);
              cardBodyEl.appendChild(windEl);
              cardEl.appendChild(cardBodyEl);

$("#weather-container").append(cardEl);
getFiveDay(searchValue);
getUVIndex(data.coord.lat, data.coord.lon);

 
  });

};

// to get the forecast (5 day forecast) using the 5 day API 
function getFiveDay(searchValue) {
  fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=5b33eff3ff13a94af4b4710b78cc83bc&units=imperial")
    .then(function(response) {
      return response.json()
        .then(function(data) {
          console.log(data);
          displayDays(data);
        })
    });
  function displayDays(data) {
    console.log(data);
    for (let i = 0; i < data.list.length; i++) {
      if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
        var d = data.list[i].dt_txt;
        //console.log(d)
        var dateConversion = moment(d.substring(0, 10)).format("dddd MM-DD-YYYY");
        //console.log(dateConversion);
        //build the item and use the date code from api document.createElementById("div")
        // Temeperature, Humidity, Date, weather icon.etc
        let cardElement = document.createElement("div");
        cardElement.classList = "card stock-card";
        cardElement.setAttribute("id", "day-card "); //it used to say .weather[i]
        let cardHeader = document.createElement("div");
        cardHeader.classList = "card-divider card-header";
        let cardBody = document.createElement("img");
        cardBody.classList = "stock-image";
        cardBody.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");// + forecast[0].symbol.var +
        cardHeader.append(dateConversion)
        cardElement.appendChild(cardHeader);
        cardHeader.appendChild(cardBody);
        //was trying to get the name of the day
        // let dayName = document.createElement("div")
        // dayName.classList = "day-name";
        // dayName.innerHTML = `<span>${list.dt_text[i]}</span><br><span>${data.list.weather[i].icon + ".png"}</span>`
        // cardHeader.appendChild(dayName);
        let dayDetails = document.createElement("div");
        dayDetails.classList = "day-details";
        dayDetails.innerHTML = `<span>%${data.list[i].main.humidity}</span><br><span>${data.list[i].main.temp}</span>`
        cardHeader.appendChild(dayDetails);
        console.log(cardElement);
        fiveDay.appendChild(cardElement);
      }
    };
  };
};

// to get the forecast (5 day forecast) using the 5 day API 
// function getFiveDay(searchValue){
// fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=5b33eff3ff13a94af4b4710b78cc83bc&units=imperial")
// .then(function(response){
//     return response.json()
//     .then(function (data){
//       console.log(data);
//       displayDays(data);

//     })
//   });

//       function displayDays (data){
//         console.log(data);

//       for (let i = 0; i < 5; i++) {


//       //build the item and use the date code from api document.createElementById("div")
//       // Temeperature, Humidity, Date, weather icon.etc

//       let cardElement = document.createElement("div");
//       cardElement.classList = "card stock-card";
//       cardElement.setAttribute("id","day-card "); //it used to say .weather[i]

//       let cardHeader = document.createElement("div");
//       cardHeader.classList = "card-divider card-header";

//       let cardBody = document.createElement("img");
//       cardBody.classList = "stock-image";
//       cardBody.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");// + forecast[0].symbol.var +

//       cardElement.appendChild(cardHeader);
//       cardElement.appendChild(cardBody);
//           //was trying to get the name of the day
//       // let dayName = document.createElement("div")
//       // dayName.classList = "day-name";
//       // dayName.innerHTML = `<span>${list.dt_text[i]}</span><br><span>${data.list.weather[i].icon + ".png"}</span>`
//       // cardHeader.appendChild(dayName);

//       let dayDetails = document.createElement("div");
//       dayDetails.classList = "day-details";
//       dayDetails.innerHTML = `<span>%${data.list[i].main.humidity}</span><br><span>${data.list[i].main.temp}</span>`
//       cardHeader.appendChild(dayDetails);
//       console.log(cardElement);

//       if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
//         var d = data.list[i].dt_txt;
//         console.log(d)
//         var dateConversion = moment(d.substring(0, 10)).format("dddd, MM-DD-YYYY");
//         console.log(dateConversion);

//         var dateForecast = document.getElementById("dateForecast")

//         var dateEl = document.createElement("p");
//         console.log(dateEl)

//         dateEl.append(dateConversion);

//         dateForecast.append(dateEl);

//         dateEl.appendChild(dayDetails);
//       }
        

//       fiveDay.appendChild(cardElement);

//  let date = data.list[i].dt_text
//  pass that into moment moment.format line 121-123 for UV and then append to the card

// fetch("http://api.openweathermap.org/data/2.5/forecast?q=Nashville&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial")
//     .then(function (response) {

//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);

//         for (var i = 0; i < data.list.length; i++) {

//             if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
//                 var d = data.list[i].dt_txt;
//                 console.log(d)
//                 var dateConversion = moment(d.substring(0, 10)).format("dddd, MM-DD-YYYY");
//                 console.log(dateConversion);

//                 var dateForecast = document.getElementById("dateForecast")

//                 var dateEl = document.createElement("p");
//                 console.log(dateEl)

//                 dateEl.append(dateConversion);

//                 dateForecast.appendChild(dateEl);
                
//             }
//         };

//     });





            //  let cardBodyEl = document.createElement("div");
            //  cardBodyEl.classList = "card-body";
            //  cardBodyEl.setAttribute("id", display.list[0].weather[0].main );

            //  let cardHeader = document.createElement("div");
            //  cardHeader.classList = "card-header";

            //  let dayEl = document.createElement("p");
            //  dayEl.classList = "card-header";

            //   let humidEl = document.createElement("p");
            //   humidEl.classList = "card-text";

            //   let tempEl = document.createElement("p");
            //   tempEl.classList = "card-text";

            //   var imgEl = document.createElement("img");
            //   imgEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")

              

            //   humidEl.textContent = "Humidity:" + data.main.humidity + " % ";
            //   tempEl.textContent = "Temperature: " + data.main.temp + " F ";

            //   cardBodyEl.appendChild(imgEl);
            //   cardHeader.appendChild(dayEl);
            //   cardBodyEl.appendChild(tempEl);
            //   cardBodyEl.appendChild(humidEl);
            //   $("#card-body").append(cardBodyEl);
            //   $("#card-text").appendChild(cardBodyEl);
            //   resultsList.appendChild(cardBodyEl);

      

      //have to build a loop for the 5 day, grab elements out and append them. 
      // let days = [Monday, Tuesday, Wedensday, Thurday, Friday, Saturday, Sunday];
      // for (let i = 0; i < days; i++) {
            
      //      console.log(works);
          
      //    };

      //for data.list.length look at the api beforehand 

      
 








    
  















// url e.g. data/2.5/forecast
// function getForecast(searchValue) {
//   // fetch and then response
//   fetch(lat, lon)
//      .then(function (response) {
//        // request was successful
//          if (response.ok) {
//          console.log(response);
//         response.json().then(function (data) {
//            console.log(data);
//            getUvIndex(data);
//          });
//        } else {
//          alert("Error: " + response.statusText);
//        }
//      })
//      .catch(function (error) {
//        alert("oops, my bad!");
//     });
//   // loop over all the foreasts by using 3 hour increments
//   for (var i = 0; i < 3; i++) {
//   }; 
    
//   // textcontent and appendChild methods 
// };

// use the UV specific url, e.g., data/2.5/uvi
function getUVIndex(lat, lon) {
  // fetch and then response 
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=5b33eff3ff13a94af4b4710b78cc83bc`)
     .then(function (response) {
       // request was successful
         if (response.ok) {
        response.json().then(function (data) {
           console.log(data);

           //let uvIndex = document.createElement() for the e
           //getUvIndex(data);
         });
        }
      
    });


    //    } else {
    //      alert("Error: " + response.statusText);
    //    }
    //  })
    //  .catch(function (error) {
    //    alert("oops, my bad!");
    



  // make a button that changes colors according to what number there is 
    // var UvIndex = (data.daily[0].uvi);
    // console.log(UvIndex);


    //data.value will replace UvIndex when the call is working 
  
    //all data.values below need to be changed to UvIndex


    //console.log a message on line 142


    //create the element to append back to the page (for UvIndex) 


    //buttonEl doesnt yet exist


    //add a class to the button i will create -replace buttonEl with whatever element create


//   if (data.value >8){
//        console.log(response)
//      buttonEl.classlist.add("btn-extreme")
// }    else if((data.value >6) && (data.value<= 7)){
//       buttonEl.classlist.add("btn-danger")
// }    else if (data.value ){
//       button.El.classlst.add("btn-high")
// }    else if (data.value <= 4){
//       button.El.classList.add("btn-moderate")
// }    else (data.value <= 2)
//       button.El.classList.add("btn-low")
// };
//         })
//  };



// var formSubmitHandler = function (event) {
//   // prevent page from refreshing
//   event.preventDefault();

//   // get value from input element
//   var city = nameInputEl.value.trim();

//   if (city) {
//     getWeather(city);

//     // clear old content
//     weatherContainerEl.textContent = "";
//     nameInputEl.value = "";
//   } else {
//     alert("Please enter a City");
//   }
// };

// //var buttonClickHandler = function(event) {
// // get the language attribute from the clicked element
// // var language = event.target.getAttribute("data-language");

// //   if (language) {
// //     getFeaturedRepos(language);

// //     // clear old content
// //     dataContainerEl.textContent = "";
// //   }
// // };

// var getWeather = function (city) {
//   // format the github api url
//   //var apiUrl = "https://api.github.com/users/" + user + "/repos";
//   var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5b33eff3ff13a94af4b4710b78cc83bc";



//   // make a get request to url
//   fetch(apiUrl)
//     .then(function (response) {
//       // request was successful
//       if (response.ok) {
//         console.log(response);
//         response.json().then(function (data) {
//           console.log(data);
//           displayWeather(data);
//         });
//       } else {
//         alert("Error: " + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert("oops, my bad!");
//     });
// };

// url
//   fetch(apiUrl).then(functiovar getFeaturedRepos = function(city) {
//   // format the github api url
//   //var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
//   var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5b33eff3ff13a94af4b4710b78cc83bc";

//   // make a get request to n(response) {
//     // request was successful
//     if (response.ok) {
//       response.json().then(function(data) {
//         displayWeather(data.items, language);
//       });
//     } else {
//       alert("Error: " + response.statusText);
//     }
//   });
// };

// var displayWeather = function(city) {
//   // check if api returned any repos
//   if (city === 0) {
//     dataContainerEl.textContent = "No Weather found.";
//     return;
//   }

//   citySearchTerm.textContent = citySearchTerm;

//   // loop over repos
//   for (var i = 0; i < city.length; i++) {
//     // format repo name
//     var cityName = city[i].owner.login + "/" + city[i].name;

//     // create a link for (I DON"T THINK I NEED THIS )

//     // var cityEl = document.createElement("a");
//     // cityEl.classList = "list-item flex-row justify-space-between align-center";
//     // cityEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

//     // create 7 span elements to hold weather info
//     var dayEl = document.createElement("span");
//     dayEl.textContent = day[Monday, Tuesday, Wedensday, Thursday, Friday];

//     // append to containers
//     dayEl.appendChild("#day-card");

//     // create a status element
//     // var statusEl = document.createElement("span");
//     // statusEl.classList = "flex-row align-center";

//     // // check if current repo has issues or not
//     // if (repos[i].open_issues_count > 0) {
//     //   statusEl.innerHTML =
//     //     "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
//     // } else {
//     //   statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//     // }

//     // // append to container
//     // repoEl.appendChild(statusEl);

//     // append container to the dom
//     weatherContainerEl.appendChild(dayEl);
//   }
// };

// // add event listeners to form and button container
 //formEl.addEventListener("submit", formSubmitHandler);
}
  $(".btn").on("click", getSearchVal);
  
// //languageButtonsEl.addEventListener("click", buttonClickHandler);
