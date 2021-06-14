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
  moscow: {
    temp: -5,
    humidity: 20,
  },
};
let now = new Date();

function currentTime(Date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[Date.getDay()];
  let hours = Date.getHours();
  if (hours < 10) hours = `0${hours}`;
  let minutes = Date.getMinutes();
  if (minutes < 10) minutes = `0+${minutes}`;

  let h1 = document.querySelector("h1");

  h1.innerHTML = `${currentDay} ${hours}:${minutes}`;

  return h1;
}
currentTime(now);

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#conditions").innerHTML =
    response.data.weather[0].main;
}

function search(city) {
  let apiKey = "cc417ec5cd357e8e018ba30aead4439a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#look-up-city").value;
  search(city);
}
let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

function seePosition(position) {
  let apiKey = "cc417ec5cd357e8e018ba30aead4439a";
  let positionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(positionUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(seePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getPosition);

search("New York");
