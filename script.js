fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=germany&appid=55a24ff60e18a16eb522c3c3dba989f0"
)
  .then(function (response) {
    return response.json();
    //console.log(response.json());
  })
  .then(function (weathers) {
    console.log(weathers.weather[0].main);
  });

const menuBtn = document.getElementById("menuBtn");
const weatherWindow = document.getElementById("weatherWindow");
const searchWindow = document.getElementById("searchWindow");
menuBtn.addEventListener("click", function () {
  weatherWindow.style.display = "none";
  searchWindow.style.display = "block";
});
