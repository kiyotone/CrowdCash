import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeLendBox } from "../redux/features/mainSlicer";

function AddLend() {
  const [checkbox, checkboxPressed] = useState(false);
  const [amount, setAmount] = useState(0);
  const [lowRate, setLowRate] = useState(0);
  const [highRate, setHighRate] = useState(0);
  const [lendTime, setLendTime] = useState(0);
  const [lendDescription, setLendDescription] = useState(0);
  const dispatch = useDispatch();

  const handlePressed = () => {
    checkbox ? checkboxPressed(false) : checkboxPressed(true);
  };

  const closeAddLend = (e) => {
    if (e.target.id == "lendBox") {
      dispatch(changeLendBox(false));
    }
  };

  return (
    <div
      id="lendBox"
      className="w-screen h-screen absolute top-0 right-0  flex items-center bg-gradient-to-r from-[rgb(0,0,0,0.5)] to-[rgb(0,0,0,0.8)] justify-center"
      onClick={(e) => closeAddLend(e)}
    >
      <div className="w-96 h-[22rem] p-5 flex flex-col rounded-md text-white bg-[#333] gap-3">
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

        <div className="flex gap-3 w-full">
          <div className="flex flex-col gap-1 w-[50%]">
            <label>Min-Rate(%)</label>
            <input
              type={"number"}
              onChange={(e) => setLowRate(e.target.value)}
              className="form_input "
              min="0"
              max="15"
            />
          </div>

          <div className="flex flex-col gap-1 w-[50%]">
            <label>Max-Rate(%)</label>
            <input
              type={"number"}
              onChange={(e) => setHighRate(e.target.value)}
              className="form_input"
              min="1"
              max="15"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label>Time</label>
          <input
            type={"date"}
            onChange={(e) => setLendTime(e.target.value)}
            className="form_input w-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Description</label>
          <input
            type={"text"}
            onChange={(e) => setLendDescription(e.target.value)}
            className="form_input w-full"
          />
        </div>

        <div className="py-2">
          <button className="w-full bg-[#b84f4f] rounded-md py-1"> Add</button>
        </div>
      </div>
    </div>
  );
}

export default AddLend;
