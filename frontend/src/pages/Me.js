import api from '@/components/stuff/axios'
import withAuth from '@/components/stuff/withAuth'
import React, { useState } from 'react'

function Me() {

    const [loadRequests,setLoanRequests] = useState([])
    const [investmentRequests,setInvestmentRequests] = useState([])

    const getUserLoans = async () =>{
        const response = await api.get('/myrequests')
        console.log(response)
        setLoanRequests(response.data.loan_requests)
        setInvestmentRequests(response.data.investment_requests)
    }

    useEffect(() => {
        
        getUserLoans();
        

      
    }, [])
    

  return (
    <div className=''>
        



    </div>
  )
}

export default withAuth(Me)