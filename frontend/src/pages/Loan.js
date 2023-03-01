import AddLoan from "@/components/loan/AddLoan";
import { useDispatch, useSelector } from "react-redux";
import { changeLoanBox } from "@/components/redux/features/mainSlicer";
import LoanBar from "@/components/loan/LoanBar";
import { useEffect, useState } from "react";
import api from "@/components/stuff/axios"; // axios instance

const Loan = () => {
  const dispatch = useDispatch();
  const main = useSelector((state) => state.main);
  const toggleLoanBox = () => {
    main.isLoanBoxOpen
      ? dispatch(changeLoanBox(false))
      : dispatch(changeLoanBox(true));
  };

  const [Loans, setLoans] = useState(null);

  const getLoans = async () => {
    try {
      const response = await api.get("/getrequests");
      setLoans(response.data.loan_requests);
      console.log(response.data.loan_requests);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLoans();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="w-full h-full ">
        <div className="h-2 w-full bg-[#b84f4f]"></div>
        <div className="flex justify-end px-9 py-5 gap-2 items-center">
          <div>Ask Loan:</div>
          <button
            onClick={() => toggleLoanBox()}
            className={`rounded-md h-[3rem] w-[3rem] font-bold  z-50 relative ${
              main.isLoanBoxOpen ? "bg-[#333]" : "bg-[#ddd]"
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
        <div className="flex flex-col items-center">
          <LoanBar />
        </div>
      </div>
    </div>
  );
};

export default Loan;
