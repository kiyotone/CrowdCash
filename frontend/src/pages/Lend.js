import { changeLendBox } from "@/components/redux/features/mainSlicer";
import { useEffect, useState } from "react";

import AddLend from "@/components/lend/AddLend";
import { useDispatch, useSelector } from "react-redux";
import api from "@/components/stuff/axios"; // axios instance

const Lend = () => {
  const dispatch = useDispatch();
  const main = useSelector((state) => state.main);
  const toggleLendBox = () => {
    main.isLendBoxOpen
      ? dispatch(changeLendBox(false))
      : dispatch(changeLendBox(true));
  };

  const [Lends, setLends] = useState(null);

  const getLends = async () => {
    try {
      const response = await api.get("/getrequests");
      setLends(response.data.investment_requests);
      console.log(response.data.investment_requests)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLends();
  }, []);

  return (
    <div className="h-full flex flex-col items-center">
      <div className="w-full h-full ">
        <div className="h-2 w-full bg-[#2c8b35]  delay-200"></div>
        <div className="flex justify-end px-9 py-5 items-center gap-2">
        <div>Give Loan:  </div>
          <button
            onClick={() => toggleLendBox()}
            className={`rounded-md h-[3rem] w-[3rem] font-bold  z-50 relative ${
              main.isLendBoxOpen ? "bg-[#333]" : "bg-[#ddd]"
            }`}
          >
            <div
              className={`w-[20px] h-[4px] bg-[#2c8b35] rounded-lg left-3 absolute transition-all ease-in duration-300 ${
                main.isLendBoxOpen ? "rotate-45" : ""
              }`}
            ></div>
            <div
              className={`w-[20px] h-[4px] bg-[#2c8b35] rounded-lg  absolute left-3 transition-all ease-in duration-300 ${
                main.isLendBoxOpen ? "-rotate-45" : "rotate-90"
              }`}
            ></div>
          </button>
          {main.isLendBoxOpen && <AddLend />}
        </div>
        {/* <LendBar /> */}
      </div>
    </div>
  );
};

export default Lend;
