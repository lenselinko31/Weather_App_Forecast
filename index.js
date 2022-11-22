//import "./styles.css";

navigator.geolocation.getCurrentPosition(pageLoad);

//Format form and heading
function cityName(intro) {
  intro.preventDefault();
  let city = document.querySelector("#city").value;
  let header = document.querySelector("#heading");
  header.innerHTML = city;
  tempUpdate(city);
}

//Change city name to match entered city
function tempUpdate(city) {
  let citySearched = document.querySelector("#city").value;
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&units=imperial&appid=${apiKey}`;
  axios.get(cityUrl).then(currentTemp);
}

import "./styles.css";

navigator.geolocation.getCurrentPosition(pageLoad);

//Format form and heading
function cityName(intro) {
  intro.preventDefault();
  let city = document.querySelector("#city").value;
  let header = document.querySelector("#heading");
  header.innerHTML = city;
  tempUpdate(city);
  tempC.classList.remove("active");
  temp.classList.add("active");
}

//Change city name to match entered city
function tempUpdate(city) {
  let citySearched = document.querySelector("#city").value;
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&units=imperial&appid=${apiKey}`;
  axios.get(cityUrl).then(currentTemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", cityName);

//Format Day and Time
let now = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${hour}:${minute}`;
}

let time = document.querySelector("#time");
let currentDate = new Date();
time.innerHTML = formatDate(currentDate);

//Finds current location with lat and long
function location(intro) {
  intro.preventDefault();
  function findLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
    let url =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial&appid=" +
      apiKey;
    axios.get(url).then(currentTemp);
    tempC.classList.remove("active");
    temp.classList.add("active");
  }
  navigator.geolocation.getCurrentPosition(findLocation);
}

document.querySelector("#current").addEventListener("click", location);
document.addEventListener("DOMContentLoaded", function () {
  location();
});

function forecastWeekDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//display forcasted weather
function forecastCards(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index >= 1 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class = ""row>
                <div class="forecastDate">${forecastWeekDay(
                  forecastDay.dt
                )}</div>
                <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" class="forecastDate" alt=""
                width="70"/>
                <div class="high">${Math.round(
                  forecastDay.temp.max
                )}° <span class = "low">${Math.round(
          forecastDay.temp.min
        )}°</span></div>
            </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function findForecast(coordinates) {
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(forecastUrl).then(forecastCards);
}

//Updates weather for city
function currentTemp(response) {
  let name = response.data.name;
  let country = response.data.sys.country;
  fTemp = Math.round(response.data.main.temp);
  let humid = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let descrip = response.data.weather[0].main;
  let weather = document.querySelector("#temperature");
  weather.innerHTML = fTemp;
  let cityName = document.querySelector("#heading");
  cityName.innerHTML = `${name}, ${country}`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = "Wind: " + Math.round(wind) + " m/h";
  let humidPercent = document.querySelector("#humid");
  humidPercent.innerHTML = "Humidity: " + humid + "%";
  let description = document.querySelector("#description");
  description.innerHTML = descrip;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  findForecast(response.data.coord);
}

//Change temp to Fahfrenheit
function ToF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  temp.classList.add("active");
  tempC.classList.remove("active");
  currentTemp.innerHTML = fTemp;
}

//Change temp to Celsius
function ToC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  tempC.classList.add("active");
  temp.classList.remove("active");
  let celciusTemp = ((fTemp - 32) * 5) / 9;
  currentTemp.innerHTML = Math.round(celciusTemp);
}

let fTemp = null;

let temp = document.querySelector("#tempChangeF");
temp.addEventListener("click", ToF);

let tempC = document.querySelector("#tempChangeC");
tempC.addEventListener("click", ToC);

//Display weather for current location on load
function pageLoad() {
  function findLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
    let url =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial&appid=" +
      apiKey;
    axios.get(url).then(currentTemp);
    temp.classList.add("active");
    tempC.classList.remove("active");
  }
  navigator.geolocation.getCurrentPosition(findLocation);
}