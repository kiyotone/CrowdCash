import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Deals from './Deals';

function DealsBar() {

  const user = useSelector((state)=> state.user)
  const [state,setState] = useState("borrow");
  const [dealList,setDealList] = useState(user.borrows);
  console.log(dealList)

  const changeDeals = (deals) => {
      if (deals == "borrow"){
        setState("borrow")
        setDealList(user.borrows)
      }
      else if (deals == "lend"){
        setState("lend")
        setDealList(user.lends)
      }
  }

  return (
   
   <div className='w-96 h-[30rem] top-14 right-[8.9rem] absolute rounded-md text-white bg-gray-800 overflow-y-scroll'>
  
          <div className='flex m-1 items-center justify-center h-10 border-gray-400 border-[3px] rounded-md'> Deals </div>
          <div className='flex h-10'>
  
          <div onClick={()=>changeDeals("borrow") } className={`border-gray-400 w-[50%] border-[3px] rounded-t-md ${ state=="borrow" ? "border-b-0": ""}`} >
              <div className='flex flex-col items-center h-10'>
              Borrows
              </div>
          </div>
          <div onClick={()=> changeDeals("lend")} className={`border-gray-400 w-[50%] border-[3px] rounded-t-md ${ state=="lend" ? "border-b-0": ""}`} >
          <div className='flex flex-col items-center h-10'>
              Lends
          </div>

          </div>

          </div>
          <div className='mt-3'>
            {dealList && 
              dealList.map((ele) => (
                <Deals data={ele}/>
              ))
            }

          </div>

      </div>
   
  )
}

export default DealsBar