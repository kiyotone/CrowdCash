import photo from '@/userimage.png'
import Image from 'next/image';

const Loanitem = (props) => {
  console.log(props.userData)
  return (

    <div className="flex  items-center p-3 bg-[#333] hover:bg-[#222] cursor-pointer rounded-md gap-2">
      <div className="pt-1 w-12 h-12 rounded-full">
        <Image src={photo} className=" bg-white w-12 h-12 rounded-full"/>
        </div>

      <div className="pl-5 w-[80%]">
      <div className="font-bold">{props.userData.author.firstname} {' '} {props.userData.author.lastname}</div>
        <div className="flex flex-col">
          <div className='flex'>
              <div>Final Amount:</div>
              <div className="pl-2">
                {props.userData.finalAmount} 
              </div>
        </div>
          <div className=''>
            {props.userData.weeks} weeks
          </div>
        </div>
      </div>
      <div className="justify-self-end">
        <div className="font-bold text-lg text-[#b84f4f]">
          {props.userData.amount}
        </div>
      </div>
      
    </div>
  );
};

export default Loanitem;
