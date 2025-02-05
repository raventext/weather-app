const API_KEY = "cb21829b381fb69583d6cfb9d9d685ce";

document.addEventListener("DOMContentLoaded", () => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
        document.getElementById("cityInput").value = savedCity;
        getWeather(savedCity);
    }
});


document.getElementById("cityInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

function getWeather(city = null) {
    let cityName = city || document.getElementById("cityInput").value.trim();

    if (!cityName) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("City not found!");
                return;
            }

            localStorage.setItem("lastCity", cityName); 

            document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById("temperature").innerText = `${data.main.temp}°C`;
            document.getElementById("feelsLike").innerText = `Feels Like: ${data.main.feels_like}°C`; 
            document.getElementById("weatherCondition").innerText = data.weather[0].description;

            const date = new Date();
            document.getElementById("dateTime").innerText = `Local Time: ${date.toLocaleTimeString()}`;

            
            changeBackground(data.weather[0].main);
        })
        .catch(error => console.error("Error fetching weather:", error));
}

function changeBackground(weatherCondition) {
    let gifUrl;
    
   
    switch (weatherCondition) {
        case "Clear":
            gifUrl = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGdlb2o1em85a2U2Nmg3eGx1aTZ0eXk4MTRvd2gyaDlrY2ttajZoeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0Styincf6K2tvfjb5Q/giphy.gif"; // Clear sky GIF
            break;
        case "Clouds":
            gifUrl = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDRid2xxb3hqY2xscDd5b2pzb3VteXpyZjJtNnNlYWozaW1sdTMyNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1J9JrxgSYFB1mqYg/giphy.gif"; // Cloudy sky GIF
            break;
        case "Rain":
            gifUrl = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDRndzJ4bGdhZ3N5bW9zcWcyNnVoYmw2ZW9ubDRrYWoyMzUyZWdkdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JjCONbj0yRnyurCW9D/giphy.gif"; // Rainy weather GIF
            break;
        case "Snow":
            gifUrl = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHQxbXg3YmhkenFzb2VhdGpyb3NiOTFsaHhjNjdwNWVyOTJmY3NmOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KOLSQibzWhfj4vHBaK/giphy.gif"; // Snowy weather GIF
            break;
        case "Thunderstorm":
            gifUrl = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3NqdWtqNHd3YXBsbDdocmNvaDk1bzA2aGl1YmlsajhhYjNiaWUwNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HpRPizLQTbnIA/giphy.gif"; // Thunderstorm GIF
            break;
        default:
            gifUrl = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2l1Y3FpM2YzaHFqM2F5bGx6Znd1NWRtZGt5djkydGVxc3c4MWV1NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rp0CyaUEquZ5qmO92s/giphy.gif"; // Default GIF
            break;
    }
   document.body.style.background = `url(${gifUrl}) no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover"; 
}

   
  
