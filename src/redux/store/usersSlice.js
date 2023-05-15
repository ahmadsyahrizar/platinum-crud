// Fetching data
// READ process
// GET method

//C R U D

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_LIST_USERS } from "../../constants";

const initialState = {
  isLoading: false,
  error: false,
  users: [],
};

const callbackAsyncThunk = async (_, thunkApi) => {
  const res = await fetch(API_LIST_USERS);
  const result = await res.json();

  if (!result) return thunkApi.rejectWithValue(result);
  return result;
};

export const getUsers = createAsyncThunk("/users/get", callbackAsyncThunk);

export default createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(getUsers.pending, (state, _action)=> {
        state.isLoading = true;
        state.error = false;
        state.users = [];
    }) // KETIKA PENDING/LOADING, MAKA AKAN NGAPAIN
    .addCase(getUsers.rejected, (state, action)=> {
        state.isLoading = false;
        state.error = action.payload;
        state.users = [];
    }) // KETIKA REJCETED/ERROR, MAKA AKAN NGAPAIN
    .addCase(getUsers.fulfilled, (state, action)=> {
        state.isLoading = false;
        state.error = false;
        state.users = action.payload // payload adalah response dari API yang kita hit
    }); // KETIKA SUCCESS/FULLFILLED, MAKA AKAN NGAPAIN
  },
}).reducer
