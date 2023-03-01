import AddLoan from '@/components/loan/AddLoan'
import { useDispatch, useSelector } from 'react-redux'
import { changeLendBox, changeLoanBox } from '@/components/redux/features/mainSlicer'
import LoanBar from '@/components/loan/LoanBar';

const Loan = () => {
  const dispatch = useDispatch()
  const main = useSelector((state) => state.main)
  
  return (
    <div className="h-screen flex flex-col items-center">
      
      
      <div className='w-[60rem] h-full border-t-[10px] rounded-md border-[rgba(130,56,56,0.95)]'>      
          <div className='flex justify-end'>
            <button className='rounded-md p-3 font-bold bg-white text-red-600' onClick={()=>dispatch(changeLoanBox(true))} >+</button>
            { main.isLoanBoxOpen && <AddLoan />}
            
          </div>
          <LoanBar />
      </div>
      
      
    
    </div>
  );
};

export default Loan;
