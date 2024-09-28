/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { saharaReducer } from "./slice";

const store = configureStore({
  reducer: {
    sahara: saharaReducer,
  },
});

export default store;
