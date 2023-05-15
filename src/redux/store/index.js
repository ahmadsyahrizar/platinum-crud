// create store 
import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice"

const store = configureStore({
    reducer:{
        users: usersSlice
    }
})

export default store

//HOW TO GET DATA FROM GLOBAL STATE
//component => action => dispatch => {{ middleware }}   store => reducer => state