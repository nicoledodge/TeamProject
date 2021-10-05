//DOM Queries 
const formEl = document.getElementById('form');

//Global Variables 
let placeName = 'austin';
const geoNamesUsername = 'matmll12';
let countryCode;
let flagUrl = `https://www.countryflags.io/${countryCode}/shiny/64.png`
let start;
let end;
let currentWeatherData;

//callGeoNamesAPI

const callGeoNamesAPI = function () {

    const apiUrl = `http://api.geonames.org/searchJSON?q=&name_equals=${placeName}&maxRows=10&username=${geoNamesUsername}`;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // console.log('data = ' + data);
                countryCode = data.geonames[0].countryCode;
                flagUrl = `https://www.countryflags.io/${countryCode}/shiny/64.png`;
                callPixabayAPI();
                console.log(flagUrl);
            });
        } else {
            alert(`Error: ${response.statusText}`);
        }
    })
}

//callPixabay

function callPixabayAPI() {

    const apiUrl = `https://pixabay.com/api/?key=23699081-1c7d96634df54c3a4261e64ca&q=${countryCode}`

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data.hits[0].largeImageURL);
            });
        } else {
            alert(`Error: ${response.statusText}`)
        }
    })
}

//make Weather API call

const callCurrentWeatherDataAPI = function(cityName){
  
    const apiKey = 'f2d872dec206d66d9deec95927164a7b';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`

    fetch(apiUrl).then(function(response) {
        if(response.ok){
            response.json().then(function(data){
                currentWeatherData = data;
                console.log(data);
            });
        } else {
            alert(`Error: ${response.statusText}`)
        }
    })
}


document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, "");
});

formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    placeName = formEl.placename.value.trim();
    console.log(formEl.placename.value);
    console.log(placeName);
    start = formEl.startDate.value;
    console.log(start)
    end = formEl.endDate.value;
    console.log(end)
    callGeoNamesAPI();
    callCurrentWeatherDataAPI(placeName)
})

