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
  let minimumTemperature = document.querySelector("#min-temp");
  minimumTemperature.innerHTML = Math.round(response.data.main.temp_min);
  let maximumTemperature = document.querySelector("#max-temp");
  maximumTemperature.innerHTML = Math.round(response.data.main.temp_max);
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

function convertToFahrenheit(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector("#main-temp");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  mainTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let mainTemperature = document.querySelector("#main-temp");
  mainTemperature.innerHTML = Math.round(celciusTemperature);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8b058902e56924ef72769023553cf986";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let days = ["MON", "TUE", "WED", "THU", "FRI"];
  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-3 mb-3">
       <div class="card ">
              <div class="card-body">
                <h5 class="card-title weather-forecast-date">${day}</h5>
                <img
                  src="https://openweathermap.org/img/wn/01n@2x.png"
                  width="80px"
                  alt="icon"
                  class="icons"
                  />
                <div class ="weather-forecast-temperatures">
                  <span class="forecast-max-temp"> 25° </span>
                  <span class="forecast-min-temp"> 9°</span>
                </div>
                </div>
              </div>
              </div>
              `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", displayLocationWeather);

let celciusTemperature = null;

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", submitForm);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

searchCity("Pretoria");
