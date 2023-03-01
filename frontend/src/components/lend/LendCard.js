import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeConfirmPoppup } from "../redux/features/mainSlicer";
import Lenditem from "./Lenditem";
import LoanConfirm from "./LendConfirm";

function LendCard(props) {
  const lend_array = props.lend_array
  const dispatch = useDispatch()
  const main = useSelector((state) => state.main)
  const [pressedLend,setPressedLend] = useState({})


  const handlePressed = (element) =>{
    setPressedLend(element)
    dispatch(changeConfirmPoppup(true))

  }
  return (
    <div className="w-[40rem] h-[35rem] text-[#ddd] bg-[#504e4e] overflow-y-scroll rounded-lg scroll-m-1 p-3">
      {lend_array &&
        lend_array.map((element)=>(
          <div className="mt-2" onClick={()=>handlePressed(element)} key={lend_array.indexOf(element)+"div"}>
          <Lenditem className="mt-3" key={lend_array.indexOf(element)} userData={element} />
        </div>
          ))
      }
      {main.confirmPoppup && <LoanConfirm lend={pressedLend} />}
    
    </div>
  );
}

export default LendCard;
