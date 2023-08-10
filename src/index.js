function displayTemperature(response) {
  let mainTemperature = document.querySelector("#main-temp");
  mainTemperature.innerHTML = Math.round(response.data.main.temp);
  let minimumTemperature = document.querySelector("#min-temp");
  minimumTemperature.innerHTML = Math.round(response.data.main.temp_min);
  let maximumTemperature = document.querySelector("#max-temp");
  maximumTemperature.innerHTML = Math.round(response.data.main.temp_max);
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#current-date");
  //dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "8b058902e56924ef72769023553cf986";
let city = "Masvingo";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
