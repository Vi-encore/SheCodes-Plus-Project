//import axios from "axios"; !!!
//let weather = {
//  paris: {
//    temp: 19.7,
//    humidity: 80,
//  },
//  tokyo: {
//    temp: 17.3,
//    humidity: 50,
//  },
//  lisbon: {
//    temp: 30.2,
//    humidity: 20,
//  },
//  "san francisco": {
//    temp: 20.9,
//    humidity: 100,
//  },
//  oslo: {
//    temp: -5,
//    humidity: 20,
//  },
//};
//
//function greet() {
//  let city = prompt("Enter a city");
//
//  let city_upd = city.toLowerCase().trim();
//
//  if (weather.hasOwnProperty(city_upd)) {
//    alert(
//      `It is currently ${Math.round(
//        weather[city_upd].temp
//      )} in ${city.trim()} with a humidity of ${weather[city_upd].humidity}% `
//    );
//  } else {
//    alert(
//      `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city_upd}`
//    );
//  }
//}
//
//greet();

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

  let foundCity = searchCity.value.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
  console.log(foundCity);

  if (searchCity.value === "") {
    city.innerHTML = `Unknown city`;
    alert("Please, enter your city!");
  } else if (searchCity.value) {
    function showTemp(response) {
      //const link = `${apiUrl}&appid=${apiKey}&units=metric`;
      console.log(response.data.name);
      const temp = Math.round(response.data.main.temp);

      city.innerHTML = `${foundCity}`;
      pageTemp.innerHTML = `${temp}`;
      console.log(temp);
    }
    const apiKey = "1266ad07b66517497b1acf79ea5a6a64";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${foundCity}`;
    const pageTemp = document.querySelector("#temp");

    axios
      .get(`${apiUrl}&appid=${apiKey}&units=metric`)
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status);
          city.innerHTML = `Unknown city`;
          pageTemp.innerHTML = "0";
          alert("Please, enter your city correctly!");
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
        //alert("Please, enter your city correctly!");
        //city.innerHTML = `Unknown city`;
      })
      .then(showTemp);
  }
}

function getLocation() {
  function myPosition(position) {
    let lat = position.coords.latitude.toFixed(2);
    let lon = position.coords.longitude.toFixed(2);
    console.log(lat, lon);

    const apiKey = "1266ad07b66517497b1acf79ea5a6a64";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`;

    function changeLocation(location) {
      const myCity = location.data.name;
      const myTemp = Math.round(location.data.main.temp);

      const city = document.querySelector(".city-name");
      const temp = document.querySelector("#temp");

      city.innerHTML = `${myCity}`;
      temp.innerHTML = `${myTemp}`;
    }

    axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(changeLocation);
  }

  navigator.geolocation.getCurrentPosition(myPosition);
}

let findMeBtn = document.querySelector(".find-me-wrap");
findMeBtn.addEventListener("click", getLocation);

let search = document.querySelector(".search-form");
search.addEventListener("submit", changeCity);

function tempFar(event) {
  event.preventDefault();
  let tempFar = document.querySelector(".temp-far");
  let tempCel = document.querySelector(".temp-celc");
  let mainTemp = document.querySelector("#temp");
  let mainTempValue = mainTemp.firstChild.nodeValue;
  //console.log(mainTempValue);
  //console.log(typeof mainTemp);
  mainTempValue = (mainTempValue * 1.8 + 32).toFixed(1);
  //console.log(mainTempValue);

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
  //console.log(mainTempValue);

  mainTemp.innerHTML = `${mainTempValue}`;
  tempCel.classList.add("focus");
  tempFar.classList.contains("focus") && tempFar.classList.remove("focus");
}

let tempCelc = document.querySelector(".temp-celc");
tempCelc.addEventListener("click", tempCel);
