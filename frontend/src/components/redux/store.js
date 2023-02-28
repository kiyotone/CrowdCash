import {configureStore} from '@reduxjs/toolkit'
import mainSlicer from './features/mainSlicer'


export const store = configureStore({
    reducer: {
        main : mainSlicer,
    }
})