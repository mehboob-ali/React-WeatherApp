import React from 'react'
function TopButtons({setQuery}) {
    const cities=[
        {
            id:1,
            title: 'Mumbai'
        },
        {
            id:2,
            title: 'Sydney'
        },
        {
            id:3,
            title: 'Tokyo'
        },
        {
            id:4,
            title: 'Toronto'
        },
        {
            id:5,
            title: 'London'
        },
        {
            id:6,
            title: 'Paris'
        },
    ]
  return (
    <div className='grid grid-cols-3 gap-y-4 gap-x-4 items-center justify-around my-6 '>
        {cities.map((city)=>(
            <button onClick={()=>setQuery({q:city.title})} 
            className='text-white border-2  rounded-lg sm:px-2 sm:text-white-500 lg:text-white-500 mx-1 font-medium transition ease-out hover:scale-125' key={city.id}>{city.title}
            </button>
        )) 
        }
    </div>
  )
    }

export default TopButtons