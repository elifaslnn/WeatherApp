const menuBtn = document.getElementById("menuBtn");
const weatherWindow = document.getElementById("weatherWindow");
const searchWindow = document.getElementById("searchWindow");
const weatherCondition = document.getElementById("weatherCondition");

menuBtn.addEventListener("click", function () {
  weatherWindow.style.display = "none";
  searchWindow.style.display = "block";
});

//remove the list
const citiesList = document.getElementById("cities");

citiesList.addEventListener("click", (e) => {
  if (e.target.className === "fa-solid fa-x") {
    e.target.parentElement.parentElement.remove();
  }
  if (
    e.target.className ===
    "col-1 mr-1 d-flex justify-content-center align-items-center"
  ) {
    e.target.parentElement.remove();
  }
  if (e.target.className === "col d-flex justify-content-start cityc") {
    searchWindow.style.display = "none";
    weatherWindow.style.display = "block";
    if (e.target.innerHTML === "Konumum") {
      find_location();
    } else {
      change_city(e.target.innerHTML);
    }
  }
});

//add to list

const input = document.querySelector("#searchBox");
input.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    console.log(input.value);
    let newCity = document.createElement("li");
    newCity.className = "city d-flex";
    const div_one = document.createElement("div");
    div_one.className = "col d-flex justify-content-start cityc";
    div_one.innerHTML = input.value;

    const div_two = document.createElement("div");
    div_two.className =
      "col-1 mr-1 d-flex justify-content-center align-items-center";
    div_two.id = "deleteBtn";
    div_two.style =
      "background-color: #00000063; width: 20px; border-radius: 5px";

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-x";
    icon.style = "color: #c32222; font-size: 15px";

    div_two.appendChild(icon);
    newCity.appendChild(div_one);
    newCity.appendChild(div_two);
    citiesList.appendChild(newCity);
    input.value = "";
  }
});

//find the location
const find_location = () => {
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude + " - " + longitude);
    fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=55a24ff60e18a16eb522c3c3dba989f0`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        const city = data[0].name;
        return city;
      })
      .then((city) => {
        change_city(city);
      });
  };
  const error = () => {
    change_city("İstanbul");
  };
  navigator.geolocation.getCurrentPosition(success, error);
  //latitude:enlem
  //longitude:boylam
};
//change the city
const cityName = document.getElementById("cityName");
function change_city(city_to_replace) {
  cityName.innerText = city_to_replace;
  change_weather(city_to_replace);
}

//change the weather
const change_weather = (city_to_replace) => {
  new Promise((resolve, reject) => {
    resolve(city_to_replace);
    reject();
  }).then((data) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=55a24ff60e18a16eb522c3c3dba989f0`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (weathers) {
        console.log(weathers);
        const weather = weathers.weather[0].main;
        weatherCondition.innerHTML = weather;
        change_weatherIcon(weather);

        const windSpeed = weathers.wind.speed;
        change_windSpeed(Math.floor(windSpeed));

        const humidity = weathers.main.humidity;
        change_humidity(humidity);

        const temp = weathers.main.temp;
        change_temp(Math.floor(temp));
      });
  });
};

const weatherIcon = document.getElementById("weatherIcon");
const change_weatherIcon = (weather) => {
  if (weather == "Clouds") {
    weatherIcon.src = "weatherIcon/cloudy.png";
  } else if (weather === "Rain") {
    weatherIcon.src = "weatherIcon/rain.png";
  } else if (weather === "Clear") {
    weatherIcon.src = "weatherIcon/sun.png";
  } else if (weather === "snow") {
    weatherIcon.src = "weatherIcon/snow.png";
  }
};

const windSpeed = document.getElementById("windSpeed");
const change_windSpeed = (speed) => {
  windSpeed.innerHTML = speed * 3.6 + " km/s";
};

const humidity = document.getElementById("humidity");
const change_humidity = (humidityData) => {
  humidity.innerText = humidityData + "%";
};

const temp = document.getElementById("temp");
const change_temp = (tempData) => {
  temp.innerHTML = tempData - 273 + "°";
};

//konumu algılasın onunla başlasın
find_location();
//fetch- catch yapısı
//hava durumuna göre renk
//saate göre renk
