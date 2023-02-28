import React from 'react'
import {BiNotification} from 'react-icons/bi'

function Topbar() {
    const topbarcolour = "#"
  return (
    <div className={`w-full flex items-center justify-between text-black h-20 bg-white`}>
        
        <div className='pl-20'>Logo</div>

        <div className='pr-20 space-x-5 flex items-start'>
            
            <BiNotification className='w-6 h-6' />
            <div>
                
                Orders

            </div>
        
        <div>Profile</div>

            


        </div>

    </div>
  )
}

export default Topbar