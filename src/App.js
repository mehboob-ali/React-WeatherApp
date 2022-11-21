import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import { getFormattedWeatherData } from './components/services/weatherService';
import { useState,useEffect } from 'react';
function App() {

  const [query,setQuery] = useState({q: 'mumbai'});
  const [units,setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async() =>{
      await getFormattedWeatherData({...query,units}).then(
        (data)=>{
          setWeather(data);
        });
    };
     console.log("Weather data",weather)
    fetchWeather();
  }, [query,units])
 //hourly title: formatToLocalTime(1666116000, timezone, 'hh:mm a'),
  //daily title: formatToLocalTime(1666116000, timezone, 'ccc'),

  const formatBackgroundColor=()=>{
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold= units === "metric" ? 20 : 60;
    if (weather.temp<=threshold) return "from-cyan-700 to-blue-700";
    return "from-yellow-700 to-orange-700";
  };


  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br 
    h-fit shadow-xl shadow-gray-400 ${formatBackgroundColor()}`}>
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
