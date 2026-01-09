const api = "ee9cfe85bfd4faecc00904ed7de11bce";

const cityInput = document.getElementById('search1');
const searchbtn = document.getElementById('search2');
const temp = document.getElementById('temp');
const loc = document.getElementById('location');
const dates = document.getElementById('date1');
const windspeed = document.getElementById('winspeed');
const climateType = document.getElementById('climate_type');
const img = document.getElementById('img');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');



let currdate = new Date();

searchbtn.onclick = function (e) {
    e.preventDefault();

    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    getweather(city);
};

async function getweather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
        alert("Location not found. Please enter a valid city.");
        return;
    }

    const temperature = Math.round(data.main.temp);

    temp.textContent = temperature + "°C";
    loc.textContent = data.name ;
    
    dates.textContent = currdate.toDateString();
    windspeed.textContent = "Wind Speed: " + data.wind.speed + " m/s";
   humidity.textContent = "Humidity: " + data.main.humidity + "%";
   pressure.textContent = "Pressure: " + data.main.pressure + " hPa";
    const condition = data.weather[0].main;
    climateType.textContent = condition;


    // Change weather icon
    if (condition === "Clear") {
        if (temperature <= 5) {
            img.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
        } else {
            img.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }
    else if (condition === "Clouds") {
        img.innerHTML = '<i class="fa-solid fa-cloud"></i>';
    }
    else if (condition === "Rain") {
        img.innerHTML = '<i class="fa-solid fa-cloud-showers-heavy"></i>';
    }
    else if (condition === "Snow") {
        img.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
    }
    else if (condition === "Thunderstorm") {
        img.innerHTML = '<i class="fa-solid fa-cloud-bolt"></i>';
    }
    else {
        img.innerHTML = '<i class="fa-solid fa-smog"></i>';
    }
}
