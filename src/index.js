function formatDate(newDate) {
  let date = new Date(newDate);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
  celciusTemperature = response.data.main.temp;
  let mainTemperature = document.querySelector("#main-temp");
  mainTemperature.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let weatherIcon = document.querySelector("#main-weather-icon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function submitForm(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city-input");
  searchCity(cityInput.value);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function formatForecastDay(newDate) {
  let date = new Date(newDate * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function displayForecast(response) {
  let weatherForecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  weatherForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-3 mb-3">
       <div class="card ">
              <div class="card-body">
                <h5 class="card-title weather-forecast-date">${formatForecastDay(
                  forecastDay.dt
                )}</h5>
                <img
                  src= "https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  width="80px"
                  alt="icon"
                  class="icons"
                  />
                <div class ="weather-forecast-temperatures">
                  <span class="forecast-max-temp"> ${Math.round(
                    forecastDay.temp.max
                  )}° </span>
                  <span class="forecast-min-temp"> ${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
                </div>
              </div>
              </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", displayLocationWeather);

let celciusTemperature = null;

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", submitForm);

searchCity("Pretoria");
