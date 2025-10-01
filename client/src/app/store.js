import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/AuthSlice'


export const appstore = configureStore({
    reducer: {
        // Define your reducers here
        auth:authReducer
    }
})