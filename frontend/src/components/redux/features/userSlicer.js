import {createSlice} from '@reduxjs/toolkit'

const initialState = {

    firstname : null,
    lastname : null,
    email : null,
    notifications : null

}

export const userSlicer = createSlice({
    name : 'user',
    initialState,
    reducers : {
        changeUser : (state,actions) => {

            state.firstname = actions.payload.username,
            state.lastname = actions.payload.lastname,
            state.email = actions.payload.email,
            state.notifications = actions.payload.notifications
        }
    }

})

export const {changeUser} = userSlicer.actions;

export default userSlicer.reducer;