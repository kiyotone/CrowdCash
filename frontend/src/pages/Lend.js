import {
  changeLendBox,
} from "@/components/redux/features/mainSlicer";

import AddLend from "@/components/lend/AddLend";
import { useDispatch, useSelector } from "react-redux";

const Lend = () => {
  const dispatch = useDispatch();
  const main = useSelector((state) => state.main);
  const toggleLendBox = () => {
    main.isLendBoxOpen ? dispatch(changeLendBox(false)) : dispatch(changeLendBox(true))
  }

  return (
    <div className="h-full flex flex-col items-center">
      <div className="w-full h-full ">
        <div className="h-2 w-full bg-[#25592a] transition-colors duration-200"></div>
        <div className="flex justify-end px-9 py-5 ">
          <button
            onClick={() => toggleLendBox()}
            className={`rounded-md h-[3rem] w-[3rem] font-bold bg-[#ddd] z-50 relative ${
              main.isLendBoxOpen ? "bg-[#333]" : ""
            }`}
          >
            <div
              className={`w-[20px] h-[4px] bg-[#25592a] rounded-lg left-3 absolute transition-all ease-in duration-300 ${
                main.isLendBoxOpen ? "rotate-45" : ""
              }`}
            ></div>
            <div
              className={`w-[20px] h-[4px] bg-[#25592a] rounded-lg  absolute left-3 transition-all ease-in duration-300 ${
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
