//elements from html and css are selected via querySelector
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

//attaches a click event listener to a search button
search.addEventListener('click', () => {
    //weather data is getting fetched via APIkey
    const APIKey = '852ec1a7e1a3e6d8874500e22c1ecc38';
    const city = document.querySelector('.search-box input').value;
    // if city name empty no data returns
    if (city == '')
        return;
    //fetching weather from API via city name
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        
        //when city name returns error 
        if (json.cod == '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        //when city name is found
        if (cityHide.textContent == city) {
            return;
        }
        else {
            cityHide.textContent = city;

            //some attributes are added and some are removed
            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');
            //delaying a bit by setTimeout for good animation speed
            setTimeout(() => {
                container.classList.remove('active');
            }, 2200);

            //according to weather, picture is changed
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/sunny.png';
                    break;
    
                case 'Rain':
                    image.src = 'images/rainy.png';
                    break;
    
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
    
                case 'Clouds':
                    image.src = 'images/cloudy.png';
                    break;
    
                case 'Haze':
                    image.src = 'images/haze.png';
                    break;
    
                case 'Windy':
                    image.src = 'images/windy.png';
                    break;
    
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                
                case 'Thunderstorm':
                    image.src = 'images/thunderstorm.png';
                    break;

                default:
                    image.src = 'images/cloudy.png';
            }
            //temperature, humidity, wind is changed according to location with innerHTML tag(text part)
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`; //{parseInt} converts string argument in integer and it is used as a format here
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');
            
            //cloned elements of the upper elements are created
            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);
            
            //These clones are activated
            //only targeting recently created weather info elements by 'active-clone'
            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');

            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone');

            elCloneInfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.add('active-clone');
            
            //timout is set for smoother animation
            //creating time and space before to occur during the animation
            setTimeout(() => {
                //inserting clone weather info 'after'(afterend) the original weather info
                 infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                 infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                 infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
            }, 2200);
            
            //this ensures to target only the recently created cloned weather information elements
            const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
            //total number of elements retrieved
            const totalCloneInfoWeather = cloneInfoWeather.length;
            //If there's at least one cloned element this line selects the first element from the cloneInfoWeather list
            const cloneInfoWeatherFirst = cloneInfoWeather[0];

            const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
            const cloneInfoHumidityFirst = cloneInfoHumidity[0];

            const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
            const cloneInfoWindFirst = cloneInfoWind[0];
            
            //if there are any clone left then this condition stops it to stop the animation
            if (totalCloneInfoWeather > 0) {
                cloneInfoWeatherFirst.classList.remove('active-clone');
                cloneInfoHumidityFirst.classList.remove('active-clone');
                cloneInfoWindFirst.classList.remove('active-clone');
                
                //Removes the first cloned weather info element from the DOM
                //(js manipulating with html and css{with innerHTML, inneText, style, text-content} is the main work of document object model)
                 setTimeout(() => {
                    cloneInfoWeatherFirst.remove();
                    cloneInfoHumidityFirst.remove();
                    cloneInfoWindFirst.remove();
                }, 2200);
            }
        }
        
    });
});