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
      console.log(response.data.daily);
      let forecast = response.data.daily;

      let sideGrid = document.querySelector(".side__grid");
      let sideHTML = "";

      forecast.forEach((tempInfo, index) => {
        let maxTemp = Math.round(tempInfo.temperature.maximum);
        let minTemp = Math.round(tempInfo.temperature.minimum);
        console.log(tempInfo.condition.description);

        if (index > day && index < 5) {
          sideHTML =
            sideHTML +
            `<div
                            class="side__card col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12"
                          >
                            <div
                              class="side__weather-card my-2 p-2 d-flex flex-column justify-content-between align-items-center"
                            >
                              <div class="side__icon--wrap p-4">
                                <i class="fa-regular fa-sun side__icon"></i>
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
                                   <span class="side__max--temp">${maxTemp}</span> °
                                    
                                  </p>
                                </div>
                                <div class="side__weather--min">
                                  <p class="side__min--text">
                                    <span class="side__min--temp">${minTemp}</span> °
                                   
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

  let foundCity = inputVal.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
  console.log(foundCity);

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

      console.log(forecastIco);
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
    //?????
    let lon = response.data.coord.lon.toFixed(2);
    let lat = response.data.coord.lat.toFixed(2);

    let sideGrid = document.querySelector(".side__grid");
    let sideHTML = "";

    days.forEach((day) => {
      sideHTML =
        sideHTML +
        `<div
                          class="side__card col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12"
                        >
                          <div
                            class="side__weather-card my-2 p-2 d-flex flex-column justify-content-between align-items-center"
                          >
                            <div class="side__icon--wrap p-4">
                              <i class="fa-regular fa-sun side__icon"></i>
                            </div>
                            <div
                              class="side__day-of-week d-flex flex-column align-items-center"
                            >
                              <p class="side__day m-0" id="side__day--1">${day}</p>
                              <p class="side__date--full">
                                <span class="side__date" id="side__date--1">14</span
                                >/<span class="side__month">07</span>/<span
                                  class="side__year"
                                  >2023</span
                                >
                              </p>
                            </div>
                            <div
                              class="side__temp w-100 px-3 d-flex flex-row justify-content-between"
                            >
                              <div class="side__weather--max">
                                <p class="side__max--text">
                                  14°
                                  <sup>
                                    <span class="side--cels picked">C</span>|<span
                                      class="side--farh"
                                      >F</span
                                    >
                                  </sup>
                                </p>
                              </div>
                              <div class="side__weather--min">
                                <p class="side__min--text">
                                  14°
                                  <sup>
                                    <span class="side--cels picked">C</span>|<span
                                      class="side--farh"
                                      >F</span
                                    >
                                  </sup>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>`;
    });

    sideGrid.innerHTML = sideHTML;

    function getForecast(coordinates) {
      // let hui = new Date();
      // let piska = hui.getDay();

      // console.log(coordinates.data.list[0].dt_txt);
      // let defDay = coordinates.data.list[0].dt_txt;
      // console.log(defDay);

      // let defDaySplit = defDay.split(" ");
      // let defDate = defDaySplit[0].split("-");

      // for (let i = 1; 1 < coordinates.data.list.length; i++) {
      //   defDate.includes(piska)
      //     ? (defDay = coordinates.data.list[i].dr_txt)
      //     : defDay;

      //   console.log(defDay);
      // }

      let change = coordinates.data.list[3].dt_txt;
      // console.log(change);

      let splitChange = change.split(" ");
      let splitDate = splitChange[0].split("-");
      let day = splitDate[2];
      let month = splitDate[1];
      let year = splitDate[0];
      console.log(day, month, year);
    }

    let newApiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(newApiUrl).then(getForecast);
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
  function myPosition(position) {
    let lat = position.coords.latitude.toFixed(2);
    let lon = position.coords.longitude.toFixed(2);
    console.log(lat, lon);

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

  let sideMaxWrap = document.querySelectorAll(".side__max--text");
  let sideMinWrap = document.querySelectorAll(".side__min--text");
  // console.log(sideMaxWrap);

  let mainTemp = document.getElementById("temp-main");
  let mainTempValue = mainTemp.firstChild.nodeValue;
  //   console.log(mainTempValue);
  //   console.log(typeof mainTemp);
  mainTempValue = (beforeCelc * 1.8 + 32).toFixed();

  let tempNextMax = document.querySelectorAll(".side__max--temp");
  let tempNextMin = document.querySelectorAll(".side__min--temp");

  // let shecodesKey = `4fa8474b4bc99d703a4c2teao58c4939`;
  // let shecodesApi = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${shecodesKey}&units=metric`;

  // function changeTempCard(response) {
  //   console.log(response);
  // }

  // axios.get(shecodesApi).then(changeTempCard);

  // console.log(tempNextMin);
  // tempNextMax.forEach((element) => {
  //   let maxTempValue = element.firstChild.nodeValue;
  //   maxTempValue = (maxTempValue * 1.8 + 32).toFixed();
  //   // tempNextMax.innerHTML = `${maxTempValue}`;
  //   element.textContent = maxTempValue;
  //   console.log(element.textContent);
  // });

  // tempNextMin.forEach((element) => {
  //   let minTempValue = element.firstChild.nodeValue;
  //   minTempValue = (minTempValue * 1.8 + 32).toFixed();
  //   element.textContent = minTempValue;
  // });
  //console.log(mainTempValue);

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

  let sideMaxWrap = document.querySelectorAll(".side__max--text");
  let sideMinWrap = document.querySelectorAll(".side__min--text");

  let tempNextMax = document.querySelectorAll(".side__max--temp");
  let tempNextMin = document.querySelectorAll(".side__min--temp");

  // tempNextMax.forEach((element) => {
  //   console.log(element);
  //   let maxTempValue = element.firstChild.nodeValue;
  //   maxTempValue = ((maxTempValue - 32) * 0.5556).toFixed();
  //   element.textContent = maxTempValue;
  // });

  // tempNextMin.forEach((element) => {
  //   console.log(element);
  //   let minTempValue = element.firstChild.nodeValue;
  //   minTempValue = ((minTempValue - 32) * 0.5556).toFixed();
  //   element.textContent = minTempValue;
  // });

  let mainTemp = document.getElementById("temp-main");
  let mainTempValue = mainTemp.firstChild.nodeValue;

  mainTempValue = beforeCelc;
  mainTemp.innerHTML = `${mainTempValue}`;

  tempCel.classList.add("picked");
  tempFar.classList.contains("picked") && tempFar.classList.remove("picked");
}

let tempCelc = document.getElementById("forecast--cels");
tempCelc.addEventListener("click", tempCel);
