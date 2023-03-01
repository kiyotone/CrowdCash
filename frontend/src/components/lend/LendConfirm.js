import React from 'react'
import photo from '@/userimage.png'
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { changeConfirmPoppup } from '../redux/features/mainSlicer';



function LendConfirm(props) {
  const lend = props.lend;
  console.log(lend)
  const dispatch = useDispatch()

  const handleclose = (e) => {
    if (e.target.id == "lendConfirmBox") {
      dispatch(changeConfirmPoppup(false))
  }
}
  return (
    
    <div
    id="lendConfirmBox"
    className="w-screen h-screen absolute top-0 right-0 z-50 flex items-center bg-gradient-to-r from-[rgb(0,0,0,0.5)] to-[rgb(0,0,0,0.8)] justify-center"
    onClick={(e)=>handleclose(e)}
  > 
    <div className='w-[30rem] h-[30rem] p-8 flex flex-col rounded-md text-white bg-[#333] gap-3'>
      <div className='border p-4 pb-10 rounded-lg'>
      <div className='flex items-center flex-col'>
      <Image src={photo} className='w-12 h-12 bg-white rounded-full'/>
      <div className="font-bold text-2xl">{lend.author.firstname} {' '} {lend.author.lastname}</div>
      </div>
      <div className=''>
        <div className='pl-5 font-bold text-2xl'>Description </div>
        <div className='pl-5 w-20 h-20'>

          {lend.description}

        </div>
      <div className="pl-5 space-x-4 w-[80%] flex">
        <div className='font-bold text-lg '>
        Amount   :
        </div>
        <div className="font-bold text-lg text-[#2c8b35]">
          {lend.amount}
        </div>
        
        </div>
        <div className="flex pt-3 items-center">
          <div className='pl-5 '>Rate:</div>
          <div className="pl-2">
            {lend.min_interest}% - {lend.max_interest}%
        </div>
        
       </div>
       <div className='pl-5 flex space-x-4 pt-3'>
            <div className=''>
            Created At:
              </div>
              <div>
              {lend.created_at}
              </div>
          </div>
      
      </div>
      </div>
      <div className='flex justify-center'>
      <button className='bg-[#2c8b35] p-3 mt-4 rounded-full items-center '>Give This Loan</button>
      </div>
      </div>
      
      </div>


  )
}

export default LendConfirm;