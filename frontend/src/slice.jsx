/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SAHARA_API_KEY,
  withCredentials: true,
});

export const userRegister = createAsyncThunk(
  "sahara/userRegister",
  async (data, { rejectWithValue }) => {
    try {
      //   console.log(data);
      const response = await axiosInstance.post("/register", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userLogin = createAsyncThunk(
  "sahara/userLogin",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
        role,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const alreadyLogged = createAsyncThunk(
  "sahara/alreadyLogged",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/userLogged");
    //   console.log(response);
      return response.data;
    } catch (error) {
      //   console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const userLogout = createAsyncThunk(
  "sahara/userLogout",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/logoutUser", {});
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgotpassword1 = createAsyncThunk(
  "sahara/forgotpassword1",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/forgotPassword/begin", {
        email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgotpassword2 = createAsyncThunk(
  "sahara/forgotpassword2",
  async ({ email, otp, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/forgotPassword/otp", {
        email,
        otp,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const saharaSlice = createSlice({
  name: "sahara",
  initialState: {
    registered: {},
    user: { logged: false },
    forgotPassword: { message: "", otpVerified: false },
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.registered = action.payload;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        let tm = action.payload;
        state.user = { ...tm, logged: true };
        // state.user = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(alreadyLogged.pending, (state) => {
        state.status = "loading";
      })
      .addCase(alreadyLogged.fulfilled, (state, action) => {
        state.status = "succeeded";
        let tm = action.payload;
        state.user = { ...tm, logged: true };
        // state.user = action.payload;
      })
      .addCase(alreadyLogged.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(userLogout.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { logged: false };
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(forgotpassword1.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(forgotpassword1.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.forgotPassword = action.payload;
      })
      .addCase(forgotpassword1.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(forgotpassword2.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(forgotpassword2.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.forgotPassword = action.payload;
      })
      .addCase(forgotpassword2.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const saharaReducer = saharaSlice.reducer;
