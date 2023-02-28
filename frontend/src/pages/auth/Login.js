import React from 'react'
import { useSelector } from 'react-redux';



const Login = () => {

  const main = useSelector((state)=>state.main)

    


  const border_color = "#39FF14";
  

  return (
    <div className="flex bg-[#282C34] overflow-hidden h-screen w-screen fixed top-0 left-0 items-center justify-center" >
        
        
        <div className='w-[24rem]  bg-[#dbd9d9] flex flex-col items-center shadow-md rounded-xl' >
        <div className='m-4 text-[2rem] font-bold text-primary'>Join US</div>
            <div className=' w-[18rem] h-[14rem] '>
              GAY PRATIK PAWDEYL
              hes super GAY
              like really big black and fat GAY
                {/* facebook
                google
                twitter */}
                
            </div>
            
            <div className='mt-2 w-[24rem] h-[1rem]'>
            <hr className={` m-3 bg-${border_color}`}/>
            </div>
                
            
            <div className='mt-3 flex flex-col items-center'>
                <input type="text"  placeholder='Email or Username' className={`pl-4 mt-4 bg-transparent border-2 rounded-md border-[${border_color}] w-[19rem] h-[3rem]`}/>
                <input type="password"  placeholder='Password' className={`pl-4 mt-4 bg-transparent border-2 rounded-md border-[${border_color}] w-[19rem] h-[3rem]`}/>
                <button className={`pl-4 mt-4 rounded-md w-[19rem] h-[3rem] button bg-button_secondary`}>Continue</button>
                
                <div className={`w-[19rem] h-[3rem] flex items-center justify-between text-[.8rem] text-[#727375}]`}>
                
                <div className='flex items-center'><input type="checkbox" id='remember' placeholder='Password' className={`mr-2 bg-transparent border-2 rounded-md border-[${border_color}] w-[1rem] h-[1rem]`}/><label htmlFor='remember'> Remember Me</label></div>
                
                <div className={`text-[#007628] cursor-pointer hover:underline underline-offset-1`}>Forgot Password?</div>
                
                </div>
            
            <div className='mb-6 mt-2 flex text-[.9rem]'>

                  Not a member yet?

                  <div className='pl-2 text-[#007628] cursor-pointer hover:underline underline-offset-1'>Join now</div>

            </div>
            </div>



        </div>
    </div>
  )
}

export default Login