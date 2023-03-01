import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user:{},
    notifications : null,
    borrows: [],
    lends : []

}

export const userSlicer = createSlice({
    name : 'user',
    initialState,
    reducers : {
        changeUser : (state,actions) => {

            state.user = actions.payload.user
            state.notifications = actions.payload.notifications
           },
        changeborrows: (state,actions)=>{
            state.borrows = actions.payload
        },
        changelends: (state,actions)=>{
            state.lends = actions.payload
        }
    }

})

export const {changeUser,changeborrows,changelends} = userSlicer.actions;

export default userSlicer.reducer;