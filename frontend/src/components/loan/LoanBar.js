import React from 'react'
import { useSelector } from 'react-redux'

function LoanBar() {
  

  const user = useSelector((state)=>state.user)
  console.log(user)
  return (
    <div className='w-[40rem] h-[9rem] text-red-600 flex bg-white rounded-md'>
      
      <div className='ml-4 flex items-center'>
      <div className='pt-3 w-24 h-24'>Image</div>
      </div>
        <div className='pl-7'>
          <div className='font-bold mt-2'>{user.user.firstname} </div>
            <div className='flex mt-2'>
                <div className=''>Amount: </div>
                <div>10000</div>
            </div>
        <div>
          <div className='flex mt-2 items-center'>
            <div>
                Rate:
              </div>
              <div className='pl-2'>2 - 3 %</div>
            </div>
        </div>
      </div>
        
    </div>
  )
}

export default LoanBar