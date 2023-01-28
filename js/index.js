let date = new Date();
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = date.getDay();
let month = date.getMonth();
let year = date.getFullYear();
let hours = date.getHours();

function createIcon(iconID, icon) {
  iconID > 200 && iconID < 232
    ? (icon.innerHTML = `<i class="fa-solid fa-cloud-bolt forecast__pic" id="forecast-ico"></i>`)
    : iconID > 300 && iconID < 321
    ? (icon.innerHTML = `<i class="fa-solid fa-cloud-rain forecast__pic" id="forecast-ico"></i>`)
    : iconID > 500 && iconID < 504
    ? (icon.innerHTML = `<i class="fa-solid fa-cloud-rain forecast__pic" id="forecast-ico"></i>`)
    : iconID === 511
    ? (icon.innerHTML = `<i class="fa-solid fa-snowflake forecast__pic" id="forecast-ico"></i>`)
    : iconID > 520 && iconID < 531
    ? (icon.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy forecast__pic" id="forecast-ico"></i>`)
    : iconID > 600 && iconID < 622
    ? (icon.innerHTML = `<i class="fa-regular fa-snowflake forecast__pic" id="forecast-ico"></i>`)
    : iconID > 701 && iconID < 771
    ? (icon.innerHTML = `<i class="fa-solid fa-smog forecast__pic" id="forecast-ico"></i>`)
    : iconID === 781
    ? (icon.innerHTML = `<i class="fa-solid fa-tornado forecast__pic" id="forecast-ico"></i>`)
    : iconID === 800
    ? hours > 19 || hours < 5
      ? (icon.innerHTML = `<i class="fa-regular fa-moon forecast__pic" id="forecast-ico"></i>`)
      : (icon.innerHTML = `<i class="fa-regular fa-sun forecast__pic" id="forecast-ico"></i>`)
    : iconID === 801
    ? hours > 19 || hours < 5
      ? (icon.innerHTML = `<i class="fa-solid fa-cloud-moon forecast__pic" id="forecast-ico"></i>`)
      : (icon.innerHTML = `<i class="fa-solid fa-cloud-sun forecast__pic" id="forecast-ico"></i>`)
    : iconID > 801
    ? (icon.innerHTML = `<i class="fa-solid fa-cloud forecast__pic" id="forecast-ico"></i>`)
    : (icon.innerHTML = `<i class="fa-regular fa-sun forecast__pic" id="forecast-ico"></i>`);
}

function changeIcoNext(apiDescr) {
  let icon;
  apiDescr === "mist-day" || apiDescr === "mist-night"
    ? (icon =
        '<i class="fa-solid fa-smog forecast__pic side__icon" id="forecast-ico"></i>')
    : apiDescr === "snow-day" || apiDescr === "snow-night"
    ? (icon = '<i class="fa-regular fa-snowflake side__icon"></i>')
    : apiDescr === "thunderstorm-day" || apiDescr === "thunderstorm-night"
    ? (icon = '<i class="fa-solid fa-cloud-bolt side__icon"></i>')
    : apiDescr === "rain-day" || apiDescr === "rain-night"
    ? (icon = '<i class="fa-solid fa-cloud-rain side__icon"></i>')
    : apiDescr === "shower-rain-day" || apiDescr === "shower-rain-night"
    ? (icon = '<i class="fa-solid fa-cloud-showers-heavy side__icon"></i>')
    : apiDescr === "broken-clouds-day" ||
      apiDescr === "broken-clouds-night" ||
      apiDescr === "scattered-clouds-day" ||
      apiDescr === "scattered-clouds-night"
    ? (icon = '<i class="fa-solid fa-cloud side__icon"></i>')
    : apiDescr === "few-clouds-day" || apiDescr === "few-clouds-night"
    ? hours > 19 || hours < 5
      ? (icon =
          '<i class="fa-solid fa-cloud-moon side__icon" id="forecast-ico"></i>')
      : (icon =
          '<i class="fa-solid fa-cloud-sun side__icon" id="forecast-ico"></i>')
    : hours > 19 || hours < 5
    ? (icon = '<i class="fa-regular fa-moon side__icon" id="forecast-ico"></i>')
    : (icon = '<i class="fa-regular fa-sun side__icon" id="forecast-ico"></i>');
  return icon;
}

// function changeSideIco(icoDescr, iconWrap) {
//   icoDescr;
// }

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  return days[day];
}

function changeBg() {
  let season;
  let bgSeason = document.getElementById("bg-pic");

  month === 0 || month === 1 || month === 11
    ? (season = "winter")
    : month === 2 || month === 3 || month === 4
    ? (season = "spring")
    : month === 5 || month === 6 || month === 7
    ? (season = "summer")
    : (season = "autumn");

  bgSeason.innerHTML = `<source
    srcset="./img/${season}-xs.jpg"
    media="(max-width: 425px)"
    type="image/jpg"
    />
    <source
    srcset="./img/${season}-sm.jpg"
    media="(max-width: 576px)"
    type="image/jpg"
    />
    <source
    srcset="./img/${season}-md.jpg"
    media="(max-width: 768px)"
    type="image/jpg"
    />
    <source
    srcset="./img/${season}-lg.jpg"
    media="(max-width: 992px)"
    type="image/jpg"
    />
    <source
    srcset="./img/${season}-xl.jpg"
    media="(max-width: 1200px)"
    type="image/jpg"
    />
    <img class="background__img" src="img/${season}.jpg" alt="Today's season" /> `;
}

function changeDate() {
  changeBg();
  let day = date.getDay();
  let month = date.getMonth();
  let currentDay = document.getElementById("forecast-day");
  let changeDay = days[day];
  currentDay.innerHTML = changeDay;

  let currentDate = document.getElementById("forecast-date");
  let changeDate = date.getDate();
  changeDate < 10 ? (changeDate = `0${changeDate}`) : changeDate;
  currentDate.innerHTML = changeDate;

  let currentMonth = document.getElementById("forecast-month");
  let changeMonth = months[month];
  currentMonth.innerHTML = changeMonth;

  let currentYear = document.getElementById("forecast-year");
  currentYear.innerHTML = year;
}

changeDate();

function cityDefault() {
  let defaultCity = "Kyiv";
  let defaultTemp = document.querySelector("#temp-main");
  let defaultDescriptionWeather = document.getElementById("forecast--descr");
  let defaultHumidity = document.getElementById("main-humidity");
  let defaultWindspeed = document.getElementById("main-windspeed");
  let defaultForecastIco = document.getElementById("forecast-ico-wrap");

  let picked = document.querySelector(".forecast--cels");
  picked.classList.add("picked");
  let notPicked = document.querySelector(".forecast--farh");
  notPicked.classList.remove("picked");

  function showTempDefault(response) {
    const defaultCurrentTemp = Math.round(response.data.main.temp);
    const defaultCurrentDescription = response.data.weather[0].description;
    const defaultCurrentHumidity = response.data.main.humidity;
    const defaultCurrentWindspeed = response.data.wind.speed;
    const defaultCurrentForecastIco = response.data.weather[0].id;

    // console.log(defaultCurrentTemp);

    beforeCelc = Math.round(response.data.main.temp);

    defaultCity.innerHTML = `${defaultCity}`;
    defaultTemp.innerHTML = `${defaultCurrentTemp}`;
    defaultDescriptionWeather.innerHTML = `${defaultCurrentDescription}`;
    defaultHumidity.innerHTML = defaultCurrentHumidity;
    defaultWindspeed.innerHTML = defaultCurrentWindspeed;

    createIcon(defaultCurrentForecastIco, defaultForecastIco); //!!!!!!!

    let lon = response.data.coord.lon.toFixed(2);
    let lat = response.data.coord.lat.toFixed(2);

    let shecodesKey = `4fa8474b4bc99d703a4c2teao58c4939`;
    let shecodesApi = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${shecodesKey}&units=metric`;

    // console.log(shecodesApi);

    function showInfo(response) {
      let forecast = response.data.daily;

      let sideGrid = document.querySelector(".side__grid");
      let sideHTML = "";

      forecast.forEach((tempInfo, index) => {
        let maxTemp = Math.round(tempInfo.temperature.maximum);
        let minTemp = Math.round(tempInfo.temperature.minimum);

        let descript = tempInfo.condition.icon;
        let icon = changeIcoNext(descript);

        if (index < day && index < 4) {
          sideHTML =
            sideHTML +
            `<div
                            class="side__card col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12"
                          >
                            <div
                              class="side__weather-card my-2 p-2 d-flex flex-column justify-content-between align-items-center"
                            >
                              <div class="side__icon--wrap p-4">
                                ${icon}
                              </div>
                              <div
                                class="side__day-of-week d-flex flex-column align-items-center"
                              >
                                <p class="side__day m-0" id="side__day--1">${formatDay(
                                  tempInfo.time
                                )}</p>
                                <p class="side__weather-description m-0">
                                  ${tempInfo.condition.description}
                                </p>
                              </div>
                              <div
                                class="side__temp w-100 px-4 d-flex flex-row justify-content-between"
                              >
                                <div class="side__weather--max">
                                  <p class="side__max--text">
                                   <span class="side__max--temp celc-active">${maxTemp}</span> °
                                    
                                  </p>
                                </div>
                                <div class="side__weather--min">
                                  <p class="side__min--text">
                                    <span class="side__min--temp celc-active">${minTemp}</span> °
                                   
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>`;
        }
      });

      sideGrid.innerHTML = sideHTML;
    }

    axios.get(shecodesApi).then(showInfo);
  }

  let apiKey = "a061ec7844e88361e25c005f78e2639f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}`;

  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(showTempDefault);
}

cityDefault();

function changeCity() {
  let inputVal = document.getElementById("search-input").value;
  let currentCity = document.getElementById("city-name");
  let mainTemp = document.getElementById("temp-main");
  let descriptionWeather = document.getElementById("forecast--descr");
  let currentHumidity = document.getElementById("main-humidity");
  let currentWindspeed = document.getElementById("main-windspeed");
  let nowForecastIco = document.getElementById("forecast-ico-wrap");

  let picked = document.querySelector(".forecast--cels");
  picked.classList.add("picked");
  let notPicked = document.querySelector(".forecast--farh");
  notPicked.classList.remove("picked");
  // let degree = document.querySelector('.forecast--celc');
  // degree.classList.add('picked')

  let foundCity = inputVal.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );

  if (inputVal === "") {
    currentCity.innerHTML = "Unknown city";
    // alert("Enter your city!");
  } else {
    function showTemp(response) {
      const currentTemp = Math.round(response.data.main.temp);
      const currentDescription = response.data.weather[0].description;
      const humidity = response.data.main.humidity;
      const windspeed = response.data.wind.speed;
      const forecastIco = response.data.weather[0].id;

      beforeCelc = Math.round(response.data.main.temp);

      currentCity.innerHTML = `${foundCity}`;
      mainTemp.innerHTML = `${currentTemp}`;
      descriptionWeather.innerHTML = `${currentDescription}`;
      currentHumidity.innerHTML = humidity;
      currentWindspeed.innerHTML = windspeed;

      createIcon(forecastIco, nowForecastIco);
    }
  }

  let apiKey = "a061ec7844e88361e25c005f78e2639f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${foundCity}`;

  let city = document.getElementById("city-name");
  let temp = document.getElementById("temp-main");
  axios
    .get(`${apiUrl}&appid=${apiKey}&units=metric`)
    .catch((error) => {
      if (error.response) {
        console.log(error.response.status);
        city.innerHTML = `Unknown city`;
        temp.innerHTML = "0";
        alert("Please, enter your city correctly!");
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    })
    .then(showTemp);

  function displayForecast(response) {
    let lon = response.data.coord.lon.toFixed(2);
    let lat = response.data.coord.lat.toFixed(2);

    let sideGrid = document.querySelector(".side__grid");
    let sideHTML = "";
    let shecodesKey = `4fa8474b4bc99d703a4c2teao58c4939`;
    let shecodesApi = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${shecodesKey}&units=metric`;

    function showInfo(response) {
      let forecast = response.data.daily;

      let sideGrid = document.querySelector(".side__grid");
      let sideHTML = "";

      forecast.forEach((tempInfo, index) => {
        let maxTemp = Math.round(tempInfo.temperature.maximum);
        let minTemp = Math.round(tempInfo.temperature.minimum);

        let descript = tempInfo.condition.icon;
        let icon = changeIcoNext(descript);

        if (index < day && index < 4) {
          sideHTML =
            sideHTML +
            `<div
                            class="side__card col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12"
                          >
                            <div
                              class="side__weather-card my-2 p-2 d-flex flex-column justify-content-between align-items-center"
                            >
                              <div class="side__icon--wrap p-4">
                                ${icon}
                              </div>
                              <div
                                class="side__day-of-week d-flex flex-column align-items-center"
                              >
                                <p class="side__day m-0" id="side__day--1">${formatDay(
                                  tempInfo.time
                                )}</p>
                                <p class="side__weather-description m-0">
                                  ${tempInfo.condition.description}
                                </p>
                              </div>
                              <div
                                class="side__temp w-100 px-4 d-flex flex-row justify-content-between"
                              >
                                <div class="side__weather--max">
                                  <p class="side__max--text">
                                   <span class="side__max--temp celc-active">${maxTemp}</span> °
                                    
                                  </p>
                                </div>
                                <div class="side__weather--min">
                                  <p class="side__min--text">
                                    <span class="side__min--temp celc-active">${minTemp}</span> °
                                   
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>`;
        }
      });

      sideGrid.innerHTML = sideHTML;
    }

    axios.get(shecodesApi).then(showInfo);
  }

  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(displayForecast);
}

let beforeCelc = 0;

document.getElementById("search-input").addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    event.preventDefault();
    changeCity();
  }
});

function getLocation() {
  let picked = document.querySelector(".forecast--cels");
  picked.classList.add("picked");
  let notPicked = document.querySelector(".forecast--farh");
  notPicked.classList.remove("picked");
  function myPosition(position) {
    let lat = position.coords.latitude.toFixed(2);
    let lon = position.coords.longitude.toFixed(2);

    let apiKey = "a061ec7844e88361e25c005f78e2639f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`;

    function changeLocation(location) {
      beforeCelc = Math.round(location.data.main.temp);
      let myCity = location.data.name;
      let currentCity = document.getElementById("city-name");

      currentCity.innerHTML = myCity;

      let myTemp = Math.round(location.data.main.temp);
      let currentTemp = document.getElementById("temp-main");

      currentTemp.innerHTML = myTemp;

      let descriptionWeather = document.getElementById("forecast--descr");
      let humidity = document.getElementById("main-humidity");
      let windspeed = document.getElementById("main-windspeed");
      let nowForecastIco = document.getElementById("forecast-ico-wrap");

      let currentDescription = location.data.weather[0].description;
      let currentHumidity = location.data.main.humidity;
      let currentWindspeed = location.data.wind.speed;
      let forecastIcoId = location.data.weather[0].id;

      // console.log(hours);

      descriptionWeather.innerHTML = currentDescription;
      humidity.innerHTML = currentHumidity;
      windspeed.innerHTML = currentWindspeed;

      createIcon(forecastIcoId, nowForecastIco);

      let sideGrid = document.querySelector(".side__grid");
      let sideHTML = "";
      let shecodesKey = `4fa8474b4bc99d703a4c2teao58c4939`;
      let shecodesApi = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${shecodesKey}&units=metric`;

      function showInfo(response) {
        let forecast = response.data.daily;

        let sideGrid = document.querySelector(".side__grid");
        let sideHTML = "";

        forecast.forEach((tempInfo, index) => {
          let maxTemp = Math.round(tempInfo.temperature.maximum);
          let minTemp = Math.round(tempInfo.temperature.minimum);

          let descript = tempInfo.condition.icon;
          let icon = changeIcoNext(descript);

          if (index < day && index < 4) {
            sideHTML =
              sideHTML +
              `<div
                            class="side__card col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12"
                          >
                            <div
                              class="side__weather-card my-2 p-2 d-flex flex-column justify-content-between align-items-center"
                            >
                              <div class="side__icon--wrap p-4">
                                ${icon}
                              </div>
                              <div
                                class="side__day-of-week d-flex flex-column align-items-center"
                              >
                                <p class="side__day m-0" id="side__day--1">${formatDay(
                                  tempInfo.time
                                )}</p>
                                <p class="side__weather-description m-0">
                                  ${tempInfo.condition.description}
                                </p>
                              </div>
                              <div
                                class="side__temp w-100 px-4 d-flex flex-row justify-content-between"
                              >
                                <div class="side__weather--max">
                                  <p class="side__max--text">
                                   <span class="side__max--temp celc-active">${maxTemp}</span> °
                                    
                                  </p>
                                </div>
                                <div class="side__weather--min">
                                  <p class="side__min--text">
                                    <span class="side__min--temp celc-active">${minTemp}</span> °
                                   
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>`;
          }
        });

        sideGrid.innerHTML = sideHTML;
      }

      axios.get(shecodesApi).then(showInfo);
    }

    axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(changeLocation);
  }

  navigator.geolocation.getCurrentPosition(myPosition);
}

let findMeBtn = document.getElementById("find-me-btn");
findMeBtn.addEventListener("click", getLocation);

function tempFar(event) {
  event.preventDefault();
  let tempFar = document.getElementById("forecast--farh");
  let tempCel = document.getElementById("forecast--cels");

  let tempNextMax = document.querySelectorAll(".side__max--temp");
  let tempNextMin = document.querySelectorAll(".side__min--temp");

  // if (tempNextMin.classList.contains(active)) {
  //   for (let i = 0; i < tempNextMin.length; i++) {
  //     let temp = +tempNextMin[i];
  //     tempNextMin[i].innerText = `${temp}`;
  //   }
  // } else {

  for (let i = 0; i < tempNextMin.length; i++) {
    tempNextMin[i].classList.contains("celc-active") &&
      tempNextMin[i].classList.remove("celc-active");

    tempNextMax[i].classList.contains("celc-active") &&
      tempNextMax[i].classList.remove("celc-active");

    if (!tempNextMin[i].classList.contains("farh-active")) {
      let temp = +tempNextMin[i].innerHTML * 1.8 + 32;
      tempNextMin[i].innerText = `${temp.toFixed()}`;
      tempNextMin[i].classList.add("farh-active");
    }

    if (!tempNextMax[i].classList.contains("farh-active")) {
      let temp = +tempNextMax[i].innerHTML * 1.8 + 32;
      tempNextMax[i].innerText = `${temp.toFixed()}`;
      tempNextMax[i].classList.add("farh-active");
    }
  }
  // }

  let mainTemp = document.getElementById("temp-main");
  let mainTempValue = mainTemp.firstChild.nodeValue;

  mainTempValue = (beforeCelc * 1.8 + 32).toFixed();

  mainTemp.innerText = `${mainTempValue}`;
  tempFar.classList.add("picked");

  tempCel.classList.contains("picked") && tempCel.classList.remove("picked");
}

let tempFarh = document.getElementById("forecast--farh");
tempFarh.addEventListener("click", tempFar);

function tempCel(event) {
  event.preventDefault();
  let tempFar = document.getElementById("forecast--farh");
  let tempCel = document.getElementById("forecast--cels");

  let tempNextMax = document.querySelectorAll(".side__max--temp");
  let tempNextMin = document.querySelectorAll(".side__min--temp");

  let mainTemp = document.getElementById("temp-main");
  let mainTempValue = mainTemp.firstChild.nodeValue;

  mainTempValue = beforeCelc;
  mainTemp.innerHTML = `${mainTempValue}`;

  tempCel.classList.add("picked");
  tempFar.classList.contains("picked") && tempFar.classList.remove("picked");

  for (let i = 0; i < tempNextMax.length; i++) {
    tempNextMax[i].classList.contains("farh-active") &&
      tempNextMax[i].classList.remove("farh-active");

    tempNextMin[i].classList.contains("farh-active") &&
      tempNextMin[i].classList.remove("farh-active");

    if (!tempNextMax[i].classList.contains("celc-active")) {
      let temp = (+tempNextMax[i].innerHTML - 32) / 1.8;
      tempNextMax[i].innerText = `${temp.toFixed()}`;
      tempNextMax[i].classList.add("celc-active");
    }

    if (!tempNextMin[i].classList.contains("celc-active")) {
      let temp = (+tempNextMin[i].innerHTML - 32) / 1.8;
      tempNextMin[i].innerText = `${temp.toFixed()}`;
      tempNextMin[i].classList.add("celc-active");
    }
  }
}

let tempCelc = document.getElementById("forecast--cels");
tempCelc.addEventListener("click", tempCel);
