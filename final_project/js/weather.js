const API_KEY = "68b591998f68747f3b7d2f6f2d29c27f";
const weather = document.querySelector(".js-weather");

function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    }). then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${temperature} \u00B0C @ ${place}`;
    })
}


function saveLocation(coords){
    localStorage.setItem("coords",JSON.stringify(coords));
}

function getLocationSuccess (position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }

    saveLocation(coordsObj);
}

function getLocationFail (position) {
    console.log("fail to get the location");
}

function init(){
    const savedLocation = localStorage.getItem("coords");

    if(savedLocation === null) {
        navigator.geolocation.getCurrentPosition(getLocationSuccess,getLocationFail);
    } else {
        const coords = JSON.parse(savedLocation);
        getWeather(coords.latitude,coords.longitude);
    }
    
};

init();
