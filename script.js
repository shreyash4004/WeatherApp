const userTab=document.querySelector('[data-userWeather]');
const searchTab=document.querySelector('[data-searchWeather]')
const wrapperWeather=document.querySelector('.weather-container')

const grantContainer=document.querySelector('.grant-location-container');
const formContainer=document.querySelector(['.form-container'])
const loadContainer=document.querySelector('.loading-container')
const userInfo=document.querySelector('.user-info-container')


let currentTab=userTab
let API_KEY='d1845658f92b31c64bd94f06f7188c9c';
currentTab.classList.add("current-tab");
getfromSessionStorage()
function showTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab")
        currentTab=clickedTab;
        currentTab.classList.add("current-tab")

        if(!formContainer.classList.contains("active")){
            formContainer.classList.add("active");
            grantContainer.classList.remove("active")
            userInfo.classList.remove("active")
            loadContainer.classList.remove("active")
            
        }
        else{
            formContainer.classList.remove('active')
            userInfo.classList.remove('active')
            getfromSessionStorage();
        }
    }
}
userTab.addEventListener('click', () => {
    showTab(userTab);

});
searchTab.addEventListener('click', () => {
    showTab(searchTab);

});

function getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantContainer.classList.add("active")
        loadContainer.classList.remove("active")
        userInfo.classList.remove("active")
    } else{
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeather(coordinates);
    }
}

async function fetchUserWeather(coordinates){
   let lat=coordinates.latitude
   let lon=coordinates.longitude
    // console.log(lat)
    // console.log(lon)
    grantContainer.classList.remove("active");
    loadContainer.classList.add("active");

    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        const data=await response.json();
        console.log(data)
        loadContainer.classList.remove("active");
        userInfo.classList.add("active");
        renderInfo(data)
    
    }
    catch(err){

    }
}

function renderInfo(weatherInfo){
    console.log(weatherInfo)
    const cityName=document.querySelector('[data-cityName]')
    const countryIcon=document.querySelector('[data-countryIcon]')
    const Disc=document.querySelector('[data-weatherDesc]')
    const WIcon=document.querySelector('[data-weatherIcon]')
    const tempreture=document.querySelector('[data-temp]')
    const windSpeed=document.querySelector('[data-windSpeed]')
    const humdity=document.querySelector('[data-humidity]')
    const cloud=document.querySelector('[data-cloud]')

    cityName.innerText=weatherInfo?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    Disc.innerText=weatherInfo?.weather?.[0]?.description;
    console.log(Disc)
    WIcon.src=`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    tempreture.innerText=`${weatherInfo?.main?.temp} °C`;
    windSpeed.innerText=`${weatherInfo?.wind?.speed}m/s`;
    humdity.innerText=`${weatherInfo?.main?.humidity}%`;
    cloud.innerText=`${weatherInfo?.clouds?.all}%`

}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)

    }else{

    }
}

function showPosition(position){
    const userXY={
        latitude:position.coords.latitude,
        longitude:position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(userXY))
    fetchUserWeather(userXY)
}

const grant=document.querySelector('[data-grantAccess]')
grant.addEventListener('click',getLocation)


// Search Form
const searchButton=document.querySelector(".btn")
const searchInput=document.querySelector('[data-searchinput]')
formContainer.addEventListener('submit',(e) => {
    e.preventDefault();
    let cityName=searchInput.value;
    
    if(cityName===""){
        return
    }
    else{
        
        fetchSearchWeather(cityName);
    }
})

async function fetchSearchWeather(city){
    loadContainer.classList.add("active")
    userInfo.classList.remove("active");
    grantContainer.classList.remove("active")

    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        const data=await response.json();
        loadContainer.classList.remove("active")
        userInfo.classList.add("active")
        renderInfo(data)
    }catch(err){
        console.log("Error Found")
    }
}



























































// console.log("hello shreyash")

// const API_KEY="d1845658f92b31c64bd94f06f7188c9c";

// async function showWeather(){

//     try{
//         let lat=15.3333;
//         let lon=74.0833;
//         const res= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
//         const data= await res.json();
//         console.log("Weather Data->",data)
    
//         // let para=document.createElement('h1');
//         // para.textContent=`${data?.main?.temp.toFixed(2)} degC`
//         // document.body.appendChild(para)
//         renderWeatherInfo(data)
//     }catch(e){

//     }
   
// }
// function getloc(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }else{
//         console.log("no")
//     }
// }
// function showPosition(position){
//     let lat=position.coords.latitude;
//     let long=position.coords.longitude;
//     console.log(lat);
//     console.log(long);
// }