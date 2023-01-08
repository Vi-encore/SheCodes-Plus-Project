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
// console.log(typeof month);

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

      forecastIco > 200 && forecastIco < 232
        ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-cloud-bolt forecast__pic" id="forecast-ico"></i>`)
        : forecastIco > 300 && forecastIco < 321
        ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-cloud-rain forecast__pic" id="forecast-ico"></i>`)
        : forecastIco > 500 && forecastIco < 504
        ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-cloud-rain forecast__pic" id="forecast-ico"></i>`)
        : forecastIco === 511
        ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-snowflake forecast__pic" id="forecast-ico"></i>`)
        : forecastIco > 520 && forecastIco < 531
        ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy forecast__pic" id="forecast-ico"></i>`)
        : forecastIco > 600 && forecastIco < 622
        ? (nowForecastIco.innerHTML = `<i class="fa-regular fa-snowflake forecast__pic" id="forecast-ico"></i>`)
        : forecastIco > 701 && forecastIco < 771
        ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-smog forecast__pic" id="forecast-ico"></i>`)
        : forecastIco === 781
        ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-tornado forecast__pic" id="forecast-ico"></i>`)
        : forecastIco === 800
        ? hours > 19 || hours < 5
          ? (nowForecastIco.innerHTML = `<i class="fa-regular fa-moon forecast__pic" id="forecast-ico"></i>`)
          : (nowForecastIco.innerHTML = `<i class="fa-regular fa-sun forecast__pic" id="forecast-ico"></i>`)
        : forecastIco === 801
        ? hours > 19 || hours < 5
          ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-cloud-moon forecast__pic" id="forecast-ico"></i>`)
          : (nowForecastIco.innerHTML = `<i class="fa-solid fa-cloud-sun forecast__pic" id="forecast-ico"></i>`)
        : forecastIco > 801
        ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-cloud forecast__pic" id="forecast-ico"></i>`)
        : (nowForecastIco.innerHTML = `<i class="fa-regular fa-sun forecast__pic" id="forecast-ico"></i>`);
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

      console.log(hours);

      descriptionWeather.innerHTML = currentDescription;
      humidity.innerHTML = currentHumidity;
      windspeed.innerHTML = currentWindspeed;

      forecastIcoId > 200 && forecastIcoId < 232
        ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-cloud-bolt forecast__pic" id="forecast-ico"></i>`)
        : forecastIcoId > 300 && forecastIcoId < 321
        ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-cloud-rain forecast__pic" id="forecast-ico"></i>`)
        : forecastIcoId > 500 && forecastIcoId < 504
        ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-cloud-rain forecast__pic" id="forecast-ico"></i>`)
        : forecastIcoId === 511
        ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-snowflake forecast__pic" id="forecast-ico"></i>`)
        : forecastIcoId > 520 && forecastIcoId < 531
        ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy forecast__pic" id="forecast-ico"></i>`)
        : forecastIcoId > 600 && forecastIcoId < 622
        ? (nowForecastIco.innerHTML = `<i class="fa-regular fa-snowflake forecast__pic" id="forecast-ico"></i>`)
        : forecastIcoId > 701 && forecastIcoId < 771
        ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-smog forecast__pic" id="forecast-ico"></i>`)
        : forecastIcoId === 781
        ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-tornado forecast__pic" id="forecast-ico"></i>`)
        : forecastIcoId === 800
        ? hours > 19 || hours < 5
          ? (nowForecastIco.innerHTML = `<i class="fa-regular fa-moon forecast__pic" id="forecast-ico"></i>`)
          : (nowForecastIco.innerHTML = `<i class="fa-regular fa-sun forecast__pic" id="forecast-ico"></i>`)
        : forecastIcoId === 801
        ? hours > 19 || hours < 5
          ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-cloud-moon forecast__pic" id="forecast-ico"></i>`)
          : (nowForecastIco.innerHTML = `<i class="fa-solid fa-cloud-sun forecast__pic" id="forecast-ico"></i>`)
        : forecastIcoId > 801
        ? (nowForecastIco.innerHTML = `<i class="fa-solid fa-cloud forecast__pic" id="forecast-ico"></i>`)
        : (nowForecastIco.innerHTML = `<i class="fa-regular fa-sun forecast__pic" id="forecast-ico"></i>`);
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
  let mainTemp = document.getElementById("temp-main");
  let mainTempValue = mainTemp.firstChild.nodeValue;
  //   console.log(mainTempValue);
  //   console.log(typeof mainTemp);
  mainTempValue = (beforeCelc * 1.8 + 32).toFixed();
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
  let mainTemp = document.getElementById("temp-main");
  let mainTempValue = mainTemp.firstChild.nodeValue;

  mainTempValue = beforeCelc;
  mainTemp.innerHTML = `${mainTempValue}`;

  tempCel.classList.add("picked");
  tempFar.classList.contains("picked") && tempFar.classList.remove("picked");
}

let tempCelc = document.getElementById("forecast--cels");
tempCelc.addEventListener("click", tempCel);
