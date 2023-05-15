// delete data
// DELETE process
// delete method

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_LIST_USERS } from "../../constants";

const deleteInitialState = {
  isLoading: false,
  error: false,
  message: ""
};

// ACTION and Redux Middleware to Delete
const callbackDeleteUsersAyncThunk = async ({ paramId }, _thunkApi) => {
  const res = await fetch(`${API_LIST_USERS}/${paramId}`, {
    method: "DELETE",
  });

  const result = res.status

  if (result === 204)
    return {
      message: "data berhasil di delete",
    };
};

export const deleteUsers = createAsyncThunk(
  "/users/delete",
  callbackDeleteUsersAyncThunk
);

const deleteUserSlice = createSlice({
  name: "user delete",
  initialState: deleteInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteUsers.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.message = action.payload.message
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default deleteUserSlice.reducer;
