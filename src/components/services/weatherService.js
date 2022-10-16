const API_KEY='f96c446146a9e4cfb0bff057346213df';
const BASE_URL='https://api.openweathermap.org/data/2.5/';


const getWeatherData=(infoType,searchParams)=>{
    const url=new URL(BASE_URL+'/'+infoType);
    url.search=new URLSearchParams({...searchParams, appid:API_KEY});
    return fetch(url)
    .then((res)=>res.json())
    };

const formatCurrentWeather=(data)=>{

}
    
export const getFormattedWeatherData = async (searchParams)=>{
    const formattedCurrentWeather = 
    await getWeatherData('weather',searchParams).then(formatCurrentWeather);
}