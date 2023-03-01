import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeConfirmPoppup } from "../redux/features/mainSlicer";
import LoanConfirm from "./LoanConfirm";
import Loanitem from "./Loanitem";

function LoanCard(props) {
  console.log(props.loan_array)
  const main = useSelector((state) => state.main)
  const [pressedLoan,setPressedLoan] = useState({})
  const dispatch = useDispatch()
  
  const loan_array = props.loan_array
  const handlePressed = (element) =>{
    setPressedLoan(element)
    dispatch(changeConfirmPoppup(true))

  }


  return (
    <div className="w-[40rem] h-[35rem] text-[#ddd] bg-[#504e4e] overflow-y-scroll rounded-lg scroll-m-1 p-3">
      {loan_array &&
        loan_array.map((element)=>(
        <div className="mt-2" onClick={()=>handlePressed(element)} key={loan_array.indexOf(element)+"div"}>
          <Loanitem className="" key={loan_array.indexOf(element)} userData={element}/>
          </div>
        ))
      }
      {main.confirmPoppup && <LoanConfirm loan={pressedLoan} />}
    
    </div>
    
  );
}

export default LoanCard;
