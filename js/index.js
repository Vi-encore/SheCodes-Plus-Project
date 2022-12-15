let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

function greet() {
  let city = prompt("Enter a city");

  let city_upd = city.toLowerCase().trim();

  if (weather.hasOwnProperty(city_upd)) {
    alert(
      `It is currently ${Math.round(
        weather[city_upd].temp
      )} in ${city.trim()} with a humidity of ${weather[city_upd].humidity}% `
    );
  } else {
    alert(
      `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city_upd}`
    );
  }
}

greet();

function currentDate() {
  let now = new Date();
  let date = now.getDate();
  let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  let mainDay = document.querySelector(".day-main");
  mainDay.innerHTML = `${date}/${month}/${year}`;
}

currentDate();

function currentTime() {
  let now = new Date();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = week[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let todayTime = document.querySelector(".current-day-time");
  todayTime.innerHTML = `${day} ${hour}:${minutes}`;
}

currentTime();

function changeCity(event) {
  event.preventDefault();

  let searchCity = document.querySelector(".search-input");
  let city = document.querySelector(".city-name");
  //console.log(searchCity.value);

  city.innerHTML = `${searchCity.value}`;
}

let search = document.querySelector(".search-form");
search.addEventListener("submit", changeCity);

function tempFar(event) {
  event.preventDefault();
  let tempFar = document.querySelector(".temp-far");
  let tempCel = document.querySelector(".temp-celc");
  let mainTemp = document.querySelector("#temp");
  let mainTempValue = mainTemp.firstChild.nodeValue;
  console.log(mainTempValue);
  //console.log(typeof mainTemp);
  mainTempValue = (mainTempValue * 1.8 + 32).toFixed(1);
  console.log(mainTempValue);

  mainTemp.innerText = `${mainTempValue}`;
  tempFar.classList.add("focus");

  tempCel.classList.contains("focus") && tempCel.classList.remove("focus");
}

let tempFarh = document.querySelector(".temp-far");

tempFarh.addEventListener("click", tempFar);

function tempCel(event) {
  event.preventDefault();
  let tempCel = document.querySelector(".temp-celc");
  let tempFar = document.querySelector(".temp-far");
  let mainTemp = document.querySelector("#temp");
  let mainTempValue = mainTemp.firstChild.nodeValue;
  mainTempValue = Math.round((mainTempValue - 32) / 1.8);
  console.log(mainTempValue);

  mainTemp.innerHTML = `${mainTempValue}`;
  tempCel.classList.add("focus");
  tempFar.classList.contains("focus") && tempFar.classList.remove("focus");
}

let tempCelc = document.querySelector(".temp-celc");
tempCelc.addEventListener("click", tempCel);
