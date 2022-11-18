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
    console.log('bhfdsabhjfbhjadsbf',data); 

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
    
    let { city, list } = data;
    const timezone=city.timezone;
    
    /////////      Daily Forecasat      /////////
    const newList = list.map(d=>{
        return{
        title: formatToLocalTime(d.dt, timezone, 'ccc') ,
        temp: d.main.temp,
        icon: d.weather[0].icon        
        }    
    });
    // const firstDay=daily[7];
    // const secondDay=daily[15];
    // const thirdDay=daily[23];
    // const fourthDay=daily[31];
    // const fifthDay=daily[39];
    // console.log("first day", firstDay)
    // console.log("second day", secondDay)
    // console.log("third day", thirdDay)
    // console.log("fourth day", fourthDay)
    // console.log("fifth day", fifthDay)
    const daily=[];
    for (let i = 1; i < newList.length; i=i+8) {
        daily.push(newList[i]);
    }

        //////////////       3 Hourly Forecast     ///////////////

    const hourly = list.slice(1,6).map(d=>{
        return{
            title : formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp : d.main.temp,
            icon : d.weather[0].icon
        }
    });
    // for(let i=0 ; i <=4 ; i++)
    // {
    //     const element= hourly[i];
    //     console.log("now now now ",element)

    // }

    return {timezone, daily, hourly};
}
    
export const getFormattedWeatherData = async (searchParams)=>{
    const formattedCurrentWeather = 
    await getWeatherData('weather',searchParams).then(formatCurrentWeather);
   
    const {lat, lon} = formattedCurrentWeather;

    const formattedForecastWeather = 
    await getWeatherData("forecast",
    {   
        lat, 
        lon, 
        units : searchParams.units,
    }).then(formatForecastWeather)
    return {...formattedCurrentWeather, ...formattedForecastWeather};
}
    const formatToLocalTime=( 
    secs, 
    zone,
    format= "cccc, dd LLL yyyy' | Local time: 'hh:mm a")    => 
            DateTime.fromSeconds(secs).setZone(zone).toLocal(zone).toFormat(format)
            
    const iconUrlFromCode=(code)=>`http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export {formatToLocalTime, iconUrlFromCode};