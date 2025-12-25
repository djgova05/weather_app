
const API_KEY = 'e3c9415b1f208b4d87976fd33483d5c3';


const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const tempElement = document.getElementById('temp');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const forecastContainer = document.getElementById('forecastContainer');


async function fetchWeather(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    try {
        //current weather
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherResponse.ok) {
            // Update current weather 
            tempElement.textContent = `${weatherData.main.temp} °C`;
            humidityElement.textContent = `${weatherData.main.humidity}%`;
            windElement.textContent = `${weatherData.wind.speed} m/s`;
        } else {
            throw new Error(weatherData.message);
        }

        // Fetch 5-day forecast
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        if (forecastResponse.ok) {
            updateForecast(forecastData);
        } else {
            throw new Error(forecastData.message);
        }

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

// Update 5-day forecast 
function updateForecast(forecastData) {
    forecastContainer.innerHTML = ''; // Clearing old forecast

    // Get one entry per day
    const forecastList = forecastData.list.filter((_, index) => index % 8 === 0);

    forecastList.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('forecast-day');
        dayDiv.innerHTML = `
            <h3>${new Date(day.dt * 1000).toLocaleDateString()}</h3>
            <p>Temp: ${day.main.temp}°C</p>
            <p>Humidity: ${day.main.humidity}%</p>
            <p>Wind: ${day.wind.speed} m/s</p>
        `;
        forecastContainer.appendChild(dayDiv);
    });
}


searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});
