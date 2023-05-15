// create store 
import { configureStore } from "@reduxjs/toolkit";
import deleteUsersSlice from "./deleteUsersSlice";
import usersSlice from "./readUsersSlice"

const store = configureStore({
    reducer:{
        users: usersSlice,
        deleteUser: deleteUsersSlice
    }
})

export default store

//HOW TO GET DATA FROM GLOBAL STATE
//component => action => dispatch => {{ middleware }}   store => reducer => state