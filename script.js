const apiKey = '531161049a92fdaaa9b19e36f2c1ade0'; 

// Event listener for the "Search" button
document.getElementById("Submit").onclick = function(event) {
    const city = document.getElementById("search").value; // Get the city entered in the input field

    // Construct the API URL dynamically with the entered city name
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch the weather data
    fetch(apiUrl)
        .then(response => response.json()) 
        .then(data => {
            if (data.main && data.weather && data.main.temp !== undefined) {
                const temperature = data.main.temp;
                const weatherDescription = data.weather[0].description;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;

                // Get the elements where we will display the data
                const tempcolor = document.getElementById("colorchange");
                const temperatureElement = document.getElementById("Degrees");
                const humidityElement = document.getElementById("Humidity");
                const windSpeedElement = document.getElementById("wind-speed");
                const cityElement = document.getElementById("City");

                // Update the UI with the fetched data
                if (temperature > 30) {
                    // If temperature is greater than 30°C, set the color to orange
                    tempcolor.style.color = "orange";    
                    temperatureElement.textContent = `Temperature: ${temperature}°C`;
                } else if (temperature < 25) {
                    // If temperature is less than 25°C, set the color to blue
                    tempcolor.style.color = "#399cbd";
                    temperatureElement.textContent = `Temperature: ${temperature}°C`;
                } else {
                    // For temperatures between 25°C and 30°C, keep the default color
                    temperatureElement.style.color = "white";
                    temperatureElement.textContent = `Temperature: ${temperature}°C`;
                }

                // Display the other weather data
                humidityElement.textContent = `Humidity: ${humidity}%`;
                windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;

                // Log the weather data for debugging
                console.log(`Temperature in ${city}: ${temperature}°C`);
                console.log(`Weather: ${weatherDescription}`);
                console.log(`Humidity: ${humidity}%`);
                console.log(`Wind Speed: ${windSpeed} m/s`);

                // Set the city name in the UI
                cityElement.textContent = `City: ${city}`;
            } else {
                // If the data is missing or incorrect, display an error message
                document.getElementById("Degrees").textContent = "Sorry, we couldn't retrieve the weather data for this city.";
                console.error('Invalid city or API response:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // Display a generic error message if there is an issue with the API request
            document.getElementById("Degrees").textContent = "Error fetching weather data. Please try again later.";
        });
};
