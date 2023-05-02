import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  status: "idle",
};

export const paneOptionSlice = createSlice({
  name: "paneOption",
  initialState: {
    paneOption: null,
  },

  reducers: {
    ticket: (state, action) => {
      state.paneOption = action.payload;
    },
    ticketList: (state, action) => {
      state.paneOption = action.payload;
    },
    ticketService: (state, action) => {
      state.paneOption = action.payload;
    },
  },
});

export const { ticket, ticketList, ticketService } = paneOptionSlice.actions;
// Selectors that allow us to pull information
export const selectPaneOption = (state) => state.paneOption.paneOption;
export default paneOptionSlice.reducer;
