const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const daysForecastDiv = document.querySelector(".days-forecast");
var loadMap = document.getElementById("loadMap");
var mapDiv = document.getElementById("map");

var toggleTempValue = false;

// geolocation
var latitude;
var longitude;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log(latitude, longitude);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

// Auto-fetch geolocation when the page loads
getLocation();

function getWeather(e) {
  e.preventDefault();
  const cityName = cityInput.value.trim();
  if (cityName) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "weather.php", true);
    // xhttp.responseType = "json";
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onload = function () {
      if (xhttp.status === 200) {
        showWeather(xhttp.response);
        document.getElementById("weatherForm").reset();
      }
    };
    const data = { city: cityName, lat: latitude, lon: longitude };
    const cityValue = JSON.stringify(data);
    xhttp.send(cityValue);
  } else {
    alert("enter city name");
  }
}

searchButton.addEventListener("click", getWeather);

// load data
function showWeather(data) {
  const newUpdated = JSON.parse(data);
  console.log(newUpdated);

  if (newUpdated.status != "false") {
    getWeatherDetails(
      newUpdated.name,
      newUpdated.coord.lat,
      newUpdated.coord.lat,
      newUpdated.sys.sunrise,
      newUpdated.sys.sunset
    );

    /////////////////////////////////////////////
    let checkmapContainer = loadMap.contains(mapDiv);
    console.log("Hello", checkmapContainer);

    if (checkmapContainer) {
      loadMap.removeChild(mapDiv);
      let childElement = document.createElement("div");
      childElement.setAttribute("id", "map");
      childElement.style.height = "400px";
      childElement.style.marginBottom = "10px";
      loadMap.appendChild(childElement);
      setTimeout(() => {
        const map = L.map("map").setView(
          [newUpdated.coord.lat, newUpdated.coord.lon],
          10
        );
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);
        L.marker([newUpdated.coord.lat, newUpdated.coord.lon])
          .addTo(map)
          .bindPopup(newUpdated.name);
      }, 2000);
    }

    /////////////////////////////////////////////
  } else {
    alert("city name not found");
  }
}

const createWeatherCard = (cityName, weatherItem, index, sunrise, sunset) => {
  if (index === 0) {
    return `<div class="mt-3 d-flex justify-content-between">
                    <div>
                        <h3 class="fw-bold">${cityName} (${
      weatherItem.dt_txt.split(" ")[0]
    })</h3>
                        <h6 class="my-3 mt-3">Temperature: ${(
                          weatherItem.main.temp - 273.15
                        ).toFixed(2)}°C</h6>
                        <h6 class="my-3">Wind: ${
                          weatherItem.wind.speed
                        } M/S</h6>
                        <h6 class="my-3">Humidity: ${
                          weatherItem.main.humidity
                        }%</h6>
                        <h6 class="my-3">Sunrise:${new Date(
                          sunrise * 1000
                        ).toLocaleTimeString()}</h6>
                        <h6 class="my-3">Sunset:${new Date(
                          sunset * 1000
                        ).toLocaleTimeString()}</h6>
                    </div>
                    <div class="text-center me-lg-5">
                    <i class='${getWeatherIconClass(
                      weatherItem.weather[0].main
                    )}' style="font-size:25px;"></i>
                        <h6>${weatherItem.weather[0].description}</h6>
                    </div>
                </div>`;
  } else {
    return `<div class="col mb-3">
                    <div class="card border-0 bg-secondary text-white">
                        <div class="card-body p-3 text-white">
                            <h5 class="card-title fw-semibold">(${
                              weatherItem.dt_txt.split(" ")[0]
                            })</h5>
                            <i class=${getWeatherIconClass(
                              weatherItem.weather[0].icon
                            )}></i>
                            <h6 class="card-text my-3 mt-3">Temp: ${(
                              weatherItem.main.temp - 273.15
                            ).toFixed(2)}°C</h6>
                            <h6 class="card-text my-3">Wind: ${
                              weatherItem.wind.speed
                            } M/S</h6>
                            <h6 class="card-text my-3">Humidity: ${
                              weatherItem.main.humidity
                            }%</h6>
                            <div class="text-center me-lg-5">
                            <i class='${getWeatherIconClass(
                              weatherItem.weather[0].main
                            )}' style="font-size:25px;"></i>
                                <h6>${weatherItem.weather[0].description}</h6>
                            </div>
                        </div>
                    </div>
                </div>`;
  }
};
// Get weather details of passed latitude and longitude
const getWeatherDetails = (cityName, latitude, longitude, sunrise, sunset) => {
  const api_key = `168e1dd664485f4b46687ec7280f3daf`;
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api_key}&units=metric`;
  fetch(WEATHER_API_URL)
    .then((response) => response.json())
    .then((data) => {
      const forecastArray = data.list;
      const uniqueForecastDays = new Set();
      const fiveDaysForecast = forecastArray.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (
          !uniqueForecastDays.has(forecastDate) &&
          uniqueForecastDays.size < 6
        ) {
          uniqueForecastDays.add(forecastDate);
          return true;
        }
        return false;
      });
      cityInput.value = "";
      currentWeatherDiv.innerHTML = "";
      daysForecastDiv.innerHTML = "";
      fiveDaysForecast.forEach((weatherItem, index) => {
        const html = createWeatherCard(
          cityName,
          weatherItem,
          index,
          sunrise,
          sunset
        );
        if (index === 0) {
          currentWeatherDiv.insertAdjacentHTML("beforeend", html);
        } else {
          daysForecastDiv.insertAdjacentHTML("beforeend", html);
        }
      });
    })
    .catch(() => {
      alert("An error occurred while fetching the weather forecast!");
    });
};

function getWeatherIconClass($weatherCondition) {
  $lowercaseCondition = $weatherCondition.toLowerCase();
  switch ($lowercaseCondition) {
    case "clear":
      return "fas fa-sun"; // Sun icon for clear weather
    case "clouds":
    case "scattered clouds":
      return "fas fa-cloud"; // Cloud icon for cloudy weather
    case "cain":
      return "fas fa-cloud-showers-heavy"; // Rain icon for rainy weather
    case "thunderstorm":
      return "fas fa-bolt"; // Bolt icon for thunderstorm
    case "snow":
      return "fas fa-snowflake"; // Snowflake icon for snowy weather
    default:
      return "fas fa-question"; // Question mark icon for unknown weather
  }
}

setTimeout(() => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "gMap.php", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onload = function () {
    if (xhttp.status === 200) {
      showWeather(xhttp.response);
    }
  };
  const data = { lat: latitude, lon: longitude, temp: toggleTempValue };
  const cityValue = JSON.stringify(data);
  xhttp.send(cityValue);
}, 5000);

function toggleButton() {
  toggleTempValue = !toggleTempValue;
  var button = document.querySelector(".toggle-btn");
  if (toggleTempValue) {
    button.style.backgroundColor = "#e74c3c";
    button.textContent = "Imperial: °F, mph";
  } else {
    button.style.backgroundColor = "#3498db";
    button.textContent = "Metric: °C, m/s";
  }
}
