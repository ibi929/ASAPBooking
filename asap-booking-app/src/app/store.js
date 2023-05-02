import { configureStore } from "@reduxjs/toolkit";
import paneOptionReducer from "../features/paneOptionSlice";

export const store = configureStore({
  reducer: {
    paneOption: paneOptionReducer,
  },
});
