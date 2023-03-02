import api from '@/components/stuff/axios'
import withAuth from '@/components/stuff/withAuth'
import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrentPortal } from '@/components/redux/features/mainSlicer'


function Me() {

    const [loadRequests,setLoanRequests] = useState([])
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
    <div className=''>
        



    </div>
  )
}

export default withAuth(Me)