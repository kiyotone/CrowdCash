import React, { useEffect } from 'react'
import {BiNotification} from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { changeCurrentPortal, changeNotificationBar, changeOrderBar } from '../redux/features/mainSlicer'
import { useDispatch } from 'react-redux'
import NotificationBar from './Notification/NotificationBar'
import OrderBar from './Order/OrderBar'

function Topbar() {
    

    const main = useSelector((state)=>state.main)
    const dispatch = useDispatch()  

    const notificationPressed= () =>{
      
      main.isNotificationBarOpen ?dispatch(changeNotificationBar(false)) : dispatch(changeNotificationBar(true))
      dispatch(changeOrderBar(false))
    }

    const orderPressed= () =>{
      console.log(main.isOrderBarOpen)
      if(main.isOrderBarOpen == true){
        dispatch(changeOrderBar(false))
      }
      else{
        dispatch(changeOrderBar(true))
        dispatch(changeNotificationBar(false))
      }
      
    }

    return (
    <div className={`w-full flex items-center justify-between text-black h-20 bg-white`}>
        
        <div className='pl-20'>Logo</div>

        <div className='w-60 h-full flex pt-4 overflow-hidden'>
          <div className={`p-2 m-3 bg-gray-500  flex cursor-pointer ${main.currentPortal == "Loan" ? 'h-full rounded-t-md' :"rounded-md"}`} onClick={()=>dispatch(changeCurrentPortal("Loan"))}>Loan</div>
          <div className={`p-2 m-3 bg-gray-500  flex cursor-pointer ${main.currentPortal == "Lend" ? 'h-full rounded-t-md' :"rounded-md"}`} onClick={()=>dispatch(changeCurrentPortal("Lend"))}>Lend</div>


        </div>

        <div className='pr-20 space-x-5 flex items-start'>
            
            <BiNotification className='w-6 h-6 cursor-pointer' onClick={notificationPressed} />
            {main.isNotificationBarOpen && <NotificationBar />}
          
            <div className='cursor-pointer' onClick={orderPressed}>
                
                Orders

            </div>
          
            {main.isOrderBarOpen && <OrderBar />}
        
        <div>Profile</div>

            


        </div>

    </div>
  )
}

export default Topbar