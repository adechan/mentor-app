import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accountId: null,
  accountInfo: null,
  profiles: [],
  selectedProfileId: null,
};

const accountSlice = createSlice({
  initialState,
  name: 'account',
  reducers: {
    SET_PROFILE_ID: (state, action) => {
      state.userId = action.payload;
    },
    SET_ACCOUNT_INFO: (state, action) => {
        
    },
    SET_PROFILES: (state, action) => {
      
    },
    SET_SELECTED_PROFILE: (state, action) => {
      const id = parseInt(action.payload, 10);
      state.selectedProfileId = id;
      localStorage.setItem('selectedProfileId', id);
    },
    LOG_OUT: () => {
      localStorage.removeItem('selectedProfileId');
      return { ...initialState };
    },
  },
});

export const accountActions = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
