import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user:{},
    notifications : null,
    deals: null,

}

export const userSlicer = createSlice({
    name : 'user',
    initialState,
    reducers : {
        changeUser : (state,actions) => {

            state.user = actions.payload.user
            state.notifications = actions.payload.notifications
            state.deals = actions.payload.deals
        }
    }

})

export const {changeUser} = userSlicer.actions;

export default userSlicer.reducer;