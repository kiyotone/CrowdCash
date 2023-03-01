import React from 'react'
import { useSelector } from 'react-redux'

function LoanBar() {
  

  const user = useSelector((state)=>state.user)
  console.log(user)
  return (
    <div className='w-[40rem] h-50 text-red-600 flex bg-white'>
      
      <div className='pt-3 w-12 h-12'>Image</div>
        
        <div>
          <div className='font-bold'>Firstname </div>
            <div className='flex'>
                <div>Amount: </div>
                <div>10000</div>
            </div>
        <div>
            <div>
                Rate:
              </div>
              <div>2 - 3</div>
        </div>
      </div>
        
    </div>
  )
}

export default LoanBar