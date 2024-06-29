const areaView = document.querySelector(".weather_leftArea");
const area = document.querySelector(".weather_areaName p");
const countries = document.querySelector(".weather_areaName span");
const currentTime = document.querySelector(".time");
const daynDate = document.querySelector(".daydate");
const currenttemprature = document.querySelector(".weather_today span");
const areaTemp = document.querySelector(".area_temprature p span");
const infor = document.querySelector(".info");
const searchbox = document.querySelector("form input");
const searchWeather = document.querySelector("form i");
const feelLike = document.querySelector(".feels p span");
const humadity = document.querySelector(".area_humadity p span");
const windspeed = document.querySelector(".windSpeed p span");
const belowSearch = document.querySelector(".weather_searched");
const quote = document.querySelector(".quote");
const submit = document.querySelector("form");

const getWeather = async () => {
    const apiKey = "213e9c5deb6eb2bcb5b4874d43eee822";
    const city = searchbox.value.trim() !== "" ? searchbox.value : "Delhi";
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    let data = await fetch(weatherApi, {
        headers: {
            accept: "application/json",
        }
    });
    let response = await data.json();

    const getImages = async () => {
        const page = 1;
        const imgapiKey = "9f6qRqWeOliPJOmoK5jQWlU2c2QpvBJKHMuiVnYNgMA";
        const imgApi = `https://api.unsplash.com/search/photos?page=${page}&query=${city}&client_id=${imgapiKey}`;

        let imgget = await fetch(imgApi);
        let getimg = await imgget.json();

        const actualName = (code) => {
            return new Intl.DisplayNames([code], { type: 'region' }).of(code);
        }

        const quotes = async () => {
            let response = await fetch("https://api.quotable.io/random");
            let final = await response.json();
            quote.textContent = `"${final.content}"`;
        }
        quotes();

        const manipulate = () => {
            area.textContent = city;
            countries.textContent = `${actualName(response.sys.country)}`;
            currenttemprature.innerHTML = `${response.main.temp}&degC`;
            areaTemp.innerHTML = `${response.main.temp}&degC`;
            feelLike.innerHTML = `${response.main.feels_like}&degC`;
            humadity.innerHTML = `${response.main.humidity}%`;
            windspeed.textContent = response.wind.speed + "km/h";
            belowSearch.childNodes[1].textContent = city;
            belowSearch.childNodes[3].innerHTML = `${actualName(response.sys.country)}`;
            areaView.style.backgroundImage = `url(${getimg.results[3].urls.regular})`;
            infor.childNodes[3].innerHTML = `${response.weather[0].main}`;

            if (response.weather[0].main === "Drizzle") {
                infor.childNodes[1].src = "drizzle.png";
            } else if (response.weather[0].main === "Mist") {
                infor.childNodes[1].src = "mist.png";
            } else if (response.weather[0].main === "Rain") {
                infor.childNodes[1].src = "rain.png";
            } else if (response.weather[0].main === "Haze") {
                infor.childNodes[1].src = "haze.png";
            } else if (response.weather[0].main === "Snow") {
                infor.childNodes[1].src = "snow.png";
            } else if (response.weather[0].main === "Clear") {
                infor.childNodes[1].src = "clear.png";
            }
        }
        manipulate();
    }
    getImages();
}

searchWeather.addEventListener("click", getWeather);
getWeather();
