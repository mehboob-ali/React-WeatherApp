import React from 'react'
import {  UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { useState } from 'react';


function Inputs({setQuery,setUnits,units}) {

  const [city,setCity]=useState("");
  
  const handleSearchClick=()=>{
    if (city !== '') setQuery({q : city});
  }

  const handleLocationClick=()=>{
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition((position)=>{
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({lat,lon})
      })
    }
  }

  const handleUnitChange=(e)=>{
    const selectedUnit=e.currentTarget.name;
    if(units !==selectedUnit) setUnits(selectedUnit)
  }
  
  return (
    <div className='flex flex-row justify-center my-6 '>
        <div className='flex flex-row -3/4 items-center justify-center space-x-4 py-4'>
            <input value={city}
            onChange={(e)=>setCity(e.currentTarget.value)}
            type='text'
            placeholder='search for city...'
            className='  sm:text-xl text-lg rounded-xl focus:ring-4   font-light p-2 w-full shadow-xl focus:outline-none capitalize' 
            />
            <UilSearch onClick={handleSearchClick} size='35' className=" text-white cursor-pointer transition ease-out hover:scale-125"  />
            <UilLocationPoint 
            onClick={handleLocationClick}            
            size='35' className="text-white cursor-pointer transition ease-out hover:scale-125 "  />
        </div>
        {/* <div className="flex flex-row w-1/4 items-center justify-center">
          <button  name="metric" className="text-xl text-white font-light"
          onClick={handleUnitChange}
           >
            °C
          </button>
          <p className='text-xl  text-white mx-1'>|</p>
          <button name="imperial" className="text-xl text-white font-light"
          onClick={handleUnitChange}
          >
            °F
          </button>
        </div> */}

    </div>
  )
}

export default Inputs;