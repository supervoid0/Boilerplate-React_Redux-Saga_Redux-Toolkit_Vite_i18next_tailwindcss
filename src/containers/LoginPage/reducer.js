/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

export const LOGIN_SCOPE = 'login';

export const initialState = {
  loading: false,
};

const loginSlice = createSlice({
  name: LOGIN_SCOPE,
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    attemptLogin: (state, action) => {
      state.loading = true;
    },
  },
});

export const { setLoading, attemptLogin } = loginSlice.actions;
export default loginSlice;
