import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loggedIn : false,
    logged_in_as : "",
    isNotificationBarOpen : false,
    isOrderBarOpen : false,
    currentPortal : "Lend",
    isLoanBoxOpen : false,
    isLendBoxOpen : false,
    
}

export const mainSlicer = createSlice({
    name :'main',
    initialState,
    reducers : {
        changeLoggidin: (state,actions)=>{
            state.loggedIn = actions.payload
        }
        ,
        changeNotificationBar: (state,actions)=>{
            state.isNotificationBarOpen = actions.payload
        },
        changeOrderBar: (state,actions)=>{
            state.isOrderBarOpen = actions.payload
        },
        changeCurrentPortal : (state,actions)=>{
            state.currentPortal = actions.payload
        },
        changeLoanBox : (state,actions)=>{
            state.isLoanBoxOpen = actions.payload
        },
        changeLendBox : (state,actions)=>{
            state.isLendBoxOpen = actions.payload
        }
    }
});

export const {changeLoggidin,changeNotificationBar,changeOrderBar,changeCurrentPortal,changeLendBox} = mainSlicer.actions;

export default mainSlicer.reducer;

