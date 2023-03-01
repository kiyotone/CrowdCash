import photo from '@/userimage.png'
import Image from 'next/image';
const Lenditem = (props) => {
  return (
    <div className="flex  items-center p-3 bg-[#333] hover:bg-[#222] cursor-pointer rounded-md gap-2">
      <div className="pt-1 w-12 h-12 rounded-full">
        <Image src={photo} className=" bg-white w-12 h-12 rounded-full"/>
        </div>

      <div className="pl-5 w-[80%]">
        <div className="font-bold">{props.userData.author.firstname} {' '} {props.userData.author.lastname}</div>
        <div className="flex items-center">
          <div>Rate:</div>
          <div className="pl-2">
          {props.userData.min_interest}% - {props.userData.max_interest}%
          </div>
        </div>
      </div>
      <div className="justify-self-end">
        <div className="font-bold text-lg text-[#2c8b35]">
          {props.userData.amount}
        </div>
      </div>
      <div>More</div>
    </div>
  );
};

export default Lenditem;
