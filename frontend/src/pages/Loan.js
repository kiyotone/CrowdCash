import AddLoan from "@/components/loan/AddLoan";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLendBox,
  changeLoanBox,
} from "@/components/redux/features/mainSlicer";
import LoanBar from "@/components/loan/LoanBar";
import { useState } from "react";

const Loan = () => {
  const dispatch = useDispatch();
  const main = useSelector((state) => state.main);

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="w-full h-full ">
        <div className="h-2 w-full bg-[#b84f4f]"></div>
        <div className="flex justify-end px-9 py-5 ">
          <button
            onClick={() => dispatch(changeLoanBox(true))}
            className={`rounded-md h-[3rem] w-[3rem] font-bold bg-[#ddd] z-50 relative ${
              main.isLoanBoxOpen ? "bg-[#333]" : ""
            }`}
          >
            <div
              className={`w-[20px] h-[4px] bg-[#b84f4f] rounded-lg left-3 absolute transition-all ease-in duration-300 ${
                main.isLoanBoxOpen ? "rotate-45" : ""
              }`}
            ></div>
            <div
              className={`w-[20px] h-[4px] bg-[#b84f4f] rounded-lg  absolute left-3 transition-all ease-in duration-300 ${
                main.isLoanBoxOpen ? "-rotate-45" : "rotate-90"
              }`}
            ></div>
          </button>
          {main.isLoanBoxOpen && <AddLoan />}
        </div>
        <LoanBar />
      </div>
    </div>
  );
};

export default Loan;
