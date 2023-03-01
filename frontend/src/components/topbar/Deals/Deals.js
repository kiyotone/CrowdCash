import React from 'react'

export default function Deals(props) {
    const data = props.data
  

  return (
    
    <div  className='h-20 flex flex-col text-sm bg-slate-800 border-[.001rem]'>
        
        <div className='flex items-center '>

            {data.lender.firstname} {' '} {data.lender.lastname} {'>'} {data.borrower.firstname} {' '} {data.borrower.lastname}   

        </div>

        <div className=''>
          Rs {data.amount} {'>'} Rs {data.finalAmount}
        </div>

        <div> 
          {data.weeks} weeks time
        </div>
        <div >
          
        </div>
        
            
            
            
          
        </div>
    

)

}