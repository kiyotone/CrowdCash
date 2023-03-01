import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loggedIn : false,
    logged_in_as : "",
    isNotificationBarOpen : false,
    isOrderBarOpen : false,
    currentPortal : "none"
    
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
        }
    }
});

export const {changeLoggidin,changeNotificationBar,changeOrderBar,changeCurrentPortal} = mainSlicer.actions;

export default mainSlicer.reducer;

