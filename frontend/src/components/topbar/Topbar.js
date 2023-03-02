import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  changeCurrentPortal,
  changeNotificationBar,
  changeOrderBar,
} from "../redux/features/mainSlicer";
import { useDispatch } from "react-redux";

import Logo from "./Logo.png";
import api from "../stuff/axios";
import {
  changeborrows,
  changelends,
  changeUser,
} from "../redux/features/userSlicer";
import { useRouter } from "next/router";
import DealsBar from "./Deals/DealsBar";

function Topbar() {
  const main = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const router = useRouter();

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    router.push("/auth/Login");
  }

  const getUser = async () => {
    try {
      const response = await api.get("/auth/user");
      const data = {
        user: response.data.user,
        notifications: {},
      };
      dispatch(changeUser(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getDeals = async () => {
    const response = await api.get("/mydeals");
    console.log(response);
    dispatch(changeborrows(response.data.borrows));
    dispatch(changelends(response.data.lends));
  };

  useEffect(() => {
    getUser();
    getDeals();
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
          className={`w-24 p-2 m-3 bg-[#2c8b35] justify-center flex cursor-pointer duration-700 ease-in-out rounded-md ${
            main.currentPortal == "Lend" ? " h-full" : " h-[40px] "
          }`}
          onClick={() => dispatch(changeCurrentPortal("Lend"))}
        >
          Lend
        </div>
      </div>

      <div className="pr-20 space-x-5 flex items-center">
        {/* <BiNotification
          className="w-6 h-6 cursor-pointer"
          onClick={notificationPressed}
        />
        {main.isNotificationBarOpen && <NotificationBar />} */}

        <div className="cursor-pointer" onClick={orderPressed}>
          Deals
        </div>

        {main.isOrderBarOpen && <DealsBar />}
        <div className="flex items-center space-x-2">
          <div onClick={()=>router.push('/Me')} className="">{user.user.firstname}</div>
          <button
            onClick={() => handleLogout()}
            className="ml-4 bg-button_secondary rounded-lg p-2 px-3"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
