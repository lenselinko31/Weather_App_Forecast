import "./styles.css";

//Format form and heading
function cityName(intro) {
  intro.preventDefault();
  let city = document.querySelector("#city").value;
  let header = document.querySelector("#heading");
  header.innerHTML = city;
  tempUpdate(city);
}

function tempUpdate(city) {
  let citySearched = document.querySelector("#city").value;
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched},au&units=imperial&appid=${apiKey}`;
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
    "Saturday"
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

function ToF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `35 `;
}

let temp = document.querySelector("#tempChangeF");
temp.addEventListener("click", ToF);

function ToC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `1 `;
}

let tempC = document.querySelector("#tempChangeC");
tempC.addEventListener("click", ToC);

function location() {
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
  }
  navigator.geolocation.getCurrentPosition(findLocation);
}

document.querySelector("#current").addEventListener("click", location);

function currentTemp(response) {
  let name = response.data.name;
  let country = response.data.sys.country;
  let temp = Math.round(response.data.main.temp);
  let humid = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let descrip = response.data.weather[0].main;
  let weather = document.querySelector("#temperature");
  weather.innerHTML = temp;
  let cityName = document.querySelector("#heading");
  cityName.innerHTML = `${name}, ${country}`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = "Wind: " + Math.round(wind) + " m/h";
  let humidPercent = document.querySelector("#humid");
  humidPercent.innerHTML = "Humidity: " + humid + "%";
  let description = document.querySelector("#description");
  description.innerHTML = descrip;
}
