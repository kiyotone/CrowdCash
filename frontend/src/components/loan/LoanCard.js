import React from "react";
import { useSelector } from "react-redux";
import Loanitem from "./Loanitem";

function LoanCard() {
  const userarr = {
    name: "Prashant",
    amount: 10000,
    image: "Image",
    minRate: 2,
    maxRate: 5,
  };
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="w-[40rem] h-[35rem] text-[#ddd] bg-[#504e4e] overflow-y-scroll rounded-lg scroll-m-1 p-3">
      <Loanitem userData={userarr} />
    </div>
  );
}

export default LoanCard;
