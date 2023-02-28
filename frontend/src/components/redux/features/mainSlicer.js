import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loggedIn : false,
    logged_in_as : "",
    
}

export const mainSlicer = createSlice({
    name :'main',
    initialState,
    reducers : {
        changeLoggidin: (state,actions)=>{
            state.loggedIn = actions.payload
        }
    }
});

export const {changeLoggidin} = mainSlicer.actions;

export default mainSlicer.reducer;

