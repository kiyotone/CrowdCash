import React, { useState } from "react";
import { useSelector } from "react-redux";
import Deals from "./Deals";

function DealsBar() {
  const user = useSelector((state) => state.user);
  const [state, setState] = useState("borrow");
  const [dealList, setDealList] = useState(user.borrows);
  console.log(dealList);

  const changeDeals = (deals) => {
    if (deals == "borrow") {
      setState("borrow");
      setDealList(user.borrows);
    } else if (deals == "lend") {
      setState("lend");
      setDealList(user.lends);
    }
  };

  return (
    <div className="w-96 h-[30rem] top-14 right-[8.9rem] absolute rounded-md text-white bg-gray-800">
      <div className="flex m-1 items-center justify-center h-10 rounded-md transition-all ">
        {" "}
        Deals{" "}
      </div>
      <div className="flex h-10 gap-1 px-2">
        <div
          onClick={() => changeDeals("borrow")}
          className={`bg-[#b84f4f] w-[50%]  rounded-md ease-in-out duration-200 ${
            state == "borrow"
              ? "-translate-y-1 shadow-lg shadow-[rgba(0,0,0,0.5)]"
              : ""
          }`}
        >
          <div className="flex flex-col items-center justify-center h-10 ">
            Borrows
          </div>
        </div>
        <div
          onClick={() => changeDeals("lend")}
          className={`bg-[#2c8b35] w-[50%]  rounded-md ease-in-out duration-200 ${
            state == "lend"
              ? "-translate-y-1 shadow-lg shadow-[rgba(0,0,0,0.5)]"
              : ""
          }`}
        >
          <div className="flex flex-col items-center h-10 justify-center">
            Lends
          </div>
        </div>
      </div>
      <div className="mt-3 overflow-y-scroll flex flex-col gap-1">
        {dealList && dealList.map((ele) => <Deals data={ele} />)}
      </div>
    </div>
  );
}

export default DealsBar;
