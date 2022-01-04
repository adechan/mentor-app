import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mentorId: null,
    studentId: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    studentProfile: null,
    mentorProfile: null,
};

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
      SET_ACCOUNT_INFO : (state, action) => {
          return   ({
              ...state,
              ...action.payload
          })
      },
      RESET: () => {
        return {
            ...initialState,
        }
      }
    },
  });
  
  export const registrationActions = registrationSlice.actions;
  export const registrationReducer = registrationSlice.reducer;
