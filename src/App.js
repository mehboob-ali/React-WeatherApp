import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import { getFormattedWeatherData } from './components/services/weatherService';
import { useState,useEffect } from 'react';
import LogoAndUnits from './components/LogoAndUnits';
function App() {

  const locationCheck=()=>{
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      return setQuery({lat,lon})
      })

    }
   
  }

  const [query,setQuery] = useState(
    ()=>{
      if (navigator.geolocation)
      {
        navigator.geolocation.getCurrentPosition((position)=>{
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        return setQuery({lat,lon})
        })
      }
      else{
        return setQuery({q:'mumbai'})
      }
    }
  );
  const [units,setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async() =>{
      await getFormattedWeatherData({...query,units}).then(
        (data)=>{
          setWeather(data);
        });
    };
    fetchWeather();
  }, [query,units])
 //hourly title: formatToLocalTime(1666116000, timezone, 'hh:mm a'),
  //daily title: formatToLocalTime(1666116000, timezone, 'ccc'),

  const formatBackgroundColor=()=>{
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold= units === "metric" ? 25 : 77;
    if (weather.temp<=threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-500 to-orange-700";
  };


  return (
    <div className={`mx-auto max-w-screen-md sm:my-4 py-5 px-8 sm:px-32 bg-gradient-to-br 
    h-fit shadow-xl shadow-gray-400 ${formatBackgroundColor()}`}>
      <LogoAndUnits units={units} setUnits={setUnits} />
      <TopButtons setQuery={setQuery}></TopButtons>
      <Inputs setQuery={setQuery} setUnits={setUnits} units={units} />
      {weather&&(
        <div>
        <TimeAndLocation weather={weather} ></TimeAndLocation>
        <TemperatureAndDetails weather={weather}></TemperatureAndDetails>
        <Forecast title="3 hourly forecast" items={weather.hourly} />
        <Forecast title="Daily forecast"  items={weather.daily}/>
        </div>
      )}

    </div>
  );
}
export default App;
