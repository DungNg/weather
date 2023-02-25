let btnRefresh = document.querySelector(".btn-refresh");
let loadingHTML = document.querySelector(".loading");
let cardHTML = document.getElementById("card");
let cityHTML = document.querySelector(".city");
let localityHTML = document.querySelector(".locality");
let temperatureHTML = document.querySelector(".temperature");
let weatherCodeHTML = document.querySelector(".weatherCode");
let windspeedHTML = document.querySelector(".windspeed");
let winddirectionHTML = document.querySelector(".winddirection");
let apiURL = "https://api.open-meteo.com/v1/forecast";
let weather = new Weather();
let city = null;
let currentLocation = null;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      currentLocation = position;
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

async function getCity(lat, long) {
  try {
    let response = await axios.get(
      "https://api.bigdatacloud.net/data/reverse-geocode-client",
      {
        params: {
          latitude: lat,
          longitude: long,
          localityLanguage: "vi",
        },
      }
    );
    city = response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getWeather(lat, long) {
  try {
    let response = await axios.get(apiURL, {
      params: {
        latitude: lat,
        longitude: long,
        current_weather: true,
      },
    });
    weather = new Weather().initFromObj(response.data);
  } catch (error) {
    console.log(error);
  }
}

function degToCompass(num) {
  var val = Math.floor(num / 22.5 + 0.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
}

function setWeatherToView() {
  if (!weather) {
    return;
  }
  temperatureHTML.innerHTML = weather.current_weather.temperature + "&deg;";
  weatherCodeHTML.innerHTML = weatherCodes[weather.current_weather.weathercode];
  windspeedHTML.innerHTML = weather.current_weather.windspeed + " km/h";
  winddirectionHTML.innerHTML = degToCompass(
    weather.current_weather.winddirection
  );
  cardHTML.style.backgroundImage = `url(./assets/${weather.current_weather.weathercode}.jpg)`;

  if (!city) {
    return;
  }
  cityHTML.innerHTML = `${city.locality}, ${city.city}`;
}

function show(htmlElement) {
  htmlElement.classList.remove("hide");
  htmlElement.classList.add("show");
}

function hide(htmlElement) {
  htmlElement.classList.remove("show");
  htmlElement.classList.add("hide");
}

async function init() {
  show(loadingHTML);
  hide(cardHTML);
  let waitForLocationLoop = setInterval(async () => {
    if (currentLocation) {
      await getCity(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
      await getWeather(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
      setWeatherToView();
      clearInterval(waitForLocationLoop);
      hide(loadingHTML);
      show(cardHTML);
    }
  }, 1000);
}
getLocation();
init();

btnRefresh.addEventListener("click", () => {
  init();
});
