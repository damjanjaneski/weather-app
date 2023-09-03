"use strict";

let cityInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");
let img = document.getElementsByTagName("img")[0];
let imgDesc = document.getElementById("desc-img");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let temp = document.getElementById("temperature");
let loc = document.getElementById("location");
let feelsLike = document.getElementById("feels-like");
let convertBtn = document.getElementById("convert-btn");
let weatherContainer = document.getElementById("weather-container");
let error = document.getElementById("error");
let value;
let metric;

function citySearch() {
  let city = cityInput.value;
  let key = "6af7b62db3d307db57338c88020ee9d6";
  let API = `https://api.openweathermap.org/data/2.5/weather?q=${city},&APPID=${key}`;
  fetch(`${API}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.weather[0].icon);
      img.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      imgDesc.innerHTML = data.weather[0].main;
      loc.innerHTML = `${data.name}, ${data.sys.country}`;
      temp.innerHTML = `${Math.round(data.main.temp) - 273}°`;
      value = Math.round(data.main.feels_like) - 273;
      feelsLike.innerHTML = `Feels like: ` + `${value}°`;
      humidity.innerHTML = `Humidity: ${data.main.humidity} %`;
      wind.innerHTML = `Wind: ${data.wind.speed} m/h`;
      weatherContainer.style.height = "550px";
      convertBtn.style.display = "block";
      error.style.display = "none";
      metric = "celsious";
    })
    .catch(() => {
      error.style.display = "block";
    });
}

function search() {
  if (cityInput.value !== "") {
    citySearch();
    cityInput.value = "";
  }
}
function convert() {
  if (metric === "celsious") {
    temp.innerHTML = `${Math.round((parseInt(temp.innerHTML) * 9) / 5 + 32)}°`;
    value = Math.round((value * 9) / 5 + 32);
    feelsLike.innerHTML = `Feels like: ` + `${value}°`;
    metric = "farenheit";
  } else {
    temp.innerHTML = `${Math.round(
      (Math.round(parseInt(temp.innerHTML) - 32) * 5) / 9
    )}°`;
    value = Math.round(((value - 32) * 5) / 9);
    feelsLike.innerHTML = `Feels like: ` + `${value}°`;
    metric = "celsious";
  }
}

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    search();
  }
});
