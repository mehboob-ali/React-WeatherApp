import { DateTime } from "luxon";

const API_KEY='f96c446146a9e4cfb0bff057346213df';
const BASE_URL='https://api.openweathermap.org/data/2.5/';


const getWeatherData=(infoType,searchParams)=>{
    const url=new URL(BASE_URL+'/'+infoType);
    url.search=new URLSearchParams({...searchParams, appid:API_KEY});
    return fetch(url)
    .then((res)=>res.json())
    };

const formatCurrentWeather=(data)=>{
    const {
        coord : {lat,lon},
        main : {temp , feels_like , temp_min , temp_max, humidity},
        name,
        dt,
        sys : {country , sunset , sunrise},
        wind : {speed},
        weather
    }=data;

    const {main : details, icon} = weather[0]; 
    return{
        lat , lon, temp , feels_like , temp_min , temp_max, 
        humidity, name, dt, country, sunrise, sunset, speed ,
        icon , details 
    }
}

const formatForecastWeather=(data)=>{
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1,6).map(d=>{
        return{
        title: formatToLocalTime(d.dt, timezone, 'ccc'),
        temp: d.temp.day,
        icon: d.weather[0].icon        
        }    
    })
}
    
export const getFormattedWeatherData = async (searchParams)=>{
    const formattedCurrentWeather = 
    await getWeatherData('weather',searchParams).then(formatCurrentWeather);
   
    const {lat, lon} = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('onecall'
    , {
        lat, lon, exclude: 'current, minutely, alerts',
        units:searchParams.units
    }.then(formatForecastWeather)
    )

   
    return formattedCurrentWeather;
}


export default getFormattedWeatherData;