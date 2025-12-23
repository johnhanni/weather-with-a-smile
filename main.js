const API_KEY = "192ecc81a54b81f228240143caf12ef3";

const form = document.getElementById("weatherForm");

form.addEventListener("submit", (event) => {
    console.log("Form submit fired successfully!")
    event.preventDefault();
    const location = document.getElementById("location-input").value;
    if (location) {fetchWeather(location);
    } else {
        displayError("Location field is empty.  Please type a city into the box.");
    }
});

function fetchWeather(location) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`;

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`You entered ${location}.  No weather data was found for ${location}.`);
            }
            return response.json();
            })
        .then(data => {
            displayWeather(data);
            console.log(data);
        })
        .catch(error => displayError(error.message));

}

function displayWeather(data) {
    document.getElementById("error-message").textContent = "";
    document.getElementById("display-location").textContent = `Weather in ${data.name}`;
    document.getElementById("display-temperature").textContent = `Temperature ${data.main.temp}°F`;
    document.getElementById("display-weather-description").textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById("display-humidity").textContent = `Humidity: ${data.main.humidity}%`;
}

function displayError(message) {
    document.getElementById("error-message").textContent = message;
    document.getElementById("display-location").textContent = "";
    document.getElementById("display-temperature").textContent = "";
    document.getElementById("display-weather-description").textContent = "";
    document.getElementById("display-humidity").textContent = "";
}
