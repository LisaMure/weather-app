function formatDate(newDate) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentDate = new Date();
  let day = days[currentDate.getDay()];
  let month = months[currentDate.getMonth()];
  let date = currentDate.getDate();
  let year = currentDate.getFullYear();

  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let updatedDate = document.querySelector("#current-date");
  updatedDate.innerHTML = `${day}, ${date} ${month} ${year}, ${hour}h${minutes}`;
}
formatDate();

let h1 = document.querySelector("h1");
let apiKey = "8b058902e56924ef72769023553cf986";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${h1.innerHTML}&appid=${apiKey}&units=metric`;

function defaultCity() {
  let defaultCity = "Masvingo";
  h1.innerHTML = defaultCity;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function (response) {
    showTemperature(response);
    showWindSpeed(response);
    showHumidity(response);
    showDescription(response);
  });
}
defaultCity();

function insertCity(event) {
  event.preventDefault();
  let enterCityInput = document.querySelector("#enter-city-input");
  let city = enterCityInput.value;

  if (city) {
    h1.innerHTML = `${city}`;
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(function (response) {
      showTemperature(response);
      showWindSpeed(response);
      showHumidity(response);
      showDescription(response);
    });
  } else {
    h1.innerHTML = null;
    alert("Please enter city");
  }
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", insertCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let mainTemperature = document.querySelector("#main-temperature");
  mainTemperature.innerHTML = `${temperature}°C`;
}

function showWindSpeed(response) {
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${wind}km/hr`;
}
function showHumidity(response) {
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;
}

function showDescription(response) {
  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${description}`;
}

function showPositionWeather(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");

  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "8b058902e56924ef72769023553cf986";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(function (response) {
      let locationCity = response.data.name;
      h1.innerHTML = `${locationCity}`;
      showTemperature(response, locationCity);
      showWindSpeed(response, locationCity);
      showHumidity(response, locationCity);
      showDescription(response, locationCity);
    });
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", showPositionWeather);
