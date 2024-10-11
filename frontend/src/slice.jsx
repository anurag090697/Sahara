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
      //  console.log("hurray");
      console.log(response);
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
      // console.log(response);
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
      // console.log('first')
      const response = await axiosInstance.get("/userLogged");
        console.log(response);
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
      // console.log(rejectWithValue(error));
      // if (error.status === 401) return { message: "user not found" };
      return rejectWithValue(error).payload.response.data;
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
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log(rejectWithValue(error));

      return rejectWithValue(error);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "sahara/getAllProducts",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/allProducts", {});
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addNewProduct = createAsyncThunk(
  "sahara/addNewProduct",
  async (fData, { rejectWithValue }) => {
    try {
      // const addedBy = user._id || "66f1dc7263d63696ae02cded";
      // formData.addedBy = addedBy;
      const response = await axiosInstance.post("/addNewProduct", fData);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteOneProduct = createAsyncThunk(
  "sahara/deleteOneProduct",
  async (upis, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/removeProduct/${upis}`);
      // console.log(response);
      // if (response.status === 202) getAllProducts;
      return response.data;
    } catch (error) {
      console.log(rejectWithValue(error));
      return rejectWithValue(error);
    }
  }
);

const saharaSlice = createSlice({
  name: "sahara",
  initialState: {
    registered: {},
    user: { logged: false },
    forgotPassword: { message: "", otpVerified: false, error: "" },
    adminProducts: [],
    multiResponse: { item: "", message: "", error: "" },
    deletedProduct: {},
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
        state.registered = action.payload;
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
      })
      .addCase(getAllProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adminProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addNewProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.multiResponse = action.payload;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteOneProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteOneProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        let tm = action.payload;
        state.deletedProduct = { ...tm, status: 202 };
      })
      .addCase(deleteOneProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const saharaReducer = saharaSlice.reducer;
