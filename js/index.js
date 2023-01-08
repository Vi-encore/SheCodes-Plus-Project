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
  let nowForecastIco = document.getElementById("forecast-ico");

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
      const forecastIco = response.data;

      console.log(forecastIco);
      currentCity.innerHTML = `${foundCity}`;
      mainTemp.innerHTML = `${currentTemp}`;
      descriptionWeather.innerHTML = `${currentDescription}`;
      currentHumidity.innerHTML = humidity;
      currentWindspeed.innerHTML = windspeed;
    }
  }

  let apiKey = "a061ec7844e88361e25c005f78e2639f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${foundCity}`;

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

document.getElementById("search-input").addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    event.preventDefault();
    changeCity();
  }
});

/*function getLocation() {
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
findMeBtn.addEventListener("click", getLocation); */
