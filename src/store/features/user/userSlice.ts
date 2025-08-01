import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types";
import {
  forgotPasswordThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
  updateUserThunk,
} from "./userThunk";
import { removeCurrentUser } from "../../../utils/storage";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  retrievedPassword: string | null;
}
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  retrievedPassword: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      removeCurrentUser();
    },
    clearRetrievedPassword: (state) => {
      state.retrievedPassword = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.error = action.payload || "Failed to update user";
        state.loading = false;
      })
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.retrievedPassword = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.retrievedPassword = action.payload;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to retrieve password";
        state.retrievedPassword = null;
      });
  },
});

export const { logout, clearRetrievedPassword } = userSlice.actions;
export default userSlice.reducer;
