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


