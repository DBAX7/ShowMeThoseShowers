const search= document.getElementById("search")
const userInput= document.getElementById("userInput")
const apiKey="d9bf63649835fe47190aec204770630a"
const forecast= document.querySelector("#cityRow")
const cityName= document.querySelector(".cityName")
// const weatherIcon = document.querySelector(".weatherIcon")
const temp= document.querySelector(".temp")
const humidity= document.querySelector(".humidity")
const windSpeed= document.querySelector(".windSpeed")
const weatherRow= document.querySelector("#weatherRow")
const forecastCards= document.getElementById("forecastCards")
 // this is the event that makes all the other functions work because they are all linked together
search.addEventListener("click",(e)=>{
    e.preventDefault()
    
    const userCity= userInput.value
    console.log("click",userCity)
    getCurrentWeather(userCity)
})
// function that grabs the information from the api through the fetch - this is the first fetch
//for the current weather. the only thing we get here is the information. 
function getCurrentWeather(city){
    console.log (city)
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    fetch(url)
    .then(function (res){
        return res.json()
    })
    // this is where the info we received lives, that is why we call functions that need it here. 
    .then(function (data){
        console.log(data)
        //these are the variables we need to do the second call 
        const lon = data.coord.lon
        const lat =data.coord.lat
        //This is where we feed the information to our next function that has the job of 
        //display on the index.html and therefore the website, the information we are choosing to 
        //show
        displayCurrentWeather(data)
        //here we are passing the two variables we need to do the second call
        getForecast(lon, lat)
    })
}


// the process inside this function is what allows us to choose different cities
//but always display the same information for all of them
function displayCurrentWeather(weather){
console.log("this is from the function", weather)
cityName.textContent="City Name"+" "+weather.name
const weatherIcon= document.createElement("img")
weatherIcon.setAttribute("src",`https://openweathermap.org/img/w/${weather.weather[0].icon}.png;`)
temp.textContent= "Temperature:"+ " " + weather.main.temp+"C"
humidity.textContent=" Humidity:" + " "+ weather.main.humidity + "%"
windSpeed.textContent= "Wind Speed:" + " " + weather.wind.speed + "MPH"
forecast.append (cityName,weatherIcon)
weatherRow. append(temp, humidity, windSpeed)
}

//This is our second fetch that cannot happen without the first because we need the lon and lat
//this call with bring us the information on the forecast for then next 4-5 days and the uvi index. 
function getForecast(lon, lat){
    const url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`

    fetch(url)
    .then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log(data)
        displayForecast(data)
    })

}

//this function's only jon like the displayCurrentWeather is to put the information received on the 
//page for the user to see. 
function displayForecast(data){
 const forecastdays=5

 for (let i=0; i<forecastdays; i++){

    const cardBody= document.createElement("div")
    cardBody.setAttribute("class", "card-body")
    const cardText= document.createElement("div")
    cardText.setAttribute("class", "card-text")
    const forecastTemp = document.createElement("p")
    forecastTemp.textContent= "Temperature:" + " " + data.daily[i].temp.day

    cardText.append(forecastTemp)
    cardBody.append(cardText)
    forecastCards.append(cardBody)
 }}
 
 