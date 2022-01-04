import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountId: null,
  selectedProfileId: null,
  profiles: [],
};

const accountSlice = createSlice({
  initialState,
  name: "account",
  reducers: {
    SET_ACCOUNT_ID: (state, action) => {
      state.accountId = action.payload;
    },
    SET_SELECTED_PROFILE_ID: (state, action) => {
      state.selectedProfileId = action.payload;
    },
    SET_PROFILES: (state, action) => {
        state.profiles = action.payload
    },
  },
});

export const accountActions = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
