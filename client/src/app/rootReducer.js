import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../features/api/authApi";
import authReducer from "../features/AuthSlice"
import { courseApi } from "../features/api/courseApi";
import { lectureApi } from "../features/api/lectureApi";



const rootReducer=combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [lectureApi.reducerPath]:lectureApi.reducer,
    auth:authReducer
})

export default rootReducer