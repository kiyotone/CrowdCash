import React from 'react'
import { BiNotification } from 'react-icons/bi'
import Notification from './Notification';

function NotificationBar() {

  const notificationAmount = 2;

  const closeNotiBox = ()=>{}

  return (
    <div className='w-96 h-[30rem] top-14 right-[13.5rem] absolute rounded-md text-white bg-gray-800 '>

        <div className='flex m-1 items-center justify-center h-10 border-gray-600 border [.001rem] rounded-md'> <BiNotification /> Notifications ({notificationAmount}) </div>
        <div>

        <Notification />

        </div>
    </div>
  )
}

export default NotificationBar