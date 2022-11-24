let weather = {
    "apiKey": "736560af68ec20fdcbe7337121658837",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city + "&units=metric&appid=" 
            + this.apiKey
            ).then((response) => response.json()).then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const { name } = data;
        const { description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp;
        document.querySelector(".units").innerText = "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function() {
        this.fetchWeather(document.querySelector('.search-bar').value);
    }
};

document.querySelector('.search button').addEventListener('click', function() {
    weather.search();
});

// change units button
document.querySelector(".change-units-button").addEventListener('click', function() {
    let currentTemp = document.querySelector(".temp").innerText;
    let currentUnits = document.querySelector(".units").innerText;
    if (currentUnits.charAt(currentUnits.length - 1) === "C") {
        document.querySelector(".temp").innerText = parseFloat(((currentTemp * 1.8) + 32)).toFixed(2);
        document.querySelector(".units").innerText = "°F";
    } else if (currentUnits.charAt(currentUnits.length - 1) === "F") {
        document.querySelector(".temp").innerText = parseFloat(((currentTemp - 32) / 1.8)).toFixed(2);
        document.querySelector(".units").innerText = "°C";
    }
})
