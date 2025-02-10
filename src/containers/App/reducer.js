/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

export const APP_SCOPE = 'app';

export const initialState = {
  loading: false,
  alertMessage: {},
  loginErrorMsg: '',
  currentUser: {},
  token: localStorage.getItem('token') || null,
  activeTab: '',
  progressPopUp: {
    isVisible: false,
    title: '',
    message: '',
    hasUserClosedPopUp: false,
  },
  notificationObject: {},
};

const appSlice = createSlice({
  name: APP_SCOPE,
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    loadUser: (state, action) => {
      state.loading = true;
    },
    onLoadUserSuccess: (state, action) => {
      const user = action.payload;
      state.currentUser = user;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    authError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.token = null;
      state.currentUser = initialState.currentUser;
    },
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      localStorage.setItem('token', token);
      state.token = token;
      state.currentUser = user;
    },
    loginFailure: (state, action) => {
      localStorage.clear();
      state.token = null;
      state.currentUser = {};
    },
    attemptLogout: (state, action) => {
      state.loading = true;
    },
    showError: (state, action) => {
      const error = action.payload;
      let message = 'An unexpected error occurred';
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }
      state.alertMessage = {
        text: message,
        type: 'error',
      };
    },
    showMiscError: (state, action) => {
      state.alertMessage = {
        text: action.payload,
        type: 'error',
      };
    },
    showMiscSuccess: (state, action) => {
      state.alertMessage = {
        text: action.payload,
        type: 'success',
      };
    },
    attemptLogoutSuccess: (state, action) => {
      localStorage.clear();
      state.token = null;
      state.currentUser = {};
    },
    attemptLogoutFailed: (state, action) => {
      state.loading = false;
    },
    onUnAuthorized: (state, action) => {
      state.token = null;
      localStorage.clear();
    },
    setNotification: (state, action) => {
      state.notificationObject = {
        ...action.payload,
      };
    },
  },
});

export const {
  onUnAuthorized,
  attemptLogout,
  attemptLogoutFailed,
  attemptLogoutSuccess,
  setLoading,
  setActiveTab,
  loadUser,
  loginSuccess,
  loginFailure,
  authError,
  onLoadUserSuccess,
  showMiscError,
  showMiscSuccess,
  setNotification,
  showError
} = appSlice.actions;
export default appSlice;
