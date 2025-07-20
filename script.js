const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "f3bc349c3b87fccd06a369b0df898091";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        console.log(weather_data); // For debugging

        if (weather_data.cod === "404") {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("Location not found");
            return;
        }

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

        const weatherCondition = weather_data.weather[0].main;
switch (weatherCondition) {
    case 'Clouds':
        weather_img.src = `assets/cloud.png?${new Date().getTime()}`;
        break;
    case 'Clear':
        weather_img.src = `assets/clear.png?${new Date().getTime()}`;
        break;
    case 'Rain':
    case 'Drizzle':
    case 'Thunderstorm':
        weather_img.src = `assets/rain.png?${new Date().getTime()}`;
        break;
    case 'Mist':
    case 'Haze':
    case 'Fog':
    case 'Smoke':
        weather_img.src = `assets/mist.png?${new Date().getTime()}`;
        break;
    case 'Snow':
        weather_img.src = `assets/snow.png?${new Date().getTime()}`;
        break;
    default:
        weather_img.src = `assets/default.png?${new Date().getTime()}`;
        console.log("No matching weather icon found for:", weatherCondition);
}



    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city !== "") {
        checkWeather(city);
    }
});
