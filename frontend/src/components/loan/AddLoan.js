import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeLoanBox } from "../redux/features/mainSlicer";
import api from "../stuff/axios"; // axios instance

function AddLoan() {
  const [checkbox, checkboxPressed] = useState(false);
  const [amount, setAmount] = useState(0);
  const [finalAmount, setfinalAmount] = useState(0);
  const [loanTime, setLoanTime] = useState(0);
  const [loanDescription, setLoanDescription] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter()

  const [success, setSuccess] = useState(false);

  const handlePressed = () => {
    checkbox ? checkboxPressed(false) : checkboxPressed(true);
  };

  const closeAddLoan = (e) => {
    if (e.target.id == "loanBox") {
      dispatch(changeLoanBox(false));
    }
  };

  const handleAddLoanSubmit = async (e) => {
    e.preventDefault();

    const data = {
      amount: amount,
      description: loanDescription,
      finalAmount: finalAmount,
      weeks: loanTime,
      type: "Loan", // Lend ko lagi chai type Investment hunxa
    };

    try {
      const response = await api.post("/addrequest", data);
      if (response.status === 201) {
        // Success
        // alert("You have successfully created a Loan Request");
        // window.location.reload(false);
        // alert("You have successfully created a Loan Request")
        setSuccess(true);
        router.push('/');
        dispatch(changeLoanBox(false));
      } else {
        // Fail
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="loanBox"
      className="w-screen h-screen absolute top-0 right-0  flex items-center bg-gradient-to-r from-[rgb(0,0,0,0.5)] to-[rgb(0,0,0,0.8)] justify-center"
      onClick={(e) => closeAddLoan(e)}
    >
      <div className="w-96 h-[28rem] p-5 flex flex-col rounded-md text-white bg-[#333] gap-3">
        <div className="flex flex-col gap-1">
          <label>Amount:</label>
          <input
            type={"number"}
            onChange={(e) => setAmount(e.target.value)}
            className="form_input"
            min="100"
            max="10000"
          />
        </div>

        <div className="flex flex-col gap-1 ">
          <label>Final Amount</label>
          <input
            type={"number"}
            onChange={(e) => setfinalAmount(e.target.value)}
            className="form_input "
            min="100"
            max="10000"
          />
        </div>

        <div className="flex flex-col gap-1 w-[50%]">
          <label>Time in Weeks</label>
          <input
            type={"number"}
            onChange={(e) => setLoanTime(e.target.value)}
            className="form_input w-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Description</label>
          <input
            type={"text"}
            onChange={(e) => setLoanDescription(e.target.value)}
            className="form_input w-full h-20"
          />
        </div>

        {/* Success message if success */}
        {success && (
          <div className="text-center justify-center text-green-500">
            You have successfully created a Loan Request
          </div>
        )}

        <div className="py-2">
          <button
            onClick={(e) => handleAddLoanSubmit(e)}
            className="w-full bg-[#b84f4f] rounded-md py-1"
          >
            {" "}
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddLoan;
