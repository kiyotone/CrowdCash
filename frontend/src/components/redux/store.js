import {configureStore} from '@reduxjs/toolkit'
import mainSlicer from './features/mainSlicer'
import userSlicer  from './features/userSlicer'


export const store = configureStore({
    reducer: {
        main : mainSlicer,
        user : userSlicer,
    }
})