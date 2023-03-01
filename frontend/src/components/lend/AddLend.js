import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { changeLendBox } from '../redux/features/mainSlicer';

function AddLend() {

    const [checkbox,checkboxPressed] = useState(false);
    const [amount,setAmount] = useState(0);
    const [lowRate,setLowRate] = useState(0);
    const [highRate,setHighRate] = useState(0);
    const dispatch = useDispatch();
    
    const handlePressed = ()=>{
        checkbox ? checkboxPressed(false) : checkboxPressed(true)
    }

    const closeAddLend =  (e) =>{
        
        if(e.target.id == 'LendBox'){
            
            dispatch(changeLendBox(false))
        }
    }

  return (
    <div id='LendBox' className='w-screen h-screen absolute top-0 flex items-center bg-gradient-to-r from-[rgb(0,0,0,0.5)] to-[rgb(0,0,0,0.8)] justify-center'
    onClick={(e) => closeAddLend(e)}
    >
    <div  className='w-96 h-[30rem] flex flex-col rounded-md text-white bg-gray-800'>
        <div>  
            <label>
                Amount
            </label>
            <input type={"number"} onChange={(e)=> setAmount(e.target.value)}/>
        </div>
        
        <label>
            Rate
        </label>
    
        <div className='flex items-center'>
            <label>From:</label>
            <input type={"number"} onChange={(e)=> setLowRate(e.target.value)} className='w-10'></input>
            <label>To:</label>
            <input type={"number"} onChange={(e)=> setHighRate(e.target.value)} className='w-10'></input>        
        </div>
        <div className='flex'>    
            <label>Annonymous</label>    
            <input type={'checkbox'} onClick={handlePressed}></input>
        </div>

        <div>
        {checkbox && <textarea></textarea>}
        </div>
        <button> Add</button>
        
    </div>
    </div>

  )
}

export default AddLend