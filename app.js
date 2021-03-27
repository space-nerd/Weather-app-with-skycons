window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureDesription = document.querySelector(".temperature-desription");
    let locationPlace = document.querySelector(".location-place");
    let icon = "";
    let apiKey = "Put your API key here";


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;
            fetch(api)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            console.log(data);
            let temp = data.main.temp;
            let description = data.weather[0].main;
            let location = data.name;
            let iconType = data.weather[0].description;

            temperatureDegree.textContent = temp;
            temperatureDesription.textContent = description;
            locationPlace.textContent = location;

            if(iconType == 'clear sky'){
                icon = "CLEAR_DAY";
                console.log(icon, iconType)
            } else if (iconType == 'few clouds'){
                icon = "PARTY_CLOUDY_DAY";
                console.log(icon, iconType)
            } else if (iconType == 'snow'){
                icon = "SNOW";
                console.log(icon, iconType)
            } else if(iconType == 'heavy intensity rain') {
                icon = "RAIN";
                console.log(icon, iconType)
            } else if(iconType == 'overcast clouds') {
                icon= "CLOUDY";
                console.log(icon, iconType)
            } else {
                icon = "CLOUDY";
                console.log(icon, iconType)
            }

            setIcons(icon, document.querySelector('.icon'));
        });
        });
    } 
    
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "#ffffff"});
        const currentIcon = icon;
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});