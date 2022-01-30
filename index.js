
const search= document.getElementById("search")
const userInput= document.getElementById("userInput")
const apiKey="d9bf63649835fe47190aec204770630a"
const forecast= document.querySelector("#cityRow")
const cityName= document.querySelector(".cityName")
const weatherIcon = document.querySelector(".weatherIcon")
const temp= document.querySelector(".temp")
const humidity= document.querySelector(".humidity")
const windSpeed= document.querySelector(".windSpeed")
const weatherRow= document.querySelector("#weatherRow")
 
search.addEventListener("click",(e)=>{
    e.preventDefault()
    
    const userCity= userInput.value
    console.log("click",userCity)
    getCurrentWeather(userCity)
})

function getCurrentWeather(city){
    console.log (city)
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    fetch(url)
    .then(function (res){
        return res.json()
    })
    .then(function (data){
        console.log(data)
        displayCurrentWeather(data)
    })
}

function displayCurrentWeather(weather){
console.log("this is from the function", weather)
cityName.textContent="city Name"+""+weather.name
weatherIcon.setAttribute("src",`https://openweathermap.org/img/w/${weather.weather[0].icon}.png;`)
forecast.append (cityName,weatherIcon)
}