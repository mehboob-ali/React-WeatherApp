import React from 'react';
import { formatToLocalTime, iconUrlFromCode } from './services/weatherService';


function Forecast({title,items}) {
  return (
    <div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-white font-medium uppercase'>
                {title}
            </p>
        </div>
        <hr className='my-2' />

        <div className='flex flex-row items-center justify-between
         text-white'>

        {items.map((item)=>(
                        <div className=' flex flex-col items-center justify-center'>
                        <p className='font-light text-sm'>
                            {item.title.slice(0,5)}
                        </p>
                        <p className='font-light text-sm'>
                          {item.title.slice(5,8)}</p>
                        <img src={iconUrlFromCode(item.icon)}
                        className='w-12 my-1' alt=''
                        />
                        <p className='font-medium'>{`${item.temp.toFixed()}°`}</p>                
                    </div>
        )

        )}



         </div>
    </div>
  )
}

export default Forecast