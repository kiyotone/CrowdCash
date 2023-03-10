import React from 'react'
import {TbArrowBigDownLines,TbArrowBigUpLines} from 'react-icons/tb'

function Notification() {
    
    const type = "lend";

    return (
    <div id="notificationBarID" className='h-20 flex  mt-2 pl-3 bg-slate-800 border-[.001rem]'>
        <div className='flex items-center'>
        { type== "lend" ?<TbArrowBigDownLines className='w-14 h-14 bg-gray-200 text-black text-sm rounded-full'/>:
            <TbArrowBigUpLines className='w-14 h-14 bg-gray-200 text-black text-sm rounded-full'/>
        
        }
        </div>
        
        <div className='ml-4 w-72 flex flex-col justify-between'>
            
            <p className='text-sm overflow-ellipsis w-70 overflow-hidden'></p>
            
            <div className='w-full text-[.6rem] items-end pb-1'>9:30</div>
        </div>
    </div>
  )
}

export default Notification