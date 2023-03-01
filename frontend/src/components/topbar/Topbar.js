import React, { useEffect, useState } from "react";
import { BiNotification } from "react-icons/bi";
import { useSelector } from "react-redux";
import {
  changeCurrentPortal,
  changeNotificationBar,
  changeOrderBar,
} from "../redux/features/mainSlicer";
import { useDispatch } from "react-redux";
import NotificationBar from "./Notification/NotificationBar";
import OrderBar from "./Order/OrderBar";
import Logo from "./Logo.png";
import api from "../stuff/axios";
import { changeUser } from "../redux/features/userSlicer";

function Topbar() {
  const main = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // getUser()
  }, []);

  const notificationPressed = () => {
    main.isNotificationBarOpen
      ? dispatch(changeNotificationBar(false))
      : dispatch(changeNotificationBar(true));
    dispatch(changeOrderBar(false));
  };

  const orderPressed = () => {
    console.log(main.isOrderBarOpen);
    if (main.isOrderBarOpen == true) {
      dispatch(changeOrderBar(false));
    } else {
      dispatch(changeOrderBar(true));
      dispatch(changeNotificationBar(false));
    }
  };

  return (
    <div
      className={`w-full flex items-center justify-between text-[#555] h-20 bg-[#eee] `}
    >
      <div className="pl-20">
        <img
          src={Logo.src}
          alt="Logo"
          className="h-[60px] w-[80px] aspect-auto"
        />
      </div>

      <div className="w-72 h-full flex pt-4 overflow-hidden transition-all text-[#ddd] justify-between">
        <div
          className={`w-24 p-2 m-3 bg-[#b84f4f] justify-center flex cursor-pointer duration-700 ease-in-out ${
            main.currentPortal == "Loan"
              ? " rounded-t-md  h-full "
              : "rounded-md h-[40px] "
          }`}
          onClick={() => dispatch(changeCurrentPortal("Loan"))}
        >
          Loan
        </div>
        <div
          className={`w-24 p-2 m-3 bg-[rgba(26,81,32,0.95)] justify-center flex cursor-pointer duration-700 ease-in-out rounded-md ${
            main.currentPortal == "Lend"
              ? " h-full w-[100px]"
              : " h-[40px] w-[60px]"
          }`}
          onClick={() => dispatch(changeCurrentPortal("Lend"))}
        >
          Lend
        </div>
      </div>

      <div className="pr-20 space-x-5 flex items-start">
        <BiNotification
          className="w-6 h-6 cursor-pointer"
          onClick={notificationPressed}
        />
        {main.isNotificationBarOpen && <NotificationBar />}

        <div className="cursor-pointer" onClick={orderPressed}>
          Orders
        </div>

        {main.isOrderBarOpen && <OrderBar />}

        <div>user</div>
      </div>
    </div>
  );
}

export default Topbar;
