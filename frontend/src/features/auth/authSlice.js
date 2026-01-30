import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/client.js";

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  status: "idle",
  error: null,
};

export const register = createAsyncThunk("auth/register", async (payload) => {
  const { data } = await api.post("/api/auth/register", payload);
  return data;
});

export const login = createAsyncThunk("auth/login", async (payload) => {
  const { data } = await api.post("/api/auth/login", payload);
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
