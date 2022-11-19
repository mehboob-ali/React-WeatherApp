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
    ]
  return (
    <div className='flex items-center justify-around my-6'>
        {cities.map((city)=>(
            <button onClick={()=>setQuery({q:city.title})} 
            className='text-white sm:text-white-500 lg:text-white-500 mx-1 font-medium transition ease-out hover:scale-125' key={city.id}>{city.title}
            </button>
        )) 
        }
    </div>
  )
    }

export default TopButtons