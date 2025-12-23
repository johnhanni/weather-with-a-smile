const API_KEY = "192ecc81a54b81f228240143caf12ef3";

const form = document.getElementById("weatherForm");

form.addEventListener("submit", (event) => {
    console.log("Form submit fired successfully!")
    event.preventDefault();
    const location = document.getElementById("location-input").value;
    if (location) {
        fetchWeather(location);
    } else {
        displayError("Location field is empty.  Please type a city into the box.");
    }
});

// Practice code for displaying array data using DOM manipulation and for loop

const sampleArrayDisplay = [
    "First slide",
    "Second slide",
    "Third slide",
    "Fourth slide"
];

let index = 0;

// This function cycles through the array data using a modulo operator to restart when at the last data point
function arraySlideshow(arr) {
    const arrayDataDisplay = document.getElementById("slideshowContent");
    arrayDataDisplay.textContent = arr[index];
    index = (index + 1) % arr.length;
}


// End practice code

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
        arraySlideshow(data); // call function for practice code challenge
        setInterval(() => {
            arraySlideshow(data);
        }, 3000) // 
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
