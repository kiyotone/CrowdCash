const Loanitem = (props) => {
  return (
    <div className="flex  items-center p-3 bg-[#333] rounded-md gap-2">
      <div className="pt-3 w-12 h-12 rounded-md">{props.userData.image}</div>

      <div className="pl-5 w-[80%]">
        <div className="font-bold">{props.userData.name}</div>
        <div className="flex items-center">
          <div>Rate:</div>
          <div className="pl-2">
            {props.userData.minRate}% - {props.userData.maxRate}%
          </div>
        </div>
      </div>
      <div className="justify-self-end">
        <div className="font-bold text-lg text-[#b84f4f]">
          {props.userData.amount}
        </div>
      </div>
      <div>More</div>
    </div>
  );
};

export default Loanitem;
