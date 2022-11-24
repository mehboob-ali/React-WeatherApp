import React from 'react'
import Forecast from './Forecast';
import weatherIcon from '../weather-icon2.png';

function LogoAndUnits({units,setUnits}) {
    const handleUnitChange=async(e)=>{
        const selectedUnit=e.currentTarget.name;
        if(units !==selectedUnit) setUnits(selectedUnit)
      }
  return (
    <div className=' flow-root '>
        <div className='flex  float-left ' > 
        <img src={weatherIcon} className='h-7 mr-1 sm:h-9' ></img>
            <h1 className=' text-xl font-bold sm:text-2xl  text-white '>Weather App</h1>
        </div>
    <div className="flex float-right gap-1 ">
        <button  name="metric" className="  text-2xl text-white font-light cursor-pointer transition ease-out hover:scale-125"
        onClick={handleUnitChange}
        >
        °C
        </button>
        <p className='text-2xl  text-white mx-1'>|</p>
        <button name="imperial" className="text-2xl text-white font-light cursor-pointer transition ease-out hover:scale-125"
        onClick={handleUnitChange}
        >
      °F
    </button>
  </div>
  </div>
  )
}

export default LogoAndUnits