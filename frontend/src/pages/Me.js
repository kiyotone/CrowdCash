import api from '@/components/stuff/axios'
import withAuth from '@/components/stuff/withAuth'
import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrentPortal } from '@/components/redux/features/mainSlicer'
import LoanItems from '@/components/LoanItems'


function Me() {

    const [loanRequests,setLoanRequests] = useState([])
    const [investmentRequests,setInvestmentRequests] = useState([])
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.user)

    const getUserLoans = async () =>{
        const response = await api.get('/myrequests')
        console.log(response)
        setLoanRequests(response.data.loan_requests)
        setInvestmentRequests(response.data.investment_requests)
    }

    useEffect(() => {
        
        getUserLoans();
        dispatch(changeCurrentPortal("None"))


      
    }, [])
    

  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
        <div className='w-[300px]'>

        <div className='flex justify-between'>
            <div>Username: </div>
            <div>{user.user.username} </div>
        </div>

        <div className='flex justify-between gap-5'>
            <div>Full Name: </div>
            <div>{user.user.firstname} {user.user.lastname} </div>
        </div>
        <div className='flex justify-between gap-5'>
            <div>E-mail: </div>
            <div>{user.user.email}  </div>
        </div>
        <div className='flex justify-between gap-5'>
            <div>Address: </div>
            <div>{user.user.address}  </div>
        </div>
        <div className='flex justify-between gap-5'>
            <div>Phone No. </div>
            <div>{user.user.phone}  </div>
        </div>
        </div>

        <div className='w-full mt-10 flex items-center justify-evenly p-10'>
            <div>
                <div className='text-[#b84f4f] w-full text-center'>Loan</div>
                <div>
                {loanRequests.map((e,i) => 
                 (
                        <LoanItems key={i} data={e} />
                        
                ) )}
                </div>
            </div>
            <div>
                <div className='w-full text-center text-[#2c8b35]'>Lend</div>
                <div className=''>

                {investmentRequests.map((e,i) => 
                 (
                        <LoanItems key={i} data={e} />
                        
                ) )}
                </div>
            </div>
        </div>



    </div>
  )
}

export default withAuth(Me)