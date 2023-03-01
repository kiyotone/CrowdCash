import { Inter } from 'next/font/google'
import withAuth from '@/components/stuff/withAuth' // Higher order component to protect routes
import Loan from './Loan'

const inter = Inter({ subsets: ['latin'] })



function Home() {
  
  
  
  return (
    <div className=''>
      
      <Loan />
    
    </div>
  )
}

export default Home;
