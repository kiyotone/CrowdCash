import React from "react";

export default function Deals(props) {
  const data = props.data;

  return (
    <div className="h-20 flex flex-col text-sm bg-slate-800 border-[.001rem]">
      <div className="flex items-center justify-between">
        <div className="text-[#2c8b35]">
          {data.lender.firstname} {data.lender.lastname}
        </div>
        <div className="text-[#b84f4f]">
          {data.borrower.firstname} {data.borrower.lastname}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-[#2c8b35]">Rs {data.amount}</div>
        <div className="text-[#b84f4f]">Rs {data.finalAmount}</div>
      </div>

      <div>{data.weeks} weeks time</div>
      <div></div>
    </div>
  );
}
