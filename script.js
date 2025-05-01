const apiKey = "5ccd6343ab445afd0777dfebc6347407";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")
async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl +city+ `&appid=${apiKey}`);

        if(response.status==404){
            document.querySelector(".error").style.display="block";
            document.querySelector(".weather").style.display="none";
        }
        else{

        }
        const data = await response.json();  // ✅ Await this

        console.log(data);

        if (data.cod === 200) {  // ✅ Check for successful response
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed+"km/h";

            if(data.weather[0].main == "Clouds"){
                weatherIcon.src = "imgs/imgs/clouds.png"
            }
            else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "imgs/imgs/clear.png";
            }
            else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "imgs/imgs/rain.png";
            }
            else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src = "imgs/imgs/drizzle.png";
            }
            else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "imgs/imgs/mist.png";
            }
            document.querySelector(".weather").style.display="block";
            document.querySelector(".error").style.display="none";

        } else {
            alert(`Error: ${data.message}`);
        }

    } catch (error) {
        console.error("Fetch error:", error);
        alert("Unable to fetch weather data.");
    }
}
searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
});
