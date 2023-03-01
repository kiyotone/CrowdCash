import { Inter } from 'next/font/google'
import withAuth from '@/components/stuff/withAuth' // Higher order component to protect routes
import AddLoan from '@/components/loan/AddLoan'
import { useDispatch, useSelector } from 'react-redux'
import { changeLendBox, changeLoanBox } from '@/components/redux/features/mainSlicer'

const inter = Inter({ subsets: ['latin'] })



function Home() {
  const dispatch = useDispatch()
  const main = useSelector((state) => state.main)
  
  
  
  return (
    <div className='w-full h-full'>
      { main.isLoanBoxOpen && 
      
      <div className='w-92 h-full'>      
      
        <button onClick={()=>dispatch(changeLoanBox(true))} >ADD</button>
          { main.isLoanBoxOpen && <AddLoan />}

      </div>
      
      }
      
    
    </div>
  )
}

export default withAuth(Home);
